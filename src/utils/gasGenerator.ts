/**
 * MADANI Google Apps Script & ZIP Package Generator
 * Generates ready-to-deploy Google Apps Script (Code.gs), CSV exports, and downloadable ZIP bundle
 */

import JSZip from 'jszip';
import {
  SchoolProfile,
  PresensiGuruRecord,
  RFIDPresensiLog,
  JurnalMengajar,
  ProgresTahfiz,
  DispensasiSiswa,
  Siswa
} from '../types/madani';

/**
 * Returns the complete, production-ready Google Apps Script (Code.gs)
 */
export const getGoogleAppsScriptCode = (schoolName: string = 'MAS AL-MADANI INTEGRATED'): string => {
  return `/**
 * ==============================================================================
 * SISTEM INFORMASI & LMS MADRASAH DIGITAL "MADANI"
 * SCRIPT INTEGRASI OTOMATIS GOOGLE SPREADSHEET (APPS SCRIPT)
 * ==============================================================================
 * Lembaga: ${schoolName}
 * Versi: 2.4.0 (Enterprise EdTech Integration)
 * Fitur: Auto-Append Ceklok GPS, Presensi RFID, Jurnal KBM, Tahfiz, Dispensasi
 * ==============================================================================
 */

// Konfigurasi Nama Tab Sheet
const SHEET_NAMES = {
  PRESENSI_GURU: "Presensi_Guru",
  PRESENSI_RFID: "Presensi_RFID",
  JURNAL_KBM: "Jurnal_KBM",
  TAHFIZ_SANTRI: "Tahfiz_Santri",
  DISPENSASI: "Dispensasi",
  DATA_SISWA: "Data_Siswa"
};

/**
 * Inisialisasi awal seluruh lembar spreadsheet dan header otomatis.
 * Jalankan fungsi ini sekali di editor Apps Script (Run -> setupMadaniSheets).
 */
function setupMadaniSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const configs = [
    {
      name: SHEET_NAMES.PRESENSI_GURU,
      headers: ["Timestamp Masuk", "ID Guru", "Nama Guru", "NIP", "Status", "Jarak (Meter)", "Koordinat GPS", "Catatan", "Tervalidasi Geofence"]
    },
    {
      name: SHEET_NAMES.PRESENSI_RFID,
      headers: ["Timestamp", "NIS", "Nama Santri", "Kelas", "RFID Tag", "Terminal Gerbang", "Status Scan"]
    },
    {
      name: SHEET_NAMES.JURNAL_KBM,
      headers: ["Tanggal", "Hari", "Jam Ke-", "Kelas", "Mata Pelajaran", "Guru Pengampu", "Materi Pokok", "Capaian Pembelajaran", "Hadir", "Sakit", "Izin", "Alpha"]
    },
    {
      name: SHEET_NAMES.TAHFIZ_SANTRI,
      headers: ["Tanggal", "Nama Santri", "Halaqah", "Surah", "Ayat Awal", "Ayat Akhir", "Kategori", "Kualitas", "Tajwid", "Catatan Musyrif"]
    },
    {
      name: SHEET_NAMES.DISPENSASI,
      headers: ["Nomor Surat", "Tanggal Diajukan", "Keperluan", "Penyelenggara", "Kategori", "Mulai", "Selesai", "Daftar Santri", "Status Kurikulum", "Status Kesiswaan"]
    },
    {
      name: SHEET_NAMES.DATA_SISWA,
      headers: ["NIS", "NISN", "Nama Lengkap", "Kelas", "Jenis Kelamin", "RFID Tag", "Kamar Asrama", "Poin Disiplin", "Nama Orang Tua", "No WhatsApp Ortu", "Status"]
    }
  ];

  configs.forEach(cfg => {
    let sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
    }
    // Set headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(cfg.headers);
      const headerRange = sheet.getRange(1, 1, 1, cfg.headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
  });

  SpreadsheetApp.flush();
  Logger.log("Inisialisasi Seluruh Sheet MADANI Sukses!");
}

/**
 * Handle GET Request (Status Health Check)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    app: "MADANI LMS & Sistem Informasi Madrasah Digital",
    version: "2.4.0",
    serverTime: new Date().toISOString(),
    message: "Google Apps Script Web App Endpoint Aktif & Terhubung!"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST Request (Sinkronisasi Data Otomatis dari MADANI)
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // Mencegah race condition antar request paralel

    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      payload = JSON.parse(e.parameter.data);
    } else {
      payload = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = payload.action;
    const nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    if (action === "SYNC_PRESENSI_GURU") {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.PRESENSI_GURU);
      const record = payload.data;
      sheet.appendRow([
        nowStr,
        record.guruId || "-",
        record.guruNama || "-",
        record.nip || "-",
        record.status || "Hadir Tepat",
        record.jarakMeter || 0,
        (record.latitude || "") + ", " + (record.longitude || ""),
        record.catatan || "-",
        record.isWithinRadius ? "YA" : "TIDAK"
      ]);
    } else if (action === "SYNC_PRESENSI_RFID") {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.PRESENSI_RFID);
      const record = payload.data;
      sheet.appendRow([
        nowStr,
        record.nis || "-",
        record.namaSiswa || "-",
        record.kelas || "-",
        record.rfidTag || "-",
        record.mesinId || "GATE-01",
        record.status || "Berhasil"
      ]);
    } else if (action === "SYNC_JURNAL_KBM") {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.JURNAL_KBM);
      const record = payload.data;
      sheet.appendRow([
        record.tanggal || nowStr.split(" ")[0],
        record.hari || "-",
        record.period || 1,
        record.kelasName || "-",
        record.subjectName || "-",
        record.guruNama || "-",
        record.materi || "-",
        record.capaianPembelajaran || "-",
        record.hadir || 0,
        record.sakit || 0,
        record.izin || 0,
        record.alpha || 0
      ]);
    } else if (action === "SYNC_TAHFIZ") {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.TAHFIZ_SANTRI);
      const record = payload.data;
      sheet.appendRow([
        record.tanggal || nowStr.split(" ")[0],
        record.siswaNama || "-",
        record.halaqahNama || "-",
        record.surah || "-",
        record.ayatAwal || 1,
        record.ayatAkhir || 1,
        record.kategori || "-",
        record.kualitasHafalan || "-",
        record.kelancaranTajwid || "-",
        record.catatanMusyrif || "-"
      ]);
    } else if (action === "SYNC_DISPENSASI") {
      const sheet = getOrCreateSheet(ss, SHEET_NAMES.DISPENSASI);
      const record = payload.data;
      const siswaNames = (record.siswaList || []).map(s => s.nama + " (" + s.kelas + ")").join(", ");
      sheet.appendRow([
        record.nomorDispensasi || "-",
        record.tanggalDiajukan || nowStr.split(" ")[0],
        record.keperluan || "-",
        record.penyelenggara || "-",
        record.kategori || "-",
        record.tanggalMulai || "-",
        record.tanggalSelesai || "-",
        siswaNames,
        record.statusKurikulum || "Menunggu",
        record.statusKesiswaan || "Menunggu"
      ]);
    } else if (action === "BULK_SYNC") {
      // Bulk sync multiple collections at once
      if (payload.presensiGuru) {
        const sh = getOrCreateSheet(ss, SHEET_NAMES.PRESENSI_GURU);
        payload.presensiGuru.forEach(r => {
          sh.appendRow([r.tanggal + " " + r.jamMasuk, r.guruId, r.guruNama, r.nip, r.status, r.jarakMeter, r.latitude + ", " + r.longitude, r.catatan, r.isWithinRadius ? "YA" : "TIDAK"]);
        });
      }
      if (payload.rfidLogs) {
        const sh = getOrCreateSheet(ss, SHEET_NAMES.PRESENSI_RFID);
        payload.rfidLogs.forEach(r => {
          sh.appendRow([r.timestamp, r.nis, r.namaSiswa, r.kelas, r.rfidTag, r.mesinId, r.status]);
        });
      }
      if (payload.jurnalMengajar) {
        const sh = getOrCreateSheet(ss, SHEET_NAMES.JURNAL_KBM);
        payload.jurnalMengajar.forEach(r => {
          sh.appendRow([r.tanggal, r.hari, r.period, r.kelasName, r.subjectName, r.guruNama, r.materi, r.capaianPembelajaran, r.hadir, r.sakit, r.izin, r.alpha]);
        });
      }
      if (payload.progresTahfiz) {
        const sh = getOrCreateSheet(ss, SHEET_NAMES.TAHFIZ_SANTRI);
        payload.progresTahfiz.forEach(r => {
          sh.appendRow([r.tanggal, r.siswaNama, r.halaqahNama, r.surah, r.ayatAwal, r.ayatAkhir, r.kategori, r.kualitasHafalan, r.kelancaranTajwid, r.catatanMusyrif]);
        });
      }
    }

    lock.releaseLock();

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      action: action,
      timestamp: nowStr,
      message: "Data MADANI berhasil dicatat ke Google Spreadsheet!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}
`;
};

