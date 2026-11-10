/**
 * MADANI Executive Dashboard Overview
 * Metric cards, real-time KBM status, recent logs, and rapid institutional action hubs
 */

import React from 'react';
import { useMadani } from '../../context/MadaniContext';
import {
  Users,
  GraduationCap,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  FileText,
  MapPin,
  QrCode,
  Moon,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Download
} from 'lucide-react';

interface Props {
  onOpenGPSModal: () => void;
  onOpenRFIDModal: () => void;
  onOpenDispensasiModal: () => void;
}

export const DashboardOverview: React.FC<Props> = ({
  onOpenGPSModal,
  onOpenRFIDModal,
  onOpenDispensasiModal
}) => {
  const {
    students,
    classes,
    presensiGuru,
    jurnalMengajar,
    progresTahfizList,
    dispensasiList,
    setActiveModule,
    setActiveKurikulumTab,
    setActiveKesiswaanTab,
    setActiveAsramaTab,
    downloadCompleteZIPPackage
  } = useMadani();

  const totalSiswa = students.length;
  const siswaDispensasi = students.filter(s => s.status === 'Dispensasi').length;
  const guruHadirHariIni = presensiGuru.length;
  const jurnalTuntasHariIni = jurnalMengajar.length;
  const setoranTahfizCount = progresTahfizList.length;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Institutional Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PORTAL EKSEKUTIF TERPADU
            </span>
            <span className="text-xs text-slate-400">
              Tahun Ajaran 2026/2027 · Semester Ganjil
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Sistem Informasi &amp; LMS Madrasah Digital "MADANI"
          </h1>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Platform terpadu pengelolaan KBM modern, absensi GPS guru geofencing, scanner RFID gerbang, rekap nilai &amp; supervisi, tahfiz terpadu, dan otomatisasi notifikasi WhatsApp.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <button
              onClick={onOpenGPSModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-4 h-4" /> Ceklok Kehadiran GPS
            </button>
            <button
              onClick={onOpenRFIDModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4" /> Simulator RFID Gerbang
            </button>
            <button
              onClick={onOpenDispensasiModal}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4" /> Form Dispensasi Santri
            </button>
            <button
              onClick={() => setActiveModule('spreadsheet')}
              className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg border border-emerald-400/40 flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" /> Spreadsheet &amp; Apps Script
            </button>
            <button
              onClick={() => downloadCompleteZIPPackage()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Unduh Paket Lengkap Berkas ZIP"
            >
              <Download className="w-4 h-4" /> Download ZIP
            </button>
          </div>
        </div>

        {/* Ambient subtle illustration */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Total Santri Terdaftar</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalSiswa * 28}
            </span>
            <span className="text-xs text-slate-500">santri ({classes.length} kelas)</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{totalSiswa * 28 - siswaDispensasi} aktif di kampus hari ini</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Kehadiran Dewan Guru</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              98.2%
            </span>
            <span className="text-xs text-emerald-700 font-medium">Tepat Waktu</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>{guruHadirHariIni} guru telah ceklok GPS valid</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Jurnal KBM Terisi Hari Ini</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {jurnalTuntasHariIni}
            </span>
            <span className="text-xs text-slate-500">sesi pembelajaran</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sinkron dengan Time Map KBM</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Setoran Tahfiz Pekan Ini</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {setoranTahfizCount * 14}
            </span>
            <span className="text-xs text-slate-500">santri tasm'i</span>
          </div>
          <div className="mt-2 text-xs text-purple-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>89% predikat Mutqin &amp; Jayyid Jiddan</span>
          </div>
        </div>
      </div>

      {/* Main Section: Real-Time KBM Widget & Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Time Map Teaser Widget */}
        <div className="lg:col-span-2 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-sm font-bold text-slate-900">
                Monitor Time Map KBM (Jam Pelajaran ke-1 Sedang Berjalan)
              </h3>
            </div>
            <button
              onClick={() => setActiveModule('timemap')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Monitor Penuh &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classes.slice(0, 4).map((c, i) => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{c.nama}</span>
                  <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100 px-1.5 py-0.5 rounded">
                    07:15 - 08:00
                  </span>
                </div>
                <p className="text-indigo-900 font-semibold truncate">
                  {i === 0 ? 'Tahfiz & Murajaah Akbar' : i === 1 ? 'Fisika Eksperimental' : i === 2 ? 'Biologi Sel & Genetika' : 'Bahasa Arab Fusha'}
                </p>
                <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/60">
                  <span>Ruang: {c.ruang.split(' ')[0]}</span>
                  <span className="text-emerald-600 font-medium">Guru Hadir</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Info bar */}
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center justify-between">
            <span>
              Sistem otomatis mengunci absensi dan jurnal apabila melewati batas jam KBM.
            </span>
            <button
              onClick={() => {
                setActiveModule('kurikulum');
                setActiveKurikulumTab('kalender_kbm');
              }}
              className="font-bold underline text-[11px] whitespace-nowrap ml-2"
            >
              Lihat Kalender KBM
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activities & WhatsApp Dispatch */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Log Aktivitas Terkini</h3>
            <span className="text-[11px] text-slate-400 font-mono">Live Sync</span>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto text-xs">
            {/* Log item 1 */}
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Ceklok GPS Guru</span>
                <span className="font-mono text-slate-400 text-[10px]">06:48 WIB</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Siti Rahmawati, M.Pd hadir tepat waktu (Jarak: 18m dari pusat madrasah).
              </p>
            </div>

            {/* Log item 2 */}
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Presensi RFID Gerbang</span>
                <span className="font-mono text-slate-400 text-[10px]">06:34 WIB</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                M. Al-Fatih Pratama (X-1) terdata masuk. Notifikasi WA terkirim ke wali santri.
              </p>
            </div>

            {/* Log item 3 */}
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Dispensasi Disetujui</span>
                <span className="font-mono text-slate-400 text-[10px]">Kemarin</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Salma Nabila &amp; Fathurrahman didelegasikan ke OSM Nasional 2026.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setActiveModule('kurikulum');
                setActiveKurikulumTab('jurnal');
              }}
              className="w-full py-2 text-xs font-semibold text-center text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Buka Semua Rekap Jurnal &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
