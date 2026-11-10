/**
 * Modul Kurikulum & KBM Terpadu
 * Jadwal Pelajaran (Grid & A4 Cetak), Jurnal KBM, Ceklok GPS Guru, Supervisi Akademik (1-4), Kalender & WA Gateway
 */

import React, { useState } from 'react';
import { useMadani, KurikulumTab } from '../../../context/MadaniContext';
import {
  Calendar,
  Printer,
  FileText,
  Clock,
  ShieldCheck,
  BookOpen,
  Send,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Award
} from 'lucide-react';
import { SupervisiAkademik } from '../../../types/madani';

interface Props {
  onOpenGPSModal: () => void;
}

export const KurikulumModule: React.FC<Props> = ({ onOpenGPSModal }) => {
  const {
    activeKurikulumTab,
    setActiveKurikulumTab,
    classes,
    jadwal,
    jurnalMengajar,
    presensiGuru,
    supervisi,
    addSupervisi,
    kalenderList,
    waLogs,
    sendWhatsAppNotification,
    schoolProfile,
    users
  } = useMadani();

  // Selected schedule view
  const [selectedDay, setSelectedDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'>('Senin');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [isPrintPreview, setIsPrintPreview] = useState<boolean>(false);

  // Supervisi Form State
  const [showSupervisiForm, setShowSupervisiForm] = useState(false);
  const [targetGuruId, setTargetGuruId] = useState(users.find(u => u.role === 'guru')?.id || users[0].id);
  const [supervisiKelas, setSupervisiKelas] = useState('X-1 Tahfiz Unggulan');
  const [supervisiMapel, setSupervisiMapel] = useState('Matematika Peminatan');
  const [skor1, setSkor1] = useState(3.8); // Perencanaan
  const [skor2, setSkor2] = useState(3.7); // Pelaksanaan
  const [skor3, setSkor3] = useState(3.9); // Penilaian
  const [skor4, setSkor4] = useState(3.8); // Refleksi
  const [kelebihan, setKelebihan] = useState('');
  const [pembinaan, setPembinaan] = useState('');

  // Selected supervisi for printable preview
  const [selectedSupervisiPrint, setSelectedSupervisiPrint] = useState<SupervisiAkademik | null>(null);

  // WA Test Dispatcher state
  const [waRecipient, setWaRecipient] = useState('081234567890');
  const [waTargetName, setWaTargetName] = useState('Wali Santri');
  const [waMessage, setWaMessage] = useState('[MADANI INFO] Uji coba pengiriman notifikasi gerbang WhatsApp.');

  const handleSupervisiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guru = users.find(u => u.id === targetGuruId);
    const avgScore = ((skor1 + skor2 + skor3 + skor4) / 16) * 100;
    const predikat: SupervisiAkademik['predikat'] =
      avgScore >= 90 ? 'Amat Baik (A)' : avgScore >= 80 ? 'Baik (B)' : avgScore >= 70 ? 'Cukup (C)' : 'Perlu Pembinaan (D)';

    addSupervisi({
      tanggal: new Date().toISOString().split('T')[0],
      guruId: targetGuruId,
      guruNama: guru?.name || 'Dewan Guru',
      nip: guru?.nip || '19890522 201402 2 004',
      supervisorNama: 'Dr. H. Muhammad Farhan, M.Pd.I (Kepala Madrasah)',
      mapel: supervisiMapel,
      kelas: supervisiKelas,
      skorPerencanaan: skor1,
      skorPelaksanaan: skor2,
      skorPenilaian: skor3,
      skorRefleksi: skor4,
      nilaiAkhir: Math.round(avgScore * 10) / 10,
      predikat,
      catatanKelebihan: kelebihan || 'Penyampaian materi terstruktur dengan media pembelajaran digital interaktif.',
      catatanPembinaan: pembinaan || 'Perlu peningkatan variasi lembar kerja mandiri untuk diferensiasi pembelajaran.',
      rekomendasi: 'Memenuhi standar akreditasi kurikulum madrasah digital.',
      status: 'Tuntas'
    });

    setShowSupervisiForm(false);
  };

  const handleSendWATest = (e: React.FormEvent) => {
    e.preventDefault();
    sendWhatsAppNotification(
      waTargetName,
      waRecipient,
      'Peringatan Ketidakhadiran',
      waMessage
    );
    alert('Notifikasi WhatsApp berhasil dikirim ke antrean Fonnte.');
  };

  return (
    <div className="space-y-6">
      {/* Subtab Segmented Navigation Bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveKurikulumTab('jadwal')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'jadwal'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Jadwal &amp; Cetak A4
        </button>
        <button
          onClick={() => setActiveKurikulumTab('jurnal')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'jurnal'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Jurnal Mengajar
        </button>
        <button
          onClick={() => setActiveKurikulumTab('ceklok_guru')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'ceklok_guru'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ceklok GPS Kehadiran
        </button>
        <button
          onClick={() => setActiveKurikulumTab('supervisi')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'supervisi'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Supervisi Akademik
        </button>
        <button
          onClick={() => setActiveKurikulumTab('kalender_kbm')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'kalender_kbm'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kalender KBM
        </button>
        <button
          onClick={() => setActiveKurikulumTab('wa_gateway')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKurikulumTab === 'wa_gateway'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          WhatsApp Gateway
        </button>
      </div>

      {/* TAB 1: JADWAL & CETAK KLASIK A4 */}
      {activeKurikulumTab === 'jadwal' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Hari Pembelajaran:</span>
              <div className="flex items-center gap-1">
                {(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const).map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedDay === day
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPrintPreview(!isPrintPreview)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                {isPrintPreview ? 'Tutup Preview A4' : 'Format Cetak A4'}
              </button>
            </div>
          </div>

          {/* Standard Interactive Table / Grid */}
          {!isPrintPreview ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Jadwal Pembelajaran Hari {selectedDay}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kombinasi sistem kelas reguler dan moving class laboratorium
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Jam Ke-</th>
                      <th className="px-4 py-3">Waktu</th>
                      <th className="px-4 py-3">Kelas</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3">Guru Pengampu</th>
                      <th className="px-4 py-3">Ruang / Lab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jadwal
                      .filter(j => j.hari === selectedDay)
                      .map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-indigo-700">
                            Jam ke-{item.period}
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-600 tabular-nums">
                            {item.period === 1 ? '07:15 - 08:00' : item.period === 2 ? '08:00 - 08:45' : item.period === 3 ? '08:45 - 09:30' : '10:00 - 10:45'}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {item.kelasName}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-800">
                            {item.subjectName}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {item.teacherName}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {item.ruang}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Printable Classic A4 Schedule Format */
            <div className="bg-white p-8 rounded-xl border-2 border-slate-300 shadow-md max-w-4xl mx-auto space-y-6 text-slate-900">
              {/* Kop Surat Resmi Madrasah */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider">{schoolProfile.kopSuratLine1}</p>
                <p className="text-xs font-bold uppercase tracking-wider">{schoolProfile.kopSuratLine2}</p>
                <h2 className="text-base font-extrabold uppercase tracking-wide">{schoolProfile.namaSekolah}</h2>
                <p className="text-[11px] text-slate-600">{schoolProfile.alamat} · Telp: {schoolProfile.telepon}</p>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider underline">
                  JADWAL DISTRIBUSI PEMBELAJARAN (HARI {selectedDay.toUpperCase()})
                </h3>
                <p className="text-xs text-slate-500">Tahun Ajaran 2026/2027 · Semester Ganjil</p>
              </div>

              <table className="w-full text-xs border border-slate-900 text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-900 font-bold">
                    <th className="p-2 border-r border-slate-900">Jam</th>
                    <th className="p-2 border-r border-slate-900">Pukul</th>
                    <th className="p-2 border-r border-slate-900">Kelas</th>
                    <th className="p-2 border-r border-slate-900">Mata Pelajaran</th>
                    <th className="p-2 border-r border-slate-900">Guru</th>
                    <th className="p-2">Ruang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {jadwal.filter(j => j.hari === selectedDay).map(item => (
                    <tr key={item.id} className="border-b border-slate-200">
                      <td className="p-2 border-r border-slate-900 font-mono text-center">{item.period}</td>
                      <td className="p-2 border-r border-slate-900 font-mono">07:15 - 08:00</td>
                      <td className="p-2 border-r border-slate-900 font-semibold">{item.kelasName}</td>
                      <td className="p-2 border-r border-slate-900">{item.subjectName}</td>
                      <td className="p-2 border-r border-slate-900">{item.teacherName}</td>
                      <td className="p-2">{item.ruang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Signatures Kop */}
              <div className="pt-8 grid grid-cols-2 text-xs">
                <div>
                  <p>Mengetahui,</p>
                  <p className="font-bold">Kepala Madrasah</p>
                  <div className="h-16 flex items-center">
                    <img src={schoolProfile.ttdDigitalUrl} alt="TTD Kepala" className="h-12 w-auto opacity-80" />
                  </div>
                  <p className="font-bold underline">{schoolProfile.kepalaSekolah}</p>
                  <p className="font-mono text-[11px]">NIP. {schoolProfile.nipKepala}</p>
                </div>
                <div className="text-right">
                  <p>{schoolProfile.kota}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="font-bold">Waka Bidang Kurikulum</p>
                  <div className="h-16 flex items-center justify-end">
                    <span className="font-mono text-xs text-slate-400 italic">[TERTANDA TANGAN DIGITAL]</span>
                  </div>
                  <p className="font-bold underline">Dra. Hj. Nurul Hidayah, M.Pd</p>
                  <p className="font-mono text-[11px]">NIP. 19760310 200312 2 001</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: JURNAL MENGAJAR */}
      {activeKurikulumTab === 'jurnal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Rekap Jurnal Mengajar &amp; Presensi Kelas</h3>
              <p className="text-xs text-slate-500">Catatan capaian materi, kendala kelas, dan statistik kehadiran siswa per sesi KBM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {jurnalMengajar.map(j => (
              <div key={j.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Jam ke-{j.period}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{j.kelasName} · {j.subjectName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-medium text-slate-800">{j.guruNama}</span>
                    <span className="font-mono">{j.hari}, {j.tanggal}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Materi Pokok: </span>
                    <span className="text-slate-900">{j.materi}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Capaian Pembelajaran: </span>
                    <span className="text-slate-600">{j.capaianPembelajaran}</span>
                  </div>
                  {j.kendalaKelas && (
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px]">
                      <strong>Catatan / Kendala:</strong> {j.kendalaKelas} (Tindak Lanjut: {j.catatanTindakLanjut || '-'})
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-slate-600 font-mono">
                    <span className="text-emerald-700 font-bold">Hadir: {j.hadir}</span>
                    <span className="text-blue-700">Sakit: {j.sakit}</span>
                    <span className="text-amber-700">Izin: {j.izin}</span>
                    <span className="text-rose-700">Alpha: {j.alpha}</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi KBM
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CEKLOK GPS GURU */}
      {activeKurikulumTab === 'ceklok_guru' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Rekap Ceklok Kehadiran Dewan Guru (Geofencing GPS)</h3>
              <p className="text-xs text-slate-500">Radius toleransi kampus madrasah: {schoolProfile.geofence.radiusMeters} meter</p>
            </div>
            <button
              onClick={onOpenGPSModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Buka Terminal Ceklok
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3">Nama Guru &amp; NIP</th>
                  <th className="px-4 py-3">Waktu Ceklok</th>
                  <th className="px-4 py-3">Jarak ke Madrasah</th>
                  <th className="px-4 py-3">Koordinat GPS</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {presensiGuru.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold text-slate-900 block">{p.guruNama}</span>
                      <span className="font-mono text-slate-500 text-[11px]">NIP: {p.nip}</span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900 tabular-nums">
                      {p.jamMasuk} WIB
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-800 tabular-nums">
                      {p.jarakMeter} meter
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                      {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        p.status === 'Hadir Tepat' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">
                      {p.catatan || 'Ceklok Geofence Valid'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SUPERVISI AKADEMIK */}
      {activeKurikulumTab === 'supervisi' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Supervisi Akademik &amp; Bukti Pembinaan Guru</h3>
              <p className="text-xs text-slate-500">Instrumen penilaian skala 1-4, rekap skor terpadu, dan cetak bukti pembinaan resmi</p>
            </div>
            <button
              onClick={() => setShowSupervisiForm(!showSupervisiForm)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> {showSupervisiForm ? 'Tutup Form' : 'Input Supervisi Baru'}
            </button>
          </div>

          {/* Form Supervisi Baru */}
          {showSupervisiForm && (
            <form onSubmit={handleSupervisiSubmit} className="bg-white p-6 rounded-xl border border-indigo-200 shadow-md space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Instrumen Penilaian Supervisi Pembelajaran (Skala 1.0 - 4.0)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guru yang Disupervisi</label>
                  <select
                    value={targetGuruId}
                    onChange={(e) => setTargetGuruId(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    {users.filter(u => u.role === 'guru' || u.role === 'waka_kurikulum').map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={supervisiMapel}
                    onChange={(e) => setSupervisiMapel(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kelas Target</label>
                  <input
                    type="text"
                    value={supervisiKelas}
                    onChange={(e) => setSupervisiKelas(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Rubric 1 - 4 Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">1. Perencanaan (RPP/Modul)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="4"
                    value={skor1}
                    onChange={(e) => setSkor1(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Maks. 4.00</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">2. Pelaksanaan KBM</label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="4"
                    value={skor2}
                    onChange={(e) => setSkor2(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Maks. 4.00</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">3. Asesmen &amp; Penilaian</label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="4"
                    value={skor3}
                    onChange={(e) => setSkor3(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Maks. 4.00</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">4. Refleksi &amp; Umpan Balik</label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="4"
                    value={skor4}
                    onChange={(e) => setSkor4(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Maks. 4.00</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Catatan Keunggulan Pembelajaran</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Penguasaan materi sangat baik, pemanfaatan laboratorium optimal..."
                    value={kelebihan}
                    onChange={(e) => setKelebihan(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Catatan Pembinaan &amp; Rekomendasi</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Perbanyak asesmen diagnostik di awal pembelajaran..."
                    value={pembinaan}
                    onChange={(e) => setPembinaan(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSupervisiForm(false)}
                  className="px-4 py-2 text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-xs"
                >
                  Simpan &amp; Terbitkan Bukti Supervisi
                </button>
              </div>
            </form>
          )}

          {/* List of Supervisi Cards */}
          <div className="grid grid-cols-1 gap-4">
            {supervisi.map(item => (
              <div key={item.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                      {item.nomorSurat}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {item.guruNama} · {item.mapel} ({item.kelas})
                    </h4>
                    <p className="text-xs text-slate-500">Supervisor: {item.supervisorNama} · Tanggal: {item.tanggal}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{item.nilaiAkhir}</span>
                      <span className="text-xs text-emerald-700 font-bold block">{item.predikat}</span>
                    </div>
                    <button
                      onClick={() => setSelectedSupervisiPrint(item)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" /> Cetak Bukti PDF
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Perencanaan</span>
                    <span className="font-mono font-bold text-slate-800">{item.skorPerencanaan.toFixed(2)} / 4.0</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Pelaksanaan</span>
                    <span className="font-mono font-bold text-slate-800">{item.skorPelaksanaan.toFixed(2)} / 4.0</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Penilaian</span>
                    <span className="font-mono font-bold text-slate-800">{item.skorPenilaian.toFixed(2)} / 4.0</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Refleksi</span>
                    <span className="font-mono font-bold text-slate-800">{item.skorRefleksi.toFixed(2)} / 4.0</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                  <p><strong>Kelebihan:</strong> {item.catatanKelebihan}</p>
                  <p><strong>Tindak Lanjut / Pembinaan:</strong> {item.catatanPembinaan}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Printable Modal Bukti Pembinaan */}
          {selectedSupervisiPrint && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-300 space-y-5 text-slate-900">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-base">Bukti Hasil Supervisi Akademik Guru</h3>
                  <button onClick={() => setSelectedSupervisiPrint(null)} className="text-slate-400 hover:text-slate-800">
                    Tutup
                  </button>
                </div>

                <div className="text-center pb-3 border-b-2 border-slate-900 space-y-0.5">
                  <p className="text-xs font-bold">{schoolProfile.kopSuratLine1}</p>
                  <h2 className="text-base font-extrabold">{schoolProfile.namaSekolah}</h2>
                  <p className="text-xs text-slate-600">{schoolProfile.alamat}</p>
                </div>

                <div className="text-center">
                  <h3 className="font-bold underline text-sm uppercase">LEMBAR BUKTI PEMBINAAN &amp; SUPERVISI AKADEMIK</h3>
                  <p className="font-mono text-xs">Nomor: {selectedSupervisiPrint.nomorSurat}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <p><strong>Nama Guru:</strong> {selectedSupervisiPrint.guruNama}</p>
                  <p><strong>NIP:</strong> {selectedSupervisiPrint.nip}</p>
                  <p><strong>Mata Pelajaran / Kelas:</strong> {selectedSupervisiPrint.mapel} ({selectedSupervisiPrint.kelas})</p>
                  <p><strong>Nilai Akhir Supervisi:</strong> <span className="font-bold font-mono text-base">{selectedSupervisiPrint.nilaiAkhir}</span> ({selectedSupervisiPrint.predikat})</p>
                  <p className="pt-2"><strong>Catatan Pembinaan:</strong> {selectedSupervisiPrint.catatanPembinaan}</p>
                </div>

                <div className="pt-8 grid grid-cols-2 text-xs">
                  <div>
                    <p>Guru yang Disupervisi,</p>
                    <div className="h-14 flex items-end">
                      <p className="font-bold underline">{selectedSupervisiPrint.guruNama}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>Kepala Madrasah / Supervisor,</p>
                    <div className="h-14 flex items-end justify-end">
                      <p className="font-bold underline">{schoolProfile.kepalaSekolah}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <button
                    onClick={() => {
                      alert('Perintah cetak dokumen supervisi dikirim ke printer.');
                      setSelectedSupervisiPrint(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
                  >
                    Cetak Lembar Resmi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: KALENDER KBM */}
      {activeKurikulumTab === 'kalender_kbm' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kalender Akademik &amp; Kunci Otomatisasi KBM</h3>
              <p className="text-xs text-slate-500">Penandaan hari libur otomatis mengunci sistem presensi RFID dan jurnal guru</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {kalenderList.map(cal => (
              <div key={cal.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{cal.tanggal}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    cal.kategori === 'KBM Efektif'
                      ? 'bg-emerald-100 text-emerald-800'
                      : cal.kategori === 'Ujian / Asesmen'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cal.kategori}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{cal.judul}</h4>
                <p className="text-xs text-slate-600">{cal.deskripsi}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    {cal.isPresensiLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-rose-600" />
                        <span className="text-rose-700 font-semibold">Presensi Terkunci</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">KBM &amp; Presensi Terbuka</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: WHATSAPP GATEWAY (FONNTE) */}
      {activeKurikulumTab === 'wa_gateway' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  WA
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Integrasi WhatsApp Gateway Fonnte API</h3>
                  <p className="text-xs text-slate-500">Koneksi otomatis pengiriman notifikasi presensi gerbang, izin, dan tagihan</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                STATUS: CONNECTED (DEVICE ACTIVE)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">API Key Fonnte Terpasang</label>
                <input
                  type="text"
                  readOnly
                  value={schoolProfile.fonnteApiKey}
                  className="w-full text-xs font-mono p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quota Pesan Tersisa</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800">
                  9.840 / 10.000 Pesan Bulan Ini
                </div>
              </div>
            </div>
          </div>

          {/* Test Dispatch Form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Uji Coba Pengiriman Pesan WhatsApp</h4>
            <form onSubmit={handleSendWATest} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nama Penerima</label>
                  <input
                    type="text"
                    value={waTargetName}
                    onChange={(e) => setWaTargetName(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nomor WhatsApp (Format: 08xxx)</label>
                  <input
                    type="text"
                    value={waRecipient}
                    onChange={(e) => setWaRecipient(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Isi Pesan Template</label>
                <textarea
                  rows={2}
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" /> Kirim Pesan Uji Coba
              </button>
            </form>
          </div>

          {/* Delivery Log Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Log Pengiriman WhatsApp Real-Time</h4>
              <span className="text-[11px] text-slate-400 font-mono">Live Broadcast</span>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Waktu</th>
                  <th className="px-4 py-2.5">Penerima &amp; Nomor</th>
                  <th className="px-4 py-2.5">Template</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Pratinjau Pesan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {waLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-2.5 font-mono text-slate-500">{log.timestamp} WIB</td>
                    <td className="px-4 py-2.5">
                      <span className="font-semibold text-slate-900 block">{log.penerima}</span>
                      <span className="font-mono text-slate-500 text-[11px]">{log.nomorHp}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">{log.template}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600 text-[11px] max-w-xs truncate">
                      {log.pesanPreview}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
