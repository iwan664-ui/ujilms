/**
 * MADANI - Mock Data Seed
 * High-fidelity realistic dataset for Madrasah Digital SaaS
 */

import {
  SchoolProfile,
  User,
  Kelas,
  JamPelajaran,
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
  GASSyncLog
} from '../types/madani';

export const initialSchoolProfile: SchoolProfile = {
  npsn: '20234589',
  nsm: '131232730001',
  namaSekolah: 'MAS AL-MADANI INTEGRATED ISLAMIC BOARDING SCHOOL',
  jenjang: 'MA',
  akreditasi: 'A (Unggul)',
  alamat: 'Jl. Pesantren Digital No. 99, Kompleks Islamic Center Edupark',
  kelurahan: 'Ciputat Madani',
  kecamatan: 'Pamulang Timur',
  kota: 'Tangerang Selatan',
  provinsi: 'Banten',
  kodePos: '15412',
  telepon: '(021) 749-8821',
  email: 'sekretariat@madani-madrasah.sch.id',
  website: 'https://madani-madrasah.sch.id',
  kepalaSekolah: 'Dr. H. Muhammad Farhan, M.Pd.I',
  nipKepala: '19750812 200003 1 002',
  ttdDigitalUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=dr_farhan_signature',
  logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=madani_crest&backgroundColor=059669',
  kopSuratLine1: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
  kopSuratLine2: 'KANTOR KEMENTERIAN AGAMA KOTA TANGERANG SELATAN',
  kopSuratLine3: 'MADRASAH ALIYAH SWASTA (MAS) INTEGRATED AL-MADANI',
  fonnteApiKey: 'FONNTE_PRO_MADANI_88921_SECURE',
  geofence: {
    latitude: -6.3052,
    longitude: 106.7538,
    radiusMeters: 150 // Radius geofence 150 meter
  },
  spreadsheetConfig: {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbwMADANI_v2_EnterpriseEdTech_GAS_Integration/exec',
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    spreadsheetName: 'DATABASE_RESMI_MADANI_TA_2026_2027',
    autoSync: true,
    lastSyncTimestamp: '2026-11-09 08:30 WIB',
    lastSyncStatus: 'Terkoneksi & Sinkron',
    totalSyncedRows: 142
  }
};

export const initialUsers: User[] = [
  {
    id: 'u-1',
    name: 'Ustadz Ahmad Fauzan, S.Pd.I, M.Ag',
    nip: '19820415 200801 1 014',
    email: 'fauzan@madani.sch.id',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    phone: '081234567890',
    department: 'Kepala Pusat Teknologi & IT',
    status: 'active'
  },
  {
    id: 'u-2',
    name: 'Dra. Hj. Nurul Hidayah, M.Pd',
    nip: '19760310 200312 2 001',
    email: 'nurul.kurikulum@madani.sch.id',
    role: 'waka_kurikulum',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    phone: '081298765432',
    department: 'Wakil Kepala Bidang Kurikulum',
    mapel: ['Biologi', 'Al-Qur\'an Hadits'],
    status: 'active'
  },
  {
    id: 'u-3',
    name: 'Ustadz Ridwan Al-Bantani, S.Sos.I',
    nip: '19881120 201201 1 008',
    email: 'ridwan.kesiswaan@madani.sch.id',
    role: 'waka_kesiswaan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    phone: '081311223344',
    department: 'Wakil Kepala Bidang Kesiswaan',
    mapel: ['Akidah Akhlak'],
    status: 'active'
  },
  {
    id: 'u-4',
    name: 'Ustadz Muhammad Yusuf, Al-Hafiz',
    nip: '19920805 201601 1 003',
    email: 'yusuf.tahfiz@madani.sch.id',
    role: 'pembina_asrama',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    phone: '081288990011',
    department: 'Pusat Keasramaan & Tahfiz',
    mapel: ['Tahfiz Al-Qur\'an', 'Tahsin'],
    status: 'active'
  },
  {
    id: 'u-5',
    name: 'Siti Rahmawati, S.Si, M.Pd',
    nip: '19890522 201402 2 004',
    email: 'siti.fisika@madani.sch.id',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    phone: '085712345678',
    department: 'Guru Sains',
    mapel: ['Fisika Modern', 'Astronomi Islam'],
    status: 'active'
  },
  {
    id: 'u-6',
    name: 'Drs. H. Bambang Subagyo, M.M',
    nip: '19680914 199403 1 005',
    email: 'bambang.supervisor@kemenag.go.id',
    role: 'supervisor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    phone: '081122334455',
    department: 'Pengawas Bina Kemenag',
    status: 'active'
  },
  {
    id: 'u-7',
    name: 'Pak Suparman (Komandan Regu)',
    nip: 'SC-MDN-2021-09',
    email: 'security.gate@madani.sch.id',
    role: 'security',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    phone: '089677889900',
    department: 'Pos Pengamanan & Gerbang Utama',
    status: 'active'
  }
];