/**
 * Converts array of objects to CSV with UTF-8 BOM
 */
export const convertToCSV = (data: Record<string, any>[]): string => {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(item =>
    headers
      .map(header => {
        let val = item[header];
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        val = val === undefined || val === null ? '' : String(val);
        // Escape quotes
        val = val.replace(/"/g, '""');
        return `"${val}"`;
      })
      .join(',')
  );

  return '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
};

/**
 * Generates and downloads the entire MADANI ZIP bundle
 */
export const downloadMadaniZipPackage = async (contextData: {
  schoolProfile: SchoolProfile;
  presensiGuru: PresensiGuruRecord[];
  rfidLogs: RFIDPresensiLog[];
  jurnalMengajar: JurnalMengajar[];
  progresTahfizList: ProgresTahfiz[];
  dispensasiList: DispensasiSiswa[];
  students: Siswa[];
  fullDatabase: any;
}): Promise<void> => {
  const zip = new JSZip();

  // Folder 1: Google Apps Script
  const gasFolder = zip.folder('01_Google_Apps_Script');
  if (gasFolder) {
    gasFolder.file('Code.gs', getGoogleAppsScriptCode(contextData.schoolProfile.namaSekolah));
    gasFolder.file(
      'appsscript.json',
      JSON.stringify(
        {
          timeZone: 'Asia/Jakarta',
          dependencies: {},
          exceptionLogging: 'STACKDRIVER',
          runtimeVersion: 'V8',
          webapp: {
            executeAs: 'USER_DEPLOYING',
            access: 'ANYONE'
          }
        },
        null,
        2
      )
    );
    gasFolder.file(
      'PANDUAN_SETUP_SPREADSHEET.md',
      `# PANDUAN INTEGRASI OTOMATIS GOOGLE SPREADSHEET & APPS SCRIPT
Lembaga: ${contextData.schoolProfile.namaSekolah}

Ikuti 4 langkah mudah berikut untuk menghubungkan MADANI ke Google Sheets Anda secara gratis:

1. Buka Google Spreadsheet baru di https://sheets.new
2. Beri judul spreadsheet Anda: "DATABASE_RESMI_MADANI_TA_2026_2027"
3. Klik menu **Ekstensi (Extensions)** -> **Apps Script**
4. Hapus isi editor Apps Script dan tempelkan seluruh kode dari berkas \`Code.gs\`
5. Di menu atas editor Apps Script, pilih fungsi \`setupMadaniSheets\` lalu klik tombol **Jalankan (Run)**
   (Setujui perizinan Google sekali saja - sheet header akan otomatis dibuat rapi!)
6. Klik tombol biru **Terapkan (Deploy)** di pojok kanan atas -> **Penerapan Baru (New Deployment)**
   - Pilih jenis: **Aplikasi Web (Web App)**
   - Jalankan sebagai: **Saya (Me)**
   - Siapa yang memiliki akses: **Siapa saja (Anyone)**
7. Salin URL Aplikasi Web yang berakhiran \`/exec\` (Contoh: https://script.google.com/macros/s/AKfycb.../exec)
8. Buka menu MADANI -> **Spreadsheet & Apps Script** -> Tempelkan URL tersebut ke kolom **Web App URL** dan aktifkan **Sinkronisasi Otomatis**!

Selamat! Setiap ada Ceklok Guru GPS, Scan RFID Gerbang, Jurnal KBM, Dispensasi, atau Setoran Tahfiz, data akan otomatis masuk seketika ke Google Spreadsheet Anda.
`
    );
  }

  // Folder 2: CSV Sheets for Instant Import
  const csvFolder = zip.folder('02_Spreadsheet_CSV_Sheets');
  if (csvFolder) {
    csvFolder.file(
      'Presensi_Guru.csv',
      convertToCSV(
        contextData.presensiGuru.map(p => ({
          Tanggal: p.tanggal,
          Jam_Masuk: p.jamMasuk,
          Guru: p.guruNama,
          NIP: p.nip,
          Status: p.status,
          Jarak_Meter: p.jarakMeter,
          Latitude: p.latitude,
          Longitude: p.longitude,
          Valid_Radius: p.isWithinRadius ? 'YA' : 'TIDAK',
          Catatan: p.catatan || ''
        }))
      )
    );

    csvFolder.file(
      'Presensi_RFID.csv',
      convertToCSV(
        contextData.rfidLogs.map(r => ({
          Timestamp: r.timestamp,
          NIS: r.nis,
          Nama_Santri: r.namaSiswa,
          Kelas: r.kelas,
          Tag_RFID: r.rfidTag,
          Terminal: r.mesinId,
          Status: r.status
        }))
      )
    );

    csvFolder.file(
      'Jurnal_KBM.csv',
      convertToCSV(
        contextData.jurnalMengajar.map(j => ({
          Tanggal: j.tanggal,
          Hari: j.hari,
          Jam_Ke: j.period,
          Kelas: j.kelasName,
          Mapel: j.subjectName,
          Guru: j.guruNama,
          Materi: j.materi,
          Capaian: j.capaianPembelajaran,
          Hadir: j.hadir,
          Sakit: j.sakit,
          Izin: j.izin,
          Alpha: j.alpha
        }))
      )
    );

    csvFolder.file(
      'Tahfiz_Santri.csv',
      convertToCSV(
        contextData.progresTahfizList.map(t => ({
          Tanggal: t.tanggal,
          Santri: t.siswaNama,
          Halaqah: t.halaqahNama,
          Surah: t.surah,
          Ayat_Mulai: t.ayatAwal,
          Ayat_Akhir: t.ayatAkhir,
          Kategori: t.kategori,
          Kualitas: t.kualitasHafalan,
          Tajwid: t.kelancaranTajwid,
          Catatan: t.catatanMusyrif
        }))
      )
    );

    csvFolder.file(
      'Dispensasi_Siswa.csv',
      convertToCSV(
        contextData.dispensasiList.map(d => ({
          Nomor_Dispensasi: d.nomorDispensasi,
          Tanggal_Diajukan: d.tanggalDiajukan,
          Keperluan: d.keperluan,
          Penyelenggara: d.penyelenggara,
          Kategori: d.kategori,
          Tanggal_Mulai: d.tanggalMulai,
          Tanggal_Selesai: d.tanggalSelesai,
          Jumlah_Siswa: d.siswaList.length,
          Daftar_Siswa: d.siswaList.map(s => s.nama).join('; '),
          Status_Kurikulum: d.statusKurikulum,
          Status_Kesiswaan: d.statusKesiswaan
        }))
      )
    );

    csvFolder.file(
      'Master_Data_Siswa.csv',
      convertToCSV(
        contextData.students.map(s => ({
          NIS: s.nis,
          NISN: s.nisn,
          Nama: s.nama,
          Kelas: s.kelas,
          Jenis_Kelamin: s.jenisKelamin,
          Tag_RFID: s.rfidTag,
          Kamar_Asrama: s.kamarAsrama,
          Poin_Pelanggaran: s.poinPelanggaran,
          Orang_Tua: s.namaOrtu,
          No_HP_Ortu: s.noHpOrtu,
          Status: s.status
        }))
      )
    );
  }

  // Folder 3: Full Database JSON Backup
  const dbFolder = zip.folder('03_Database_Backup');
  if (dbFolder) {
    dbFolder.file('MADANI_Full_Backup.json', JSON.stringify(contextData.fullDatabase, null, 2));
  }

  // Root Readme
  zip.file(
    'README.txt',
    `========================================================================
PAKET INTEGRASI GOOGLE SPREADSHEET & APPS SCRIPT "MADANI"
Sistem Informasi & LMS Madrasah Digital Terintegrasi
========================================================================
Lembaga : ${contextData.schoolProfile.namaSekolah}
Diekspor: ${new Date().toISOString()}

ISI PAKET ZIP INI:
1. 01_Google_Apps_Script/
   - Code.gs : Script backend lengkap untuk Google Apps Script
   - appsscript.json : Konfigurasi manifest
   - PANDUAN_SETUP_SPREADSHEET.md : Panduan instalasi langkah demi langkah
2. 02_Spreadsheet_CSV_Sheets/
   - Presensi_Guru.csv
   - Presensi_RFID.csv
   - Jurnal_KBM.csv
   - Tahfiz_Santri.csv
   - Dispensasi_Siswa.csv
   - Master_Data_Siswa.csv
3. 03_Database_Backup/
   - MADANI_Full_Backup.json : Salinan cadangan lengkap database

Semua berkas CSV menggunakan UTF-8 BOM agar langsung terbaca rapi
tanpa error karakter di Google Spreadsheet maupun Microsoft Excel.
========================================================================`
  );

  // Generate ZIP blob and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MADANI_Spreadsheet_AppsScript_Bundle_${new Date().toISOString().slice(0, 10)}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
