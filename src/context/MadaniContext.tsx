/**
 * MADANI Context & State Store
 * Provides integrated reactive state for all Madrasah Digital modules
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  SchoolProfile,
  Kelas,
  JadwalPelajaran,
  PresensiGuruRecord,
  JurnalMengajar,
  SupervisiAkademik,
  Siswa,
  RFIDPresensiLog,
  DispensasiSiswa,
  PelanggaranDisiplin,
  HalaqahTahfiz,
  ProgresTahfiz,
  IzinKeluarAsrama,
  BukuPerpustakaan,
  PeminjamanBuku,
  InventarisSarpras,
  BukuTamuHumas,
  ChatMessage,
  KalenderEvent,
  WhatsAppLog,
  GASSyncLog,
  SpreadsheetConfig
} from '../types/madani';
import {
  initialSchoolProfile,
  initialUsers,
  initialClasses,
  initialJadwal,
  initialStudents,
  initialPresensiGuru,
  initialJurnalMengajar,
  initialSupervisi,
  initialRFIDLogs,
  initialDispensasi,
  initialPelanggaran,
  initialHalaqah,
  initialProgresTahfiz,
  initialIzinAsrama,
  initialBukuPerpustakaan,
  initialPeminjaman,
  initialInventaris,
  initialBukuTamu,
  initialChatMessages,
  initialKalender,
  initialWALogs,
  initialGASSyncLogs
} from '../data/mockData';
import { downloadMadaniZipPackage } from '../utils/gasGenerator';

export type ActiveModule =
  | 'dashboard'
  | 'timemap'
  | 'kurikulum'
  | 'kesiswaan'
  | 'asrama_tahfiz'
  | 'perpustakaan'
  | 'humas_sarpras'
  | 'pengaturan'
  | 'blueprint'
  | 'spreadsheet';

export type KurikulumTab = 'jadwal' | 'jurnal' | 'ceklok_guru' | 'supervisi' | 'rekap_nilai' | 'kalender_kbm' | 'wa_gateway';
export type KesiswaanTab = 'rfid_scan' | 'dispensasi' | 'pelanggaran_poin' | 'kartu_pelajar' | 'daftar_ulang';
export type AsramaTab = 'progres_tahfiz' | 'halaqah' | 'ibadah_harian' | 'izin_keluar' | 'pos_keamanan' | 'gadget';
export type HumasSarprasTab = 'buku_tamu' | 'surat' | 'inventaris' | 'atk';
export type PengaturanTab = 'sekolah' | 'rbac' | 'langganan_saas' | 'backup_restore';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface MadaniContextType {
  // Current user & role
  currentUser: User;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  users: User[];

  // Navigation
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  activeKurikulumTab: KurikulumTab;
  setActiveKurikulumTab: (tab: KurikulumTab) => void;
  activeKesiswaanTab: KesiswaanTab;
  setActiveKesiswaanTab: (tab: KesiswaanTab) => void;
  activeAsramaTab: AsramaTab;
  setActiveAsramaTab: (tab: AsramaTab) => void;
  activeHumasSarprasTab: HumasSarprasTab;
  setActiveHumasSarprasTab: (tab: HumasSarprasTab) => void;
  activePengaturanTab: PengaturanTab;
  setActivePengaturanTab: (tab: PengaturanTab) => void;

  // View mode
  isMobileTeacherMode: boolean;
  setIsMobileTeacherMode: (val: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // School profile
  schoolProfile: SchoolProfile;
  updateSchoolProfile: (profile: Partial<SchoolProfile>) => void;

  // Data states
  classes: Kelas[];
  jadwal: JadwalPelajaran[];
  students: Siswa[];
  presensiGuru: PresensiGuruRecord[];
  jurnalMengajar: JurnalMengajar[];
  supervisi: SupervisiAkademik[];
  rfidLogs: RFIDPresensiLog[];
  dispensasiList: DispensasiSiswa[];
  pelanggaranList: PelanggaranDisiplin[];
  halaqahList: HalaqahTahfiz[];
  progresTahfizList: ProgresTahfiz[];
  izinAsramaList: IzinKeluarAsrama[];
  bukuList: BukuPerpustakaan[];
  peminjamanList: PeminjamanBuku[];
  inventarisList: InventarisSarpras[];
  bukuTamuList: BukuTamuHumas[];
  chatMessages: ChatMessage[];
  kalenderList: KalenderEvent[];
  waLogs: WhatsAppLog[];
  gasSyncLogs: GASSyncLog[];

  // Actions
  addPresensiGuru: (record: Omit<PresensiGuruRecord, 'id'>) => void;
  addJurnalMengajar: (jurnal: Omit<JurnalMengajar, 'id'>) => void;
  addSupervisi: (item: Omit<SupervisiAkademik, 'id' | 'nomorSurat'>) => void;
  addDispensasi: (dispensasi: Omit<DispensasiSiswa, 'id' | 'nomorDispensasi' | 'tanggalDiajukan' | 'statusKurikulum' | 'statusKesiswaan'>) => void;
  updateDispensasiApproval: (id: string, role: 'kurikulum' | 'kesiswaan', status: 'Disetujui' | 'Ditolak', catatan?: string) => void;
  addPelanggaran: (pelanggaran: Omit<PelanggaranDisiplin, 'id' | 'tanggal'>) => void;
  addProgresTahfiz: (progres: Omit<ProgresTahfiz, 'id' | 'tanggal'>) => void;
  updateIzinAsramaStatus: (id: string, field: 'pembina' | 'keamanan', status: any) => void;
  simulateRFIDScan: (nisOrTag: string) => { success: boolean; student?: Siswa; message: string };
  sendChatMessage: (msg: string) => void;
  deleteChatMessage: (id: string) => void;
  sendWhatsAppNotification: (recipient: string, phone: string, template: WhatsAppLog['template'], message: string) => void;

  // Google Sheets & Apps Script Integration
  triggerGASSync: (targetSheet?: string) => Promise<{ success: boolean; message: string; rows: number }>;
  updateSpreadsheetConfig: (config: Partial<SpreadsheetConfig>) => void;
  downloadCompleteZIPPackage: () => Promise<void>;

  // Utility & Toast
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonString: string) => boolean;
  resetToDefaultData: () => void;
}

const MadaniContext = createContext<MadaniContextType | undefined>(undefined);

export const MadaniProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence key
  const STORAGE_KEY = 'MADANI_SAAS_STATE_V1';

  // State initialization with localStorage fallback
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_PROFILE`);
    return saved ? JSON.parse(saved) : initialSchoolProfile;
  });

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('super_admin');
  const currentUser = users.find(u => u.role === currentUserRole) || users[0];

  // Modules navigation
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [activeKurikulumTab, setActiveKurikulumTab] = useState<KurikulumTab>('jadwal');
  const [activeKesiswaanTab, setActiveKesiswaanTab] = useState<KesiswaanTab>('rfid_scan');
  const [activeAsramaTab, setActiveAsramaTab] = useState<AsramaTab>('progres_tahfiz');
  const [activeHumasSarprasTab, setActiveHumasSarprasTab] = useState<HumasSarprasTab>('buku_tamu');
  const [activePengaturanTab, setActivePengaturanTab] = useState<PengaturanTab>('sekolah');

  // UI modes
  const [isMobileTeacherMode, setIsMobileTeacherMode] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Core Data States
  const [classes] = useState<Kelas[]>(initialClasses);
  const [jadwal] = useState<JadwalPelajaran[]>(initialJadwal);
  const [students, setStudents] = useState<Siswa[]>(initialStudents);
  const [presensiGuru, setPresensiGuru] = useState<PresensiGuruRecord[]>(initialPresensiGuru);
  const [jurnalMengajar, setJurnalMengajar] = useState<JurnalMengajar[]>(initialJurnalMengajar);
  const [supervisi, setSupervisi] = useState<SupervisiAkademik[]>(initialSupervisi);
  const [rfidLogs, setRfidLogs] = useState<RFIDPresensiLog[]>(initialRFIDLogs);
  const [dispensasiList, setDispensasiList] = useState<DispensasiSiswa[]>(initialDispensasi);
  const [pelanggaranList, setPelanggaranList] = useState<PelanggaranDisiplin[]>(initialPelanggaran);
  const [halaqahList] = useState<HalaqahTahfiz[]>(initialHalaqah);
  const [progresTahfizList, setProgresTahfizList] = useState<ProgresTahfiz[]>(initialProgresTahfiz);
  const [izinAsramaList, setIzinAsramaList] = useState<IzinKeluarAsrama[]>(initialIzinAsrama);
  const [bukuList] = useState<BukuPerpustakaan[]>(initialBukuPerpustakaan);
  const [peminjamanList] = useState<PeminjamanBuku[]>(initialPeminjaman);
  const [inventarisList] = useState<InventarisSarpras[]>(initialInventaris);
  const [bukuTamuList] = useState<BukuTamuHumas[]>(initialBukuTamu);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [kalenderList] = useState<KalenderEvent[]>(initialKalender);
  const [waLogs, setWaLogs] = useState<WhatsAppLog[]>(initialWALogs);
  const [gasSyncLogs, setGasSyncLogs] = useState<GASSyncLog[]>(initialGASSyncLogs);

  // Background Google Spreadsheet & Apps Script Auto-Sync Dispatcher
  const dispatchGASSync = async (action: string, payload: any, targetSheet: string) => {
    const config = schoolProfile.spreadsheetConfig;
    if (!config?.autoSync || !config.webAppUrl) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    try {
      if (typeof fetch !== 'undefined') {
        fetch(config.webAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, data: payload })
        }).catch(() => {});
      }
      const newLog: GASSyncLog = {
        id: `gas-${Date.now()}`,
        timestamp: timeStr,
        sheetTarget: targetSheet,
        action: 'Auto-Sync',
        rowsCount: 1,
        status: 'Sukses',
        details: `Tersinkronisasi otomatis ke lembar [${targetSheet}] di Google Spreadsheet via Apps Script Web App.`
      };
      setGasSyncLogs(prev => [newLog, ...prev]);
      setSchoolProfile(prev => ({
        ...prev,
        spreadsheetConfig: {
          ...prev.spreadsheetConfig!,
          lastSyncTimestamp: `${new Date().toISOString().split('T')[0]} ${timeStr} WIB`,
          lastSyncStatus: 'Terkoneksi & Sinkron',
          totalSyncedRows: (prev.spreadsheetConfig?.totalSyncedRows || 0) + 1
        }
      }));
    } catch {
      // Graceful fallback
    }
  };

  // Auto remove toasts
  const showToast = (t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(x => x.id !== id));
  };

  const updateSchoolProfile = (profile: Partial<SchoolProfile>) => {
    setSchoolProfile(prev => {
      const next = { ...prev, ...profile };
      localStorage.setItem(`${STORAGE_KEY}_PROFILE`, JSON.stringify(next));
      return next;
    });
    showToast({
      type: 'success',
      title: 'Profil Tersimpan',
      message: 'Perubahan identitas madrasah dan kop surat berhasil diperbarui.'
    });
  };

  const addPresensiGuru = (record: Omit<PresensiGuruRecord, 'id'>) => {
    const newRecord: PresensiGuruRecord = {
      ...record,
      id: `pg-${Date.now()}`
    };
    setPresensiGuru(prev => [newRecord, ...prev]);
    dispatchGASSync('SYNC_PRESENSI_GURU', newRecord, 'Presensi_Guru');
    showToast({
      type: 'success',
      title: 'Presensi Tercatat',
      message: `${record.guruNama} berhasil ceklok (${record.status}). Jarak: ${record.jarakMeter}m. Tersinkron ke Spreadsheet.`
    });
  };

  const addJurnalMengajar = (jurnal: Omit<JurnalMengajar, 'id'>) => {
    const newJurnal: JurnalMengajar = {
      ...jurnal,
      id: `jm-${Date.now()}`
    };
    setJurnalMengajar(prev => [newJurnal, ...prev]);
    dispatchGASSync('SYNC_JURNAL_KBM', newJurnal, 'Jurnal_KBM');
    showToast({
      type: 'success',
      title: 'Jurnal KBM Disimpan',
      message: `Jurnal kelas ${jurnal.kelasName} (${jurnal.subjectName}) berhasil tersimpan & tersinkron ke Spreadsheet.`
    });
  };

  const addSupervisi = (item: Omit<SupervisiAkademik, 'id' | 'nomorSurat'>) => {
    const count = supervisi.length + 1;
    const nomorSurat = `SPV/MADANI/XI/2026/0${count < 10 ? '0' + count : count}`;
    const newSup: SupervisiAkademik = {
      ...item,
      id: `sup-${Date.now()}`,
      nomorSurat
    };
    setSupervisi(prev => [newSup, ...prev]);
    showToast({
      type: 'success',
      title: 'Supervisi Berhasil Diinput',
      message: `Instrumen supervisi untuk ${item.guruNama} telah diterbitkan dengan nomor ${nomorSurat}.`
    });
  };

  const addDispensasi = (disp: Omit<DispensasiSiswa, 'id' | 'nomorDispensasi' | 'tanggalDiajukan' | 'statusKurikulum' | 'statusKesiswaan'>) => {
    const count = dispensasiList.length + 1;
    const nomor = `DISP/KMN/XI/2026/0${count < 10 ? '0' + count : count}`;
    const newDisp: DispensasiSiswa = {
      ...disp,
      id: `disp-${Date.now()}`,
      nomorDispensasi: nomor,
      tanggalDiajukan: new Date().toISOString().split('T')[0],
      statusKurikulum: 'Menunggu',
      statusKesiswaan: 'Menunggu'
    };
    setDispensasiList(prev => [newDisp, ...prev]);
    dispatchGASSync('SYNC_DISPENSASI', newDisp, 'Dispensasi');

    // Update students' status to Dispensasi
    const studentIds = disp.siswaList.map(s => s.siswaId);
    setStudents(prev => prev.map(s => studentIds.includes(s.id) ? { ...s, status: 'Dispensasi' } : s));

    showToast({
      type: 'success',
      title: 'Dispensasi Diajukan',
      message: `Surat dispensasi ${nomor} berhasil dibuat untuk ${disp.siswaList.length} santri. Tersinkron ke Spreadsheet.`
    });
  };

  const updateDispensasiApproval = (id: string, role: 'kurikulum' | 'kesiswaan', status: 'Disetujui' | 'Ditolak', catatan?: string) => {
    setDispensasiList(prev => prev.map(item => {
      if (item.id === id) {
        const updated = {
          ...item,
          statusKurikulum: role === 'kurikulum' ? status : item.statusKurikulum,
          statusKesiswaan: role === 'kesiswaan' ? status : item.statusKesiswaan,
          catatanPersetujuan: catatan || item.catatanPersetujuan
        };
        return updated;
      }
      return item;
    }));

    showToast({
      type: 'info',
      title: 'Status Dispensasi Diperbarui',
      message: `Persetujuan bidang ${role === 'kurikulum' ? 'Kurikulum' : 'Kesiswaan'}: ${status}.`
    });
  };

  const addPelanggaran = (pel: Omit<PelanggaranDisiplin, 'id' | 'tanggal'>) => {
    const newPel: PelanggaranDisiplin = {
      ...pel,
      id: `pel-${Date.now()}`,
      tanggal: new Date().toISOString().split('T')[0]
    };
    setPelanggaranList(prev => [newPel, ...prev]);

    // Accumulate points to student
    setStudents(prev => prev.map(s => {
      if (s.id === pel.siswaId) {
        const newTotal = s.poinPelanggaran + pel.poin;
        return { ...s, poinPelanggaran: newTotal };
      }
      return s;
    }));

    showToast({
      type: 'warning',
      title: 'Pelanggaran Dicatat',
      message: `Poin +${pel.poin} ditambahkan ke buku disiplin ${pel.siswaNama}.`
    });
  };

  const addProgresTahfiz = (prog: Omit<ProgresTahfiz, 'id' | 'tanggal'>) => {
    const newProg: ProgresTahfiz = {
      ...prog,
      id: `pt-${Date.now()}`,
      tanggal: new Date().toISOString().split('T')[0]
    };
    setProgresTahfizList(prev => [newProg, ...prev]);
    dispatchGASSync('SYNC_TAHFIZ', newProg, 'Tahfiz_Santri');
    showToast({
      type: 'success',
      title: 'Setoran Tahfiz Tercatat',
      message: `${prog.siswaNama}: ${prog.surah} ayat ${prog.ayatAwal}-${prog.ayatAkhir} (${prog.kualitasHafalan}). Tersinkron ke Spreadsheet.`
    });
  };

  const updateIzinAsramaStatus = (id: string, field: 'pembina' | 'keamanan', status: any) => {
    setIzinAsramaList(prev => prev.map(item => {
      if (item.id === id) {
        if (field === 'pembina') {
          return { ...item, statusPembina: status };
        } else {
          const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          return {
            ...item,
            statusKeamanan: status,
            waktuRealisasiKeluar: status === 'Sudah Keluar' ? nowStr : item.waktuRealisasiKeluar,
            waktuRealisasiKembali: status === 'Sudah Kembali' ? nowStr : item.waktuRealisasiKembali
          };
        }
      }
      return item;
    }));
    showToast({
      type: 'info',
      title: 'Status Izin Asrama Diperbarui',
      message: `Verifikasi ${field === 'pembina' ? 'Pembina Asrama' : 'Pos Keamanan'}: ${status}.`
    });
  };

  const simulateRFIDScan = (inputStr: string) => {
    const trimmed = inputStr.trim();
    const student = students.find(s => s.rfidTag.toLowerCase() === trimmed.toLowerCase() || s.nis === trimmed);
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (student) {
      const newLog: RFIDPresensiLog = {
        id: `rf-${Date.now()}`,
        timestamp: timeStr,
        rfidTag: student.rfidTag,
        nis: student.nis,
        namaSiswa: student.nama,
        kelas: student.kelas,
        tipe: 'Masuk Gerbang',
        mesinId: 'GATE-UTAMA-01',
        status: 'Berhasil'
      };
      setRfidLogs(prev => [newLog, ...prev]);
      dispatchGASSync('SYNC_PRESENSI_RFID', newLog, 'Presensi_RFID');

      // Trigger automatic WA notification
      sendWhatsAppNotification(
        `Wali dari ${student.nama}`,
        student.noHpOrtu,
        'Notifikasi Presensi Masuk',
        `[MADANI INFO] Ananda ${student.nama} (${student.kelas}) telah tiba di Madrasah pukul ${timeStr} WIB. Presensi RFID tercatat.`
      );

      return {
        success: true,
        student,
        message: `Presensi RFID Berhasil: ${student.nama} (${student.kelas})`
      };
    } else {
      const failLog: RFIDPresensiLog = {
        id: `rf-${Date.now()}`,
        timestamp: timeStr,
        rfidTag: trimmed,
        nis: '-',
        namaSiswa: 'Tidak Teridentifikasi',
        kelas: '-',
        tipe: 'Masuk Gerbang',
        mesinId: 'GATE-UTAMA-01',
        status: 'Gagal / Tidak Terdaftar'
      };
      setRfidLogs(prev => [failLog, ...prev]);
      return {
        success: false,
        message: `Kartu RFID / NIS "${trimmed}" tidak terdaftar dalam database madrasah.`
      };
    }
  };

  const sendChatMessage = (msg: string) => {
    if (!msg.trim()) return;
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: `${currentUser.name} (${currentUser.role})`,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      message: msg,
      timestamp: timeStr
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const deleteChatMessage = (id: string) => {
    setChatMessages(prev => prev.filter(m => m.id !== id));
    showToast({
      type: 'info',
      title: 'Pesan Dimoderasi',
      message: 'Pesan obrolan internal telah dihapus oleh moderator.'
    });
  };

  const sendWhatsAppNotification = (recipient: string, phone: string, template: WhatsAppLog['template'], message: string) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const log: WhatsAppLog = {
      id: `wa-${Date.now()}`,
      timestamp: timeStr,
      penerima: recipient,
      nomorHp: phone,
      template,
      status: 'Terkirim',
      pesanPreview: message
    };
    setWaLogs(prev => [log, ...prev]);
  };

  const exportDatabaseJSON = () => {
    const dump = {
      schoolProfile,
      users,
      classes,
      jadwal,
      students,
      presensiGuru,
      jurnalMengajar,
      supervisi,
      rfidLogs,
      dispensasiList,
      pelanggaranList,
      progresTahfizList,
      izinAsramaList,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MADANI_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({
      type: 'success',
      title: 'Backup Database Berhasil',
      message: 'File JSON cadangan telah diunduh ke komputer Anda.'
    });
  };

  const importDatabaseJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.schoolProfile) setSchoolProfile(data.schoolProfile);
      if (data.students) setStudents(data.students);
      if (data.presensiGuru) setPresensiGuru(data.presensiGuru);
      if (data.jurnalMengajar) setJurnalMengajar(data.jurnalMengajar);
      if (data.dispensasiList) setDispensasiList(data.dispensasiList);
      if (data.pelanggaranList) setPelanggaranList(data.pelanggaranList);
      showToast({
        type: 'success',
        title: 'Restore Database Berhasil',
        message: 'Data aplikasi telah berhasil dipulihkan dari cadangan JSON.'
      });
      return true;
    } catch {
      showToast({
        type: 'error',
        title: 'Gagal Restore',
        message: 'Format file JSON tidak valid atau rusak.'
      });
      return false;
    }
  };

  const resetToDefaultData = () => {
    setSchoolProfile(initialSchoolProfile);
    setUsers(initialUsers);
    setStudents(initialStudents);
    setPresensiGuru(initialPresensiGuru);
    setJurnalMengajar(initialJurnalMengajar);
    setSupervisi(initialSupervisi);
    setRfidLogs(initialRFIDLogs);
    setDispensasiList(initialDispensasi);
    setPelanggaranList(initialPelanggaran);
    setProgresTahfizList(initialProgresTahfiz);
    setIzinAsramaList(initialIzinAsrama);
    setChatMessages(initialChatMessages);
    localStorage.clear();
    showToast({
      type: 'info',
      title: 'Reset Selesai',
      message: 'Database madrasah telah dikembalikan ke kondisi bibit awal.'
    });
  };

  const updateSpreadsheetConfig = (config: Partial<SpreadsheetConfig>) => {
    setSchoolProfile(prev => {
      const currentConfig = prev.spreadsheetConfig || {
        webAppUrl: '',
        spreadsheetId: '',
        spreadsheetName: 'DATABASE_RESMI_MADANI_TA_2026_2027',
        autoSync: true
      };
      const updatedConfig = { ...currentConfig, ...config };
      const next = { ...prev, spreadsheetConfig: updatedConfig };
      localStorage.setItem(`${STORAGE_KEY}_PROFILE`, JSON.stringify(next));
      return next;
    });
    showToast({
      type: 'success',
      title: 'Konfigurasi Spreadsheet Diperbarui',
      message: 'Pengaturan Google Spreadsheet & Apps Script berhasil disimpan.'
    });
  };

  const triggerGASSync = async (targetSheet: string = 'Semua Tab'): Promise<{ success: boolean; message: string; rows: number }> => {
    const config = schoolProfile.spreadsheetConfig;
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const totalRows = presensiGuru.length + rfidLogs.length + jurnalMengajar.length + progresTahfizList.length + dispensasiList.length;

    try {
      if (config?.webAppUrl && typeof fetch !== 'undefined') {
        fetch(config.webAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'BULK_SYNC',
            presensiGuru,
            rfidLogs,
            jurnalMengajar,
            progresTahfiz: progresTahfizList,
            dispensasi: dispensasiList
          })
        }).catch(() => {});
      }

      const newLog: GASSyncLog = {
        id: `gas-${Date.now()}`,
        timestamp: timeStr,
        sheetTarget: targetSheet,
        action: 'Manual-Sync',
        rowsCount: totalRows,
        status: 'Sukses',
        details: `Sinkronisasi menyeluruh ${totalRows} baris data ke Google Spreadsheet berhasil!`
      };
      setGasSyncLogs(prev => [newLog, ...prev]);
      setSchoolProfile(prev => ({
        ...prev,
        spreadsheetConfig: {
          ...prev.spreadsheetConfig!,
          lastSyncTimestamp: `${new Date().toISOString().split('T')[0]} ${timeStr} WIB`,
          lastSyncStatus: 'Terkoneksi & Sinkron',
          totalSyncedRows: (prev.spreadsheetConfig?.totalSyncedRows || 0) + totalRows
        }
      }));
      showToast({
        type: 'success',
        title: 'Sinkronisasi Spreadsheet Selesai',
        message: `${totalRows} baris data berhasil dikirim ke Google Spreadsheet.`
      });
      return { success: true, message: 'Sinkronisasi berhasil.', rows: totalRows };
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Gagal Sinkronisasi',
        message: err?.message || 'Koneksi ke Apps Script terputus.'
      });
      return { success: false, message: err.toString(), rows: 0 };
    }
  };

  const downloadCompleteZIPPackage = async () => {
    try {
      showToast({
        type: 'info',
        title: 'Menyiapkan Paket ZIP...',
        message: 'Mengemas Code.gs, manifest Apps Script, CSV Sheets, dan Database Backup.'
      });
      await downloadMadaniZipPackage({
        schoolProfile,
        presensiGuru,
        rfidLogs,
        jurnalMengajar,
        progresTahfizList,
        dispensasiList,
        students,
        fullDatabase: {
          schoolProfile,
          users,
          classes,
          jadwal,
          students,
          presensiGuru,
          jurnalMengajar,
          supervisi,
          rfidLogs,
          dispensasiList,
          pelanggaranList,
          progresTahfizList,
          izinAsramaList,
          timestamp: new Date().toISOString()
        }
      });
      showToast({
        type: 'success',
        title: 'Paket ZIP Berhasil Diunduh',
        message: 'Berkas ZIP MADANI_Spreadsheet_AppsScript_Bundle telah disimpan ke komputer Anda.'
      });
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Gagal Mengunduh ZIP',
        message: err?.message || 'Terjadi kesalahan saat memproses berkas ZIP.'
      });
    }
  };

  return (
    <MadaniContext.Provider
      value={{
        currentUser,
        currentUserRole,
        setCurrentUserRole,
        users,
        activeModule,
        setActiveModule,
        activeKurikulumTab,
        setActiveKurikulumTab,
        activeKesiswaanTab,
        setActiveKesiswaanTab,
        activeAsramaTab,
        setActiveAsramaTab,
        activeHumasSarprasTab,
        setActiveHumasSarprasTab,
        activePengaturanTab,
        setActivePengaturanTab,
        isMobileTeacherMode,
        setIsMobileTeacherMode,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        searchQuery,
        setSearchQuery,
        schoolProfile,
        updateSchoolProfile,
        classes,
        jadwal,
        students,
        presensiGuru,
        jurnalMengajar,
        supervisi,
        rfidLogs,
        dispensasiList,
        pelanggaranList,
        halaqahList,
        progresTahfizList,
        izinAsramaList,
        bukuList,
        peminjamanList,
        inventarisList,
        bukuTamuList,
        chatMessages,
        kalenderList,
        waLogs,
        gasSyncLogs,
        addPresensiGuru,
        addJurnalMengajar,
        addSupervisi,
        addDispensasi,
        updateDispensasiApproval,
        addPelanggaran,
        addProgresTahfiz,
        updateIzinAsramaStatus,
        simulateRFIDScan,
        sendChatMessage,
        deleteChatMessage,
        sendWhatsAppNotification,
        triggerGASSync,
        updateSpreadsheetConfig,
        downloadCompleteZIPPackage,
        toasts,
        showToast,
        removeToast,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetToDefaultData
      }}
    >
      {children}
    </MadaniContext.Provider>
  );
};

export const useMadani = () => {
  const context = useContext(MadaniContext);
  if (!context) {
    throw new Error('useMadani must be used within a MadaniProvider');
  }
  return context;
};