export const initialClasses: Kelas[] = [
  { id: 'k-1', nama: 'X-1 Tahfiz Unggulan', tingkat: 'X', waliKelasId: 'u-4', waliKelasNama: 'Ust. Muhammad Yusuf, Al-Hafiz', ruang: 'Gedung Umar bin Khattab R.101', totalSiswa: 28, isMovingClass: false },
  { id: 'k-2', nama: 'X-2 Sains Riset', tingkat: 'X', waliKelasId: 'u-5', waliKelasNama: 'Siti Rahmawati, S.Si', ruang: 'Gedung Ibnu Sina R.102', totalSiswa: 30, isMovingClass: true },
  { id: 'k-3', nama: 'XI-1 MIPA Olimpiade', tingkat: 'XI', waliKelasId: 'u-2', waliKelasNama: 'Dra. Hj. Nurul Hidayah', ruang: 'Gedung Al-Khawarizmi R.201', totalSiswa: 26, isMovingClass: false },
  { id: 'k-4', nama: 'XI-2 IPS Humaniora', tingkat: 'XI', waliKelasId: 'u-3', waliKelasNama: 'Ust. Ridwan Al-Bantani', ruang: 'Gedung Ibnu Khaldun R.202', totalSiswa: 29, isMovingClass: false },
  { id: 'k-5', nama: 'XII-Keagamaan & Bahasa', tingkat: 'XII', waliKelasId: 'u-1', waliKelasNama: 'Ust. Ahmad Fauzan, M.Ag', ruang: 'Gedung Imam Syafi\'i R.301', totalSiswa: 25, isMovingClass: false }
];

export const jamPelajaranList: JamPelajaran[] = [
  { period: 1, startTime: '07:15', endTime: '08:00', isBreak: false, label: 'KBM 1 (Tadarus & Literasi)' },
  { period: 2, startTime: '08:00', endTime: '08:45', isBreak: false, label: 'KBM 2' },
  { period: 3, startTime: '08:45', endTime: '09:30', isBreak: false, label: 'KBM 3' },
  { period: 0, startTime: '09:30', endTime: '10:00', isBreak: true, label: 'Istirahat 1 & Sholat Dhuha' },
  { period: 4, startTime: '10:00', endTime: '10:45', isBreak: false, label: 'KBM 4' },
  { period: 5, startTime: '10:45', endTime: '11:30', isBreak: false, label: 'KBM 5' },
  { period: 6, startTime: '11:30', endTime: '12:15', isBreak: false, label: 'KBM 6' },
  { period: 0, startTime: '12:15', endTime: '13:15', isBreak: true, label: 'Ishoma (Dzuhur Berjamaah)' },
  { period: 7, startTime: '13:15', endTime: '14:00', isBreak: false, label: 'KBM 7' },
  { period: 8, startTime: '14:00', endTime: '14:45', isBreak: false, label: 'KBM 8 (Refleksi Harian)' }
];

