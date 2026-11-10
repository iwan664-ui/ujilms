/**
 * Mobile Teacher PWA View
 * Touch-optimized teacher dashboard with bottom navigation, quick GPS punch, and streamlined journal
 */

import React, { useState } from 'react';
import { useMadani } from '../../context/MadaniContext';
import {
  Home,
  Clock,
  MapPin,
  FileText,
  MessageSquare,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Users,
  Send,
  X,
  ChevronRight
} from 'lucide-react';

interface Props {
  onOpenGPSModal: () => void;
  onOpenChatModal: () => void;
}

export const MobileTeacherView: React.FC<Props> = ({ onOpenGPSModal, onOpenChatModal }) => {
  const {
    currentUser,
    jadwal,
    classes,
    presensiGuru,
    addJurnalMengajar,
    schoolProfile
  } = useMadani();

  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'jadwal' | 'jurnal' | 'chat'>('home');
  const [showQuickJurnalForm, setShowQuickJurnalForm] = useState(false);
  const [materiInput, setMateriInput] = useState('');
  const [capaianInput, setCapaianInput] = useState('');

  // Check today's presensi for current user
  const todayStr = new Date().toISOString().split('T')[0];
  const myTodayPresensi = presensiGuru.find(
    p => p.guruId === currentUser.id && p.tanggal === todayStr
  );

  // Today's schedule for current teacher
  const mySchedule = jadwal.filter(
    j => j.hari === 'Senin' && (j.teacherId === currentUser.id || j.teacherName.includes(currentUser.name.split(' ')[0]))
  );

  const handleQuickJurnalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materiInput.trim()) return;

    addJurnalMengajar({
      tanggal: todayStr,
      hari: 'Senin',
      period: 1,
      kelasName: mySchedule[0]?.kelasName || 'X-1 Tahfiz Unggulan',
      subjectName: mySchedule[0]?.subjectName || 'Mata Pelajaran Aktif',
      guruNama: currentUser.name,
      materi: materiInput,
      capaianPembelajaran: capaianInput || 'Tercapai sesuai indikator KBM',
      hadir: 28,
      sakit: 0,
      izin: 0,
      alpha: 0,
      kendalaKelas: 'KBM berjalan lancar dan tertib.'
    });

    setMateriInput('');
    setCapaianInput('');
    setShowQuickJurnalForm(false);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-100 min-h-screen pb-20 border-x border-slate-200 flex flex-col shadow-2xl relative">
      {/* Mobile PWA Header */}
      <div className="bg-slate-900 text-white p-4 pt-6 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-emerald-400 block font-semibold uppercase">
                PWA Guru Madani
              </span>
              <h2 className="text-sm font-bold truncate leading-tight">{currentUser.name}</h2>
              <span className="text-[11px] text-slate-400 block font-mono">NIP: {currentUser.nip}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-800 rounded-lg text-emerald-400 block">
              {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 flex-1">
        {/* Quick GPS Status Card */}
        <div className={`p-4 rounded-2xl border shadow-xs ${
          myTodayPresensi
            ? 'bg-emerald-500 text-white border-emerald-600'
            : 'bg-white text-slate-900 border-slate-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                myTodayPresensi ? 'text-emerald-100' : 'text-slate-500'
              }`}>
                Status Kehadiran Hari Ini
              </span>
              <h3 className="text-base font-extrabold mt-0.5">
                {myTodayPresensi ? `Hadir (${myTodayPresensi.jamMasuk} WIB)` : 'Belum Ceklok Hari Ini'}
              </h3>
              <p className={`text-xs mt-1 ${myTodayPresensi ? 'text-emerald-100' : 'text-slate-500'}`}>
                {myTodayPresensi
                  ? `Jarak ke madrasah: ${myTodayPresensi.jarakMeter}m (Tervalidasi Geofence)`
                  : 'Silakan lakukan ceklok GPS dalam radius 150m dari kampus madrasah'}
              </p>
            </div>
            <button
              onClick={onOpenGPSModal}
              className={`px-3 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 ${
                myTodayPresensi
                  ? 'bg-white text-emerald-800'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{myTodayPresensi ? 'Cek Ulang' : 'Ceklok GPS'}</span>
            </button>
          </div>
        </div>

        {/* Quick Action Matrix for Teachers */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowQuickJurnalForm(true)}
            className="p-3.5 bg-white rounded-xl border border-slate-200 text-left hover:border-indigo-400 transition-all shadow-2xs active:scale-98"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Jurnal KBM Cepat</span>
            <span className="text-[11px] text-slate-500">Isi materi &amp; presensi kelas</span>
          </button>

          <button
            onClick={onOpenChatModal}
            className="p-3.5 bg-white rounded-xl border border-slate-200 text-left hover:border-emerald-400 transition-all shadow-2xs active:scale-98"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 block">Ruang Obrolan</span>
            <span className="text-[11px] text-slate-500">Koordinasi dewan guru</span>
          </button>
        </div>

        {/* Modal Quick Jurnal */}
        {showQuickJurnalForm && (
          <div className="p-4 bg-white rounded-2xl border border-indigo-200 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Input Jurnal KBM Instan</span>
              <button
                onClick={() => setShowQuickJurnalForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleQuickJurnalSubmit} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Materi Pokok / Pembahasan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bab 4 Analisis Vektor Fisika..."
                  value={materiInput}
                  onChange={(e) => setMateriInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Capaian Pembelajaran</label>
                <input
                  type="text"
                  placeholder="Contoh: 95% santri tuntas menyelesaikan praktikum"
                  value={capaianInput}
                  onChange={(e) => setCapaianInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowQuickJurnalForm(false)}
                  className="px-3 py-1.5 text-slate-600 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-xs"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Today's Teaching Schedule List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900">Jadwal Mengajar Hari Ini</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Senin</span>
          </div>

          <div className="space-y-2.5">
            {mySchedule.length > 0 ? (
              mySchedule.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-mono">
                      Jam ke-{item.period}
                    </span>
                    <h4 className="font-bold text-slate-900">{item.subjectName}</h4>
                    <span className="text-slate-500 text-[11px] block">{item.kelasName} · {item.ruang}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    Siap KBM
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                <p>Tidak ada jadwal mengajar pada hari ini.</p>
                <span className="text-[11px] text-slate-400">Gunakan waktu untuk persiapan modul ajar / supervisi.</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Announcement */}
        <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Pemberitahuan Waka Kurikulum:</strong> Penginputan Rekap Nilai Asesmen Sumatif Tengah Semester dibuka s.d. tanggal 20 November 2026.
          </p>
        </div>
      </div>

      {/* Touch-Friendly Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveBottomNav('home')}
          className={`flex flex-col items-center gap-1 p-1 min-w-[56px] transition-colors ${
            activeBottomNav === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </button>

        <button
          onClick={() => onOpenGPSModal()}
          className="flex flex-col items-center gap-1 p-1 min-w-[56px] text-emerald-600 font-medium"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">Ceklok</span>
        </button>

        <button
          onClick={() => setShowQuickJurnalForm(true)}
          className="flex flex-col items-center gap-1 p-1 min-w-[56px] text-slate-500 hover:text-indigo-600"
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Jurnal</span>
        </button>

        <button
          onClick={() => onOpenChatModal()}
          className="flex flex-col items-center gap-1 p-1 min-w-[56px] text-slate-500 hover:text-indigo-600"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Chat</span>
        </button>
      </div>
    </div>
  );
};
