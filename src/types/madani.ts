/**
 * MADANI - Sistem Informasi & LMS Madrasah Digital Terintegrasi
 * Core Type Definitions & Interfaces
 */

export type UserRole =
  | 'super_admin'
  | 'waka_kurikulum'
  | 'waka_kesiswaan'
  | 'waka_humas'
  | 'waka_sarpras'
  | 'guru'
  | 'supervisor'
  | 'pembina_asrama'
  | 'security';

export interface User {
  id: string;
  name: string;
  nip: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  mapel?: string[];
  department?: string;
  status: 'active' | 'inactive';
}

export interface SchoolProfile {
  npsn: string;
  nsm: string;
  namaSekolah: string;
  jenjang: 'MTs' | 'MA' | 'MI';
  akreditasi: 'A (Unggul)' | 'B' | 'C';
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  kepalaSekolah: string;
  nipKepala: string;
  ttdDigitalUrl: string;
  logoUrl: string;
  kopSuratLine1: string;
  kopSuratLine2: string;
  kopSuratLine3: string;
  fonnteApiKey: string;
  geofence: {
    latitude: number;
    longitude: number;
    radiusMeters: number;
  };
  spreadsheetConfig?: SpreadsheetConfig;
}

export interface SpreadsheetConfig {
  webAppUrl: string;
  spreadsheetId: string;
  spreadsheetName: string;
  autoSync: boolean;
  lastSyncTimestamp?: string;
  lastSyncStatus?: 'Terkoneksi & Sinkron' | 'Gagal Koneksi' | 'Belum Pernah Sinkron';
  totalSyncedRows?: number;
}

export interface GASSyncLog {
  id: string;
  timestamp: string;
  sheetTarget: string;
  action: 'Auto-Sync' | 'Manual-Sync' | 'Test-Ping' | 'Full-Zip-Export';
  rowsCount: number;
  status: 'Sukses' | 'Gagal';
  details: string;
}

export interface JamPelajaran {
  period: number;
  startTime: string;
  endTime: string;
  isBreak: boolean;
  label?: string;
}

export interface JadwalPelajaran {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  period: number;
  kelasId: string;
  kelasName: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  ruang: string;
}

export interface Kelas {
  id: string;
  nama: string;
  tingkat: 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII';
  waliKelasId: string;
  waliKelasNama: string;
  ruang: string;
  totalSiswa: number;
  isMovingClass: boolean;
}

export interface PresensiGuruRecord {
  id: string;
  guruId: string;
  guruNama: string;
  nip: string;
  tanggal: string;
  jamMasuk: string;
  jamPulang?: string;
  status: 'Hadir Tepat' | 'Terlambat' | 'Izin' | 'Sakit' | 'Dinas Luar';
  latitude: number;
  longitude: number;
  jarakMeter: number;
  isWithinRadius: boolean;
  fotoUrl?: string;
  catatan?: string;
}

export interface JurnalMengajar {
  id: string;
  tanggal: string;
  hari: string;
  period: number;
  kelasName: string;
  subjectName: string;
  guruNama: string;
  materi: string;
  capaianPembelajaran: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  kendalaKelas?: string;
  catatanTindakLanjut?: string;
}

export interface SupervisiAkademik {
  id: string;
  nomorSurat: string;
  tanggal: string;
  guruId: string;
  guruNama: string;
  nip: string;
  supervisorNama: string;
  mapel: string;
  kelas: string;
  // Instrumen 1-4 scale
  skorPerencanaan: number; // Max 4.0
  skorPelaksanaan: number; // Max 4.0
  skorPenilaian: number;   // Max 4.0
  skorRefleksi: number;    // Max 4.0
  nilaiAkhir: number;      // 0 - 100
  predikat: 'Amat Baik (A)' | 'Baik (B)' | 'Cukup (C)' | 'Perlu Pembinaan (D)';
  catatanKelebihan: string;
  catatanPembinaan: string;
  rekomendasi: string;
  status: 'Tuntas' | 'Perlu Tindak Lanjut' | 'Menunggu Verifikasi';
}

export interface Siswa {
  id: string;
  nis: string;
  nisn: string;
  nama: string;
  kelas: string;
  jenisKelamin: 'L' | 'P';
  rfidTag: string;
  halaqahId: string;
  kamarAsrama: string;
  poinPelanggaran: number;
  namaOrtu: string;
  noHpOrtu: string;
  status: 'Aktif' | 'Dispensasi' | 'Sakit' | 'Izin Keluar Asrama';
  fotoUrl?: string;
}

export interface RFIDPresensiLog {
  id: string;
  timestamp: string;
  rfidTag: string;
  nis: string;
  namaSiswa: string;
  kelas: string;
  tipe: 'Masuk Gerbang' | 'Pulang Sekolah' | 'Asrama Subuh' | 'Asrama Isya';
  mesinId: string;
  status: 'Berhasil' | 'Gagal / Tidak Terdaftar';
}