export const initialJadwal: JadwalPelajaran[] = [
  // Senin
  { id: 'j-1', hari: 'Senin', period: 1, kelasId: 'k-1', kelasName: 'X-1 Tahfiz Unggulan', subjectId: 's-1', subjectName: 'Tahfiz & Murajaah Akbar', teacherId: 'u-4', teacherName: 'Ust. Muhammad Yusuf', ruang: 'Masjid Utama' },
  { id: 'j-2', hari: 'Senin', period: 2, kelasId: 'k-1', kelasName: 'X-1 Tahfiz Unggulan', subjectId: 's-1', subjectName: 'Tahfiz & Tajwid Terapan', teacherId: 'u-4', teacherName: 'Ust. Muhammad Yusuf', ruang: 'Masjid Utama' },
  { id: 'j-3', hari: 'Senin', period: 3, kelasId: 'k-1', kelasName: 'X-1 Tahfiz Unggulan', subjectId: 's-2', subjectName: 'Bahasa Arab Fusha', teacherId: 'u-1', teacherName: 'Ust. Ahmad Fauzan', ruang: 'R.101' },
  { id: 'j-4', hari: 'Senin', period: 4, kelasId: 'k-1', kelasName: 'X-1 Tahfiz Unggulan', subjectId: 's-3', subjectName: 'Matematika Peminatan', teacherId: 'u-5', teacherName: 'Siti Rahmawati, M.Pd', ruang: 'R.101' },
  { id: 'j-5', hari: 'Senin', period: 1, kelasId: 'k-2', kelasName: 'X-2 Sains Riset', subjectId: 's-4', subjectName: 'Fisika Eksperimental', teacherId: 'u-5', teacherName: 'Siti Rahmawati, M.Pd', ruang: 'Lab Fisika' },
  { id: 'j-6', hari: 'Senin', period: 2, kelasId: 'k-2', kelasName: 'X-2 Sains Riset', subjectId: 's-4', subjectName: 'Fisika Eksperimental', teacherId: 'u-5', teacherName: 'Siti Rahmawati, M.Pd', ruang: 'Lab Fisika' },
  { id: 'j-7', hari: 'Senin', period: 3, kelasId: 'k-2', kelasName: 'X-2 Sains Riset', subjectId: 's-5', subjectName: 'Biologi Sel & Genetika', teacherId: 'u-2', teacherName: 'Dra. Hj. Nurul Hidayah', ruang: 'Lab Biologi' },
  { id: 'j-8', hari: 'Senin', period: 4, kelasId: 'k-2', kelasName: 'X-2 Sains Riset', subjectId: 's-5', subjectName: 'Biologi Sel & Genetika', teacherId: 'u-2', teacherName: 'Dra. Hj. Nurul Hidayah', ruang: 'Lab Biologi' },
  { id: 'j-9', hari: 'Senin', period: 5, kelasId: 'k-3', kelasName: 'XI-1 MIPA Olimpiade', subjectId: 's-4', subjectName: 'Fisika Gelombang', teacherId: 'u-5', teacherName: 'Siti Rahmawati, M.Pd', ruang: 'R.201' },
  { id: 'j-10', hari: 'Senin', period: 6, kelasId: 'k-3', kelasName: 'XI-1 MIPA Olimpiade', subjectId: 's-4', subjectName: 'Fisika Gelombang', teacherId: 'u-5', teacherName: 'Siti Rahmawati, M.Pd', ruang: 'R.201' }
];

export const initialStudents: Siswa[] = [
  {
    id: 's-101',
    nis: '23241001',
    nisn: '0078129901',
    nama: 'Muhammad Al-Fatih Pratama',
    kelas: 'X-1 Tahfiz Unggulan',
    jenisKelamin: 'L',
    rfidTag: 'E28068940000501',
    halaqahId: 'hq-1',
    kamarAsrama: 'Kamar Bilal bin Rabah No. 04',
    poinPelanggaran: 0,
    namaOrtu: 'Ir. Hendra Pratama',
    noHpOrtu: '081234112233',
    status: 'Aktif'
  },
  {
    id: 's-102',
    nis: '23241002',
    nisn: '0078129902',
    nama: 'Aisyah Azzahra Humaira',
    kelas: 'X-1 Tahfiz Unggulan',
    jenisKelamin: 'P',
    rfidTag: 'E28068940000502',
    halaqahId: 'hq-2',
    kamarAsrama: 'Kamar Sayyidah Khadijah No. 01',
    poinPelanggaran: 5,
    namaOrtu: 'dr. Bambang Irawan, Sp.A',
    noHpOrtu: '081399887766',
    status: 'Aktif'
  },
  {
    id: 's-103',
    nis: '23241003',
    nisn: '0078129903',
    nama: 'Fathurrahman Ibnu Malik',
    kelas: 'X-2 Sains Riset',
    jenisKelamin: 'L',
    rfidTag: 'E28068940000503',
    halaqahId: 'hq-1',
    kamarAsrama: 'Kamar Ali bin Abi Thalib No. 02',
    poinPelanggaran: 25,
    namaOrtu: 'H. Abdul Malik, S.E',
    noHpOrtu: '081900112233',
    status: 'Aktif'
  },
  {
    id: 's-104',
    nis: '23241004',
    nisn: '0078129904',
    nama: 'Salma Nabila Ramadhani',
    kelas: 'XI-1 MIPA Olimpiade',
    jenisKelamin: 'P',
    rfidTag: 'E28068940000504',
    halaqahId: 'hq-2',
    kamarAsrama: 'Kamar Aisyah binti Abu Bakar No. 03',
    poinPelanggaran: 0,
    namaOrtu: 'Drs. H. Mulyadi',
    noHpOrtu: '085211993344',
    status: 'Dispensasi'
  },
  {
    id: 's-105',
    nis: '23241005',
    nisn: '0078129905',
    nama: 'Reyhan Danendra Akbar',
    kelas: 'XI-2 IPS Humaniora',
    jenisKelamin: 'L',
    rfidTag: 'E28068940000505',
    halaqahId: 'hq-3',
    kamarAsrama: 'Kamar Salman Al-Farisi No. 05',
    poinPelanggaran: 40,
    namaOrtu: 'Dedi Kurniawan, S.H',
    noHpOrtu: '087811229988',
    status: 'Aktif'
  }
];

