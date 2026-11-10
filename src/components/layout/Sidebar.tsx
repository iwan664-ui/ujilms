/**
 * MADANI Dynamic Collapsible Sidebar
 * Grouped navigation per institutional division with icons and badge indicators
 */

import React from 'react';
import { useMadani, ActiveModule, KurikulumTab, KesiswaanTab, AsramaTab, HumasSarprasTab, PengaturanTab } from '../../context/MadaniContext';
import {
  LayoutDashboard,
  Clock,
  GraduationCap,
  Users2,
  Moon,
  Library,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileCheck2,
  Calendar,
  MessageSquare,
  QrCode,
  AlertTriangle,
  BookMarked,
  ShieldAlert,
  Database,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    activeKurikulumTab,
    setActiveKurikulumTab,
    activeKesiswaanTab,
    setActiveKesiswaanTab,
    activeAsramaTab,
    setActiveAsramaTab,
    activePengaturanTab,
    setActivePengaturanTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    dispensasiList,
    pelanggaranList,
    izinAsramaList,
    downloadCompleteZIPPackage
  } = useMadani();

  const pendingDispensasi = dispensasiList.filter(d => d.statusKurikulum === 'Menunggu' || d.statusKesiswaan === 'Menunggu').length;
  const pendingIzinAsrama = izinAsramaList.filter(i => i.statusPembina === 'Menunggu' || i.statusKeamanan === 'Menunggu di Pos').length;

  return (
    <aside
      className={`relative flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-200 select-none shrink-0 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header / School Identity */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
        {!isSidebarCollapsed && (
          <div className="min-w-0">
            <span className="text-xs font-bold text-white uppercase tracking-wider block truncate">
              MAS AL-MADANI
            </span>
            <span className="text-[11px] text-emerald-400 block truncate">
              Islamic Boarding School
            </span>
          </div>
        )}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 mx-auto transition-colors"
          title={isSidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Core & Dashboard */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Core &amp; Monitor
            </span>
          )}

          <button
            onClick={() => setActiveModule('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Dashboard Utama</span>}
          </button>

          <button
            onClick={() => setActiveModule('timemap')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'timemap'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 shrink-0 text-emerald-400" />
              {!isSidebarCollapsed && <span>Time Map KBM</span>}
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                LIVE
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveModule('spreadsheet')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'spreadsheet'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-4 h-4 shrink-0 text-emerald-400" />
              {!isSidebarCollapsed && <span>Spreadsheet &amp; GAS</span>}
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                AUTO
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveModule('blueprint')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'blueprint'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0 text-amber-400" />
            {!isSidebarCollapsed && <span>Blueprint Arsitektur</span>}
          </button>
        </div>

        {/* Divisi Kurikulum */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Kurikulum &amp; KBM
            </span>
          )}

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('jadwal');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'jadwal'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Jadwal &amp; Cetak A4</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('jurnal');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'jurnal'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Jurnal Mengajar</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('ceklok_guru');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'ceklok_guru'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Ceklok GPS Guru</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('supervisi');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'supervisi'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookMarked className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Supervisi Akademik</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('kalender_kbm');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'kalender_kbm'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Kalender KBM</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kurikulum');
              setActiveKurikulumTab('wa_gateway');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kurikulum' && activeKurikulumTab === 'wa_gateway'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
            {!isSidebarCollapsed && <span>WhatsApp Gateway</span>}
          </button>
        </div>

        {/* Divisi Kesiswaan */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Kesiswaan &amp; Disiplin
            </span>
          )}

          <button
            onClick={() => {
              setActiveModule('kesiswaan');
              setActiveKesiswaanTab('rfid_scan');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kesiswaan' && activeKesiswaanTab === 'rfid_scan'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4 shrink-0 text-indigo-400" />
            {!isSidebarCollapsed && <span>Presensi RFID/NIS</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('kesiswaan');
              setActiveKesiswaanTab('dispensasi');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kesiswaan' && activeKesiswaanTab === 'dispensasi'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users2 className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Dispensasi Siswa</span>}
            </div>
            {!isSidebarCollapsed && pendingDispensasi > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full">
                {pendingDispensasi}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveModule('kesiswaan');
              setActiveKesiswaanTab('pelanggaran_poin');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'kesiswaan' && activeKesiswaanTab === 'pelanggaran_poin'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            {!isSidebarCollapsed && <span>Poin Disiplin &amp; SP</span>}
          </button>
        </div>

        {/* Keasramaan & Tahfiz */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Asrama &amp; Tahfiz
            </span>
          )}

          <button
            onClick={() => {
              setActiveModule('asrama_tahfiz');
              setActiveAsramaTab('progres_tahfiz');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'asrama_tahfiz' && activeAsramaTab === 'progres_tahfiz'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Moon className="w-4 h-4 shrink-0 text-emerald-400" />
            {!isSidebarCollapsed && <span>Halaqah &amp; Tahfiz</span>}
          </button>

          <button
            onClick={() => {
              setActiveModule('asrama_tahfiz');
              setActiveAsramaTab('izin_keluar');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'asrama_tahfiz' && activeAsramaTab === 'izin_keluar'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Izin Keluar Asrama</span>}
            </div>
            {!isSidebarCollapsed && pendingIzinAsrama > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-bold rounded-full">
                {pendingIzinAsrama}
              </span>
            )}
          </button>
        </div>

        {/* Perpustakaan & Sarpras */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Fasilitas &amp; Humas
            </span>
          )}

          <button
            onClick={() => setActiveModule('perpustakaan')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'perpustakaan'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Library className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Perpustakaan</span>}
          </button>

          <button
            onClick={() => setActiveModule('humas_sarpras')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'humas_sarpras'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Sarpras &amp; Tamu Humas</span>}
          </button>
        </div>

        {/* Pengaturan */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Pengaturan Sistem
            </span>
          )}

          <button
            onClick={() => {
              setActiveModule('pengaturan');
              setActivePengaturanTab('sekolah');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeModule === 'pengaturan'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Identitas &amp; SaaS</span>}
          </button>
        </div>
      </div>

      {/* Footer Info & Quick ZIP Download */}
      {!isSidebarCollapsed && (
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => downloadCompleteZIPPackage()}
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
            title="Download Paket Lengkap Apps Script & Spreadsheet (ZIP)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ZIP Bundle</span>
          </button>
          <div className="text-[10px] text-slate-500 text-center">
            <p className="font-semibold text-slate-400">MADANI v2.4 SaaS</p>
            <p>Google Sheets &amp; GAS Connected</p>
          </div>
        </div>
      )}
    </aside>
  );
};