export interface DispensasiSiswa {
  id: string;
  nomorDispensasi: string;
  tanggalDiajukan: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  keperluan: string;
  penyelenggara: string;
  kategori: 'Lomba Akademik/Sains' | 'Lomba Olahraga/Seni' | 'Organisasi/OSIM' | 'Urusan Keluarga/Dinas';
  siswaList: {
    siswaId: string;
    nama: string;
    nis: string;
    kelas: string;
  }[];
  berkasSuratUndangan?: string;
  statusKurikulum: 'Menunggu' | 'Disetujui' | 'Ditolak';
  statusKesiswaan: 'Menunggu' | 'Disetujui' | 'Ditolak';
  catatanPersetujuan?: string;
}

export interface PelanggaranDisiplin {
  id: string;
  tanggal: string;
  siswaId: string;
  siswaNama: string;
  kelas: string;
  jenisPelanggaran: string;
  kategori: 'Ringan' | 'Sedang' | 'Berat';
  poin: number;
  sanksiDiberikan: string;
  statusPenanganan: 'Ditangani Wali Kelas' | 'Panggilan Orang Tua' | 'Surat Peringatan 1' | 'Surat Peringatan 2' | 'Skorsing';
  dicatatOleh: string;
}

export interface HalaqahTahfiz {
  id: string;
  namaHalaqah: string;
  musyrifNama: string;
  lokasi: string;
  totalSantri: number;
  targetSemester: string;
  waktu: 'Ba\'da Subuh' | 'Ba\'da Ashar' | 'Ba\'da Maghrib';
}

export interface ProgresTahfiz {
  id: string;
  tanggal: string;
  siswaId: string;
  siswaNama: string;
  halaqahNama: string;
  surah: string;
  ayatAwal: number;
  ayatAkhir: number;
  kategori: 'Ziyadah (Baru)' | 'Murajaah (Lama)' | 'Ujian Juz';
  kualitasHafalan: 'Mutqin (A)' | 'Jayyid Jiddan (B+)' | 'Jayyid (B)' | 'Maqbul (C)';
  kelancaranTajwid: 'Sangat Fasih' | 'Fasih' | 'Perlu Perbaikan';
  catatanMusyrif: string;
}

export interface IzinKeluarAsrama {
  id: string;
  kodeIzin: string;
  siswaId: string;
  siswaNama: string;
  kelas: string;
  kamar: string;
  keperluan: string;
  waktuKeluarRencana: string;
  waktuKembaliRencana: string;
  namaPenjemput: string;
  kontakPenjemput: string;
  statusPembina: 'Menunggu' | 'Disetujui' | 'Ditolak';
  statusKeamanan: 'Menunggu di Pos' | 'Sudah Keluar' | 'Sudah Kembali';
  waktuRealisasiKeluar?: string;
  waktuRealisasiKembali?: string;
}

export interface BukuPerpustakaan {
  id: string;
  isbn: string;
  judul: string;
  pengarang: string;
  penerbit: string;
  kategori: 'Agama Islam / Kitab' | 'Sains & Teknologi' | 'Sosial & Humaniora' | 'Sastra & Fiksi' | 'Referensi & Kamus';
  lokasiRak: string;
  totalEksemplar: number;
  tersedia: number;
}

export interface PeminjamanBuku {
  id: string;
  kodePinjam: string;
  bukuId: string;
  judulBuku: string;
  nis: string;
  namaSiswa: string;
  kelas: string;
  tanggalPinjam: string;
  tenggatKembali: string;
  tanggalKembali?: string;
  denda: number;
  status: 'Sedang Dipinjam' | 'Dikembalikan Tepat' | 'Terlambat & Denda';
}

export interface InventarisSarpras {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  kategori: 'Elektronik & Multimedia' | 'Mebel & Ruang Belajar' | 'Laboratorium Sains' | 'Olahraga & Seni';
  lokasiRuang: string;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  jumlah: number;
  satuan: string;
  tahunPerolehan: number;
}

export interface BukuTamuHumas {
  id: string;
  tanggal: string;
  jam: string;
  nama: string;
  instansi: string;
  tujuanBertemu: string;
  keperluan: string;
  kontak: string;
  status: 'Diterima' | 'Sedang Berlangsung' | 'Selesai';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  pinned?: boolean;
}

export interface KalenderEvent {
  id: string;
  tanggal: string;
  judul: string;
  kategori: 'KBM Efektif' | 'Ujian / Asesmen' | 'Libur Nasional' | 'Libur Madrasah' | 'Kegiatan Ekstrakurikuler / PHBI';
  deskripsi: string;
  isPresensiLocked: boolean;
}

export interface WhatsAppLog {
  id: string;
  timestamp: string;
  penerima: string;
  nomorHp: string;
  template: 'Notifikasi Presensi Masuk' | 'Peringatan Ketidakhadiran' | 'Persetujuan Dispensasi' | 'Izin Asrama Disetujui' | 'Tagihan Madrasah';
  status: 'Terkirim' | 'Gagal' | 'Pending';
  pesanPreview: string;
}