export const initialPresensiGuru: PresensiGuruRecord[] = [
  {
    id: 'pg-1',
    guruId: 'u-5',
    guruNama: 'Siti Rahmawati, S.Si, M.Pd',
    nip: '19890522 201402 2 004',
    tanggal: '2026-11-09',
    jamMasuk: '06:48',
    status: 'Hadir Tepat',
    latitude: -6.3051,
    longitude: 106.7537,
    jarakMeter: 18,
    isWithinRadius: true,
    catatan: 'Presensi via PWA Madrasah di Lobi Utama'
  },
  {
    id: 'pg-2',
    guruId: 'u-2',
    guruNama: 'Dra. Hj. Nurul Hidayah, M.Pd',
    nip: '19760310 200312 2 001',
    tanggal: '2026-11-09',
    jamMasuk: '06:55',
    status: 'Hadir Tepat',
    latitude: -6.3053,
    longitude: 106.7539,
    jarakMeter: 32,
    isWithinRadius: true
  },
  {
    id: 'pg-3',
    guruId: 'u-4',
    guruNama: 'Ust. Muhammad Yusuf, Al-Hafiz',
    nip: '19920805 201601 1 003',
    tanggal: '2026-11-09',
    jamMasuk: '05:15',
    status: 'Hadir Tepat',
    latitude: -6.3052,
    longitude: 106.7538,
    jarakMeter: 5,
    isWithinRadius: true,
    catatan: 'Imam sholat subuh berjamaah santri'
  }
];

export const initialJurnalMengajar: JurnalMengajar[] = [
  {
    id: 'jm-1',
    tanggal: '2026-11-09',
    hari: 'Senin',
    period: 1,
    kelasName: 'X-1 Tahfiz Unggulan',
    subjectName: 'Tahfiz & Murajaah Akbar',
    guruNama: 'Ust. Muhammad Yusuf',
    materi: 'Tasm\'i Juz 29 Surat Al-Mulk ayat 1-30 secara berpasangan',
    capaianPembelajaran: 'Santri mampu melantunkan ayat secara tartil sesuai kaidah tajwid & makharijul huruf',
    hadir: 27,
    sakit: 1,
    izin: 0,
    alpha: 0,
    kendalaKelas: '1 santri mengalami flu ringan di UKS asrama',
    catatanTindakLanjut: 'Setoran susulan dijadwalkan ba\'da isya'
  },
  {
    id: 'jm-2',
    tanggal: '2026-11-09',
    hari: 'Senin',
    period: 1,
    kelasName: 'X-2 Sains Riset',
    subjectName: 'Fisika Eksperimental',
    guruNama: 'Siti Rahmawati, M.Pd',
    materi: 'Analisis Gerak Parabola dengan Sensor Tracker Digital',
    capaianPembelajaran: 'Memverifikasi hubungan sudut elevasi terhadap jarak jangkauan proyektil',
    hadir: 29,
    sakit: 0,
    izin: 1,
    alpha: 0,
    kendalaKelas: 'Sensor tracker di meja 4 perlu kalibrasi ulang',
    catatanTindakLanjut: 'Telah dikoordinasikan dengan teknisi lab fisika'
  }
];

export const initialSupervisi: SupervisiAkademik[] = [
  {
    id: 'sup-1',
    nomorSurat: 'SPV/MADANI/XI/2026/042',
    tanggal: '2026-11-05',
    guruId: 'u-5',
    guruNama: 'Siti Rahmawati, S.Si, M.Pd',
    nip: '19890522 201402 2 004',
    supervisorNama: 'Drs. H. Bambang Subagyo, M.M (Pengawas)',
    mapel: 'Fisika Modern',
    kelas: 'XI-1 MIPA Olimpiade',
    skorPerencanaan: 3.85,
    skorPelaksanaan: 3.90,
    skorPenilaian: 3.80,
    skorRefleksi: 3.75,
    nilaiAkhir: 95.6,
    predikat: 'Amat Baik (A)',
    catatanKelebihan: 'Integrasi simulasi digital PhET sangat interaktif dan memicu nalar kritis santri secara mandiri.',
    catatanPembinaan: 'Diferensiasi lembar kerja untuk santri slow learner perlu diperbanyak variasinya.',
    rekomendasi: 'Direkomendasikan menjadi Guru Model Kurikulum Berbasis Riset Kemenag Kota.',
    status: 'Tuntas'
  },
  {
    id: 'sup-2',
    nomorSurat: 'SPV/MADANI/XI/2026/043',
    tanggal: '2026-11-07',
    guruId: 'u-2',
    guruNama: 'Dra. Hj. Nurul Hidayah, M.Pd',
    nip: '19760310 200312 2 001',
    supervisorNama: 'Dr. H. Muhammad Farhan, M.Pd.I (Kepala Madrasah)',
    mapel: 'Biologi Sel & Genetika',
    kelas: 'X-2 Sains Riset',
    skorPerencanaan: 3.70,
    skorPelaksanaan: 3.80,
    skorPenilaian: 3.65,
    skorRefleksi: 3.60,
    nilaiAkhir: 92.2,
    predikat: 'Amat Baik (A)',
    catatanKelebihan: 'Pengaitan materi genetika dengan tadabbur ayat Al-Qur\'an Surat An-Najm sangat menyentuh dan kontekstual.',
    catatanPembinaan: 'Optimalkan instrumen asesmen diagnostik di awal pembelajaran.',
    rekomendasi: 'Pertahankan metode integrasi Islam dan Sains Modern.',
    status: 'Tuntas'
  }
];

export const initialRFIDLogs: RFIDPresensiLog[] = [
  { id: 'rf-1', timestamp: '06:34:12', rfidTag: 'E28068940000501', nis: '23241001', namaSiswa: 'Muhammad Al-Fatih Pratama', kelas: 'X-1 Tahfiz', tipe: 'Masuk Gerbang', mesinId: 'GATE-UTAMA-01', status: 'Berhasil' },
  { id: 'rf-2', timestamp: '06:38:45', rfidTag: 'E28068940000502', nis: '23241002', namaSiswa: 'Aisyah Azzahra Humaira', kelas: 'X-1 Tahfiz', tipe: 'Masuk Gerbang', mesinId: 'GATE-UTAMA-02', status: 'Berhasil' },
  { id: 'rf-3', timestamp: '06:42:01', rfidTag: 'E28068940000503', nis: '23241003', namaSiswa: 'Fathurrahman Ibnu Malik', kelas: 'X-2 Sains', tipe: 'Masuk Gerbang', mesinId: 'GATE-UTAMA-01', status: 'Berhasil' },
  { id: 'rf-4', timestamp: '06:45:22', rfidTag: 'E28068940000505', nis: '23241005', namaSiswa: 'Reyhan Danendra Akbar', kelas: 'XI-2 IPS', tipe: 'Masuk Gerbang', mesinId: 'GATE-UTAMA-01', status: 'Berhasil' }
];

export const initialDispensasi: DispensasiSiswa[] = [
  {
    id: 'disp-1',
    nomorDispensasi: 'DISP/KMN/XI/2026/018',
    tanggalDiajukan: '2026-11-08',
    tanggalMulai: '2026-11-09',
    tanggalSelesai: '2026-11-12',
    keperluan: 'Delegasi Olimpiade Sains Madrasah (OSM) Nasional 2026 Tingkat Provinsi',
    penyelenggara: 'Direktorat KSKK Madrasah Kemenag RI',
    kategori: 'Lomba Akademik/Sains',
    siswaList: [
      { siswaId: 's-104', nama: 'Salma Nabila Ramadhani', nis: '23241004', kelas: 'XI-1 MIPA Olimpiade' },
      { siswaId: 's-103', nama: 'Fathurrahman Ibnu Malik', nis: '23241003', kelas: 'X-2 Sains Riset' }
    ],
    berkasSuratUndangan: 'Surat_Undangan_OSM_2026_Kemenag.pdf',
    statusKurikulum: 'Disetujui',
    statusKesiswaan: 'Disetujui',
    catatanPersetujuan: 'Diberikan dispensasi penuh KBM, tugas mandiri dapat diserahkan tanggal 14 November 2026.'
  }
];

export const initialPelanggaran: PelanggaranDisiplin[] = [
  {
    id: 'pel-1',
    tanggal: '2026-11-04',
    siswaId: 's-105',
    siswaNama: 'Reyhan Danendra Akbar',
    kelas: 'XI-2 IPS Humaniora',
    jenisPelanggaran: 'Membawa Smartphone tanpa izin resmi saat jam wajib asrama',
    kategori: 'Sedang',
    poin: 20,
    sanksiDiberikan: 'Penyitaan gadget selama 14 hari di lemari sarpras asrama & setoran hafalan 1 juz',
    statusPenanganan: 'Ditangani Wali Kelas',
    dicatatOleh: 'Ust. Muhammad Yusuf (Pembina Asrama)'
  },
  {
    id: 'pel-2',
    tanggal: '2026-10-28',
    siswaId: 's-105',
    siswaNama: 'Reyhan Danendra Akbar',
    kelas: 'XI-2 IPS Humaniora',
    jenisPelanggaran: 'Terlambat mengikuti sholat subuh berjamaah di masjid',
    kategori: 'Ringan',
    poin: 10,
    sanksiDiberikan: 'Merapikan mushaf Al-Qur\'an di lantai 2 masjid madrasah',
    statusPenanganan: 'Ditangani Wali Kelas',
    dicatatOleh: 'Ust. Ridwan Al-Bantani'
  }
];

export const initialHalaqah: HalaqahTahfiz[] = [
  { id: 'hq-1', namaHalaqah: 'Halaqah Utsman bin Affan (Juz 28-30)', musyrifNama: 'Ust. Muhammad Yusuf, Al-Hafiz', lokasi: 'Serambi Masjid Sisi Kanan', totalSantri: 12, targetSemester: '3 Juz Mutqin', waktu: 'Ba\'da Subuh' },
  { id: 'hq-2', namaHalaqah: 'Halaqah Maryam Al-Adzra (Juz 1-5)', musyrifNama: 'Ustadzah Fatimah Azzahra, Lc', lokasi: 'Aula Asrama Putri Lt.2', totalSantri: 14, targetSemester: '5 Juz Mutqin', waktu: 'Ba\'da Maghrib' },
  { id: 'hq-3', namaHalaqah: 'Halaqah Zaid bin Tsabit (Tahsin & Tajwid)', musyrifNama: 'Ust. H. Syarif Hidayatullah', lokasi: 'Gazebo Literasi Madrasah', totalSantri: 10, targetSemester: 'Tahsin Matan Jazariyah', waktu: 'Ba\'da Ashar' }
];

export const initialProgresTahfiz: ProgresTahfiz[] = [
  {
    id: 'pt-1',
    tanggal: '2026-11-09',
    siswaId: 's-101',
    siswaNama: 'Muhammad Al-Fatih Pratama',
    halaqahNama: 'Halaqah Utsman bin Affan (Juz 28-30)',
    surah: 'Surat Al-Mulk',
    ayatAwal: 1,
    ayatAkhir: 30,
    kategori: 'Murajaah (Lama)',
    kualitasHafalan: 'Mutqin (A)',
    kelancaranTajwid: 'Sangat Fasih',
    catatanMusyrif: 'Alhamdulillah makhraj ghunnah dan mad jaiz munfashil sangat teratur dan tenang.'
  },
  {
    id: 'pt-2',
    tanggal: '2026-11-09',
    siswaId: 's-102',
    siswaNama: 'Aisyah Azzahra Humaira',
    halaqahNama: 'Halaqah Maryam Al-Adzra (Juz 1-5)',
    surah: 'Surat Al-Baqarah',
    ayatAwal: 142,
    ayatAkhir: 155,
    kategori: 'Ziyadah (Baru)',
    kualitasHafalan: 'Jayyid Jiddan (B+)',
    kelancaranTajwid: 'Fasih',
    catatanMusyrif: 'Perhatikan dengung pada ayat 148 saat perpindahan waqaf.'
  }
];

export const initialIzinAsrama: IzinKeluarAsrama[] = [
  {
    id: 'iza-1',
    kodeIzin: 'IZN-ASR-202611-008',
    siswaId: 's-103',
    siswaNama: 'Fathurrahman Ibnu Malik',
    kelas: 'X-2 Sains Riset',
    kamar: 'Kamar Ali bin Abi Thalib No. 02',
    keperluan: 'Pemeriksaan Gigi ke Dokter Spesialis Rumah Sakit Sari Asih',
    waktuKeluarRencana: '2026-11-09 15:30',
    waktuKembaliRencana: '2026-11-09 20:00',
    namaPenjemput: 'H. Abdul Malik (Ayah Kandung)',
    kontakPenjemput: '081900112233',
    statusPembina: 'Disetujui',
    statusKeamanan: 'Menunggu di Pos'
  }
];

export const initialBukuPerpustakaan: BukuPerpustakaan[] = [
  { id: 'bk-1', isbn: '978-602-03-3450-1', judul: 'Tafsir Al-Mishbah Vol. 1 (Al-Fatihah - Al-Baqarah)', pengarang: 'Prof. Dr. M. Quraish Shihab', penerbit: 'Lentera Hati', kategori: 'Agama Islam / Kitab', lokasiRak: 'Rak A-01 Agama', totalEksemplar: 8, tersedia: 5 },
  { id: 'bk-2', isbn: '978-013-40-9341-3', judul: 'University Physics with Modern Physics 14th Ed', pengarang: 'Hugh D. Young, Roger A. Freedman', penerbit: 'Pearson Education', kategori: 'Sains & Teknologi', lokasiRak: 'Rak S-03 Sains', totalEksemplar: 12, tersedia: 9 },
  { id: 'bk-3', isbn: '978-979-30-6279-2', judul: 'Muqaddimah Ibnu Khaldun', pengarang: 'Ibnu Khaldun', penerbit: 'Pustaka Al-Kautsar', kategori: 'Sosial & Humaniora', lokasiRak: 'Rak H-02 Sejarah', totalEksemplar: 6, tersedia: 4 }
];

export const initialPeminjaman: PeminjamanBuku[] = [
  {
    id: 'pj-1',
    kodePinjam: 'PJM-202611-003',
    bukuId: 'bk-2',
    judulBuku: 'University Physics with Modern Physics 14th Ed',
    nis: '23241003',
    namaSiswa: 'Fathurrahman Ibnu Malik',
    kelas: 'X-2 Sains Riset',
    tanggalPinjam: '2026-11-02',
    tenggatKembali: '2026-11-09',
    denda: 0,
    status: 'Sedang Dipinjam'
  }
];

export const initialInventaris: InventarisSarpras[] = [
  { id: 'inv-1', kodeBarang: 'LAB-FSK-001', namaBarang: 'Sensor Proyektil Gerak Parabola Digital Vernier', kategori: 'Laboratorium Sains', lokasiRuang: 'Laboratorium Fisika Lt. 2', kondisi: 'Baik', jumlah: 6, satuan: 'Set', tahunPerolehan: 2024 },
  { id: 'inv-2', kodeBarang: 'MM-PROJ-012', namaBarang: 'Proyektor Laser Epson 4000 Lumens WXGA', kategori: 'Elektronik & Multimedia', lokasiRuang: 'Kelas X-1 Tahfiz Unggulan', kondisi: 'Baik', jumlah: 1, satuan: 'Unit', tahunPerolehan: 2025 },
  { id: 'inv-3', kodeBarang: 'ASR-LEM-044', namaBarang: 'Lemari Santri 3 Pintu Kayu Jati Belanda', kategori: 'Mebel & Ruang Belajar', lokasiRuang: 'Asrama Putra Gedung Bilal', kondisi: 'Baik', jumlah: 24, satuan: 'Unit', tahunPerolehan: 2023 }
];

export const initialBukuTamu: BukuTamuHumas[] = [
  {
    id: 'bt-1',
    tanggal: '2026-11-09',
    jam: '08:30',
    nama: 'Dr. H. Sulaiman, M.Ed',
    instansi: 'Balai Diklat Keagamaan Kemenag Jakarta',
    tujuanBertemu: 'Kepala Madrasah / Waka Kurikulum',
    keperluan: 'Monitoring dan Evaluasi Implementasi Kurikulum Berbasis Cinta (KBC)',
    kontak: '081299445566',
    status: 'Sedang Berlangsung'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'u-2',
    senderName: 'Dra. Hj. Nurul Hidayah, M.Pd (Waka Kurikulum)',
    senderRole: 'Waka Kurikulum',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    message: 'Bapak/Ibu dewan guru yang terhormat, pengisian Jurnal KBM jam ke-1 dan ke-2 harap diselesaikan sebelum sholat Dhuha pukul 09.30 WIB. Terima kasih.',
    timestamp: '07:45',
    pinned: true
  },
  {
    id: 'msg-2',
    senderId: 'u-5',
    senderName: 'Siti Rahmawati, S.Si (Guru Sains)',
    senderRole: 'Guru',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    message: 'Siap Bu Nurul, kelas X-2 Sains praktikum fisika sudah selesai dan jurnal sudah diinput via PWA.',
    timestamp: '08:15'
  },
  {
    id: 'msg-3',
    senderId: 'u-3',
    senderName: 'Ust. Ridwan Al-Bantani (Waka Kesiswaan)',
    senderRole: 'Waka Kesiswaan',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    message: 'Mengingatkan kembali tim satgas kedisiplinan, besok pagi ada pemeriksaan kerapian seragam dan rambut santri putra saat scan RFID gerbang.',
    timestamp: '08:32'
  }
];

export const initialKalender: KalenderEvent[] = [
  { id: 'cal-1', tanggal: '2026-11-09', judul: 'KBM Efektif Pekan ke-14 & Uji Coba Asesmen CBT', kategori: 'KBM Efektif', deskripsi: 'Pelaksanaan KBM normal seluruh jenjang X-XII sesuai jadwal.', isPresensiLocked: false },
  { id: 'cal-2', tanggal: '2026-11-12', judul: 'Khotmil Qur\'an & Peringatan Hari Pahlawan Nasional', kategori: 'Kegiatan Ekstrakurikuler / PHBI', deskripsi: 'Seluruh santri berkumpul di masjid utama memakai busana muslim putih.', isPresensiLocked: false },
  { id: 'cal-3', tanggal: '2026-11-25', judul: 'Hari Guru Nasional & Tasyakuran Pendidik Madani', kategori: 'Kegiatan Ekstrakurikuler / PHBI', deskripsi: 'Upacara bendera & pentas seni santri untuk para asatidz.', isPresensiLocked: false },
  { id: 'cal-4', tanggal: '2026-12-01', judul: 'Asesmen Akhir Semester (AAS) Ganjil TA 2026/2027', kategori: 'Ujian / Asesmen', deskripsi: 'KBM reguler dialihkan menjadi sesi asesmen komputer dan tasm\'i akbar.', isPresensiLocked: true }
];

export const initialWALogs: WhatsAppLog[] = [
  {
    id: 'wa-1',
    timestamp: '06:34',
    penerima: 'Ir. Hendra Pratama (Wali Siswa: M. Al-Fatih)',
    nomorHp: '081234112233',
    template: 'Notifikasi Presensi Masuk',
    status: 'Terkirim',
    pesanPreview: '[MADANI INFO] Assalamu\'alaikum. Ananda Muhammad Al-Fatih Pratama (X-1) telah tiba di Madrasah pukul 06:34 WIB. Presensi RFID Gerbang Tercatat.'
  },
  {
    id: 'wa-2',
    timestamp: '07:15',
    penerima: 'H. Abdul Malik (Wali Siswa: Fathurrahman)',
    nomorHp: '081900112233',
    template: 'Persetujuan Dispensasi',
    status: 'Terkirim',
    pesanPreview: '[MADANI INFO] Assalamu\'alaikum. Surat Dispensasi Delegasi Olimpiade Sains untuk ananda Fathurrahman telah disetujui Waka Kurikulum & Kesiswaan.'
  }
];

export const initialGASSyncLogs: GASSyncLog[] = [
  {
    id: 'gas-1',
    timestamp: '08:30:15',
    sheetTarget: 'Presensi_Guru',
    action: 'Auto-Sync',
    rowsCount: 3,
    status: 'Sukses',
    details: '3 baris kehadiran ceklok GPS guru tersinkronisasi ke Google Spreadsheet via Apps Script Web App.'
  },
  {
    id: 'gas-2',
    timestamp: '08:15:42',
    sheetTarget: 'Presensi_RFID',
    action: 'Auto-Sync',
    rowsCount: 4,
    status: 'Sukses',
    details: '4 log scan gerbang santri berhasil di-append ke tab Presensi_RFID.'
  },
  {
    id: 'gas-3',
    timestamp: '07:45:00',
    sheetTarget: 'Jurnal_KBM',
    action: 'Manual-Sync',
    rowsCount: 2,
    status: 'Sukses',
    details: 'Rekap jurnal mengajar kelas X-1 & X-2 berhasil diunggah ke Google Drive Spreadsheet.'
  }
];
