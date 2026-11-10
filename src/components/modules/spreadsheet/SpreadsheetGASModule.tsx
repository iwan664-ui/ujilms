/**
 * MADANI Google Spreadsheet & Apps Script Integration Module
 * Real-time 2-way Webhook synchronization, Code.gs generator, and Client-Side ZIP Packaging
 */

import React, { useState } from 'react';
import { useMadani } from '../../../context/MadaniContext';
import { getGoogleAppsScriptCode } from '../../../utils/gasGenerator';
import {
  FileSpreadsheet,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Code,
  Layers,
  Settings,
  ShieldCheck,
  Table,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react';

export const SpreadsheetGASModule: React.FC = () => {
  const {
    schoolProfile,
    updateSpreadsheetConfig,
    triggerGASSync,
    downloadCompleteZIPPackage,
    gasSyncLogs,
    presensiGuru,
    rfidLogs,
    jurnalMengajar,
    progresTahfizList,
    dispensasiList,
    students,
    showToast
  } = useMadani();

  const config = schoolProfile.spreadsheetConfig || {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbwMADANI_v2_EnterpriseEdTech_GAS_Integration/exec',
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    spreadsheetName: 'DATABASE_RESMI_MADANI_TA_2026_2027',
    autoSync: true,
    lastSyncTimestamp: '2026-11-09 08:30 WIB',
    lastSyncStatus: 'Terkoneksi & Sinkron',
    totalSyncedRows: 142
  };

  const [webAppUrlInput, setWebAppUrlInput] = useState(config.webAppUrl);
  const [spreadsheetIdInput, setSpreadsheetIdInput] = useState(config.spreadsheetId);
  const [spreadsheetNameInput, setSpreadsheetNameInput] = useState(config.spreadsheetName);
  const [autoSyncInput, setAutoSyncInput] = useState(config.autoSync);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'code' | 'logs'>('overview');

  const gasCode = getGoogleAppsScriptCode(schoolProfile.namaSekolah);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSpreadsheetConfig({
      webAppUrl: webAppUrlInput,
      spreadsheetId: spreadsheetIdInput,
      spreadsheetName: spreadsheetNameInput,
      autoSync: autoSyncInput
    });
  };

  const handleManualSyncAll = async () => {
    setIsSyncing(true);
    await triggerGASSync('Semua Tab (Bulk Sync)');
    setIsSyncing(false);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    await downloadCompleteZIPPackage();
    setIsZipping(false);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gasCode);
      showToast({
        type: 'success',
        title: 'Kode Disalin',
        message: 'Seluruh skrip Code.gs telah disalin ke clipboard Anda.'
      });
    }
  };

  const sheetsSummary = [
    { name: 'Presensi_Guru', label: 'Ceklok Kehadiran GPS Guru', count: presensiGuru.length, desc: 'Jam masuk, NIP, koordinat, foto, jarak geofence' },
    { name: 'Presensi_RFID', label: 'Log Scanner Gerbang Santri', count: rfidLogs.length, desc: 'Jam tiba/pulang, NIS, kelas, terminal gate' },
    { name: 'Jurnal_KBM', label: 'Jurnal KBM & Absensi Kelas', count: jurnalMengajar.length, desc: 'Materi pokok, capaian KBM, hadir/sakit/izin/alpha' },
    { name: 'Tahfiz_Santri', label: 'Setoran Tahfiz Al-Qur\'an', count: progresTahfizList.length, desc: 'Surah, ayat, mutu Mutqin/Jayyid, catatan musyrif' },
    { name: 'Dispensasi', label: 'Surat Dispensasi Santri', count: dispensasiList.length, desc: 'Delegasi lomba OSM, surat undangan, status 2 pintu' },
    { name: 'Data_Siswa', label: 'Master Data Santri & Ortu', count: students.length, desc: 'NIS, NISN, kamar asrama, poin disiplin, no WA ortu' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick ZIP Action */}
      <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-emerald-500/20 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              GOOGLE SPREADSHEET &amp; APPS SCRIPT INTEGRATION
            </span>
            <span className="text-xs text-slate-400">Otomatisasi 2-Arah Tanpa Server Pihak Ketiga</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Sinkronisasi Database MADANI ke Google Spreadsheet
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Setiap ada presensi GPS guru, scan RFID gerbang santri, input jurnal KBM, dispensasi, maupun setoran tahfiz, data akan <strong>secara otomatis dicatat</strong> ke lembar Google Sheets Anda melalui webhook Google Apps Script.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-98"
            >
              <Download className={`w-4 h-4 ${isZipping ? 'animate-bounce' : ''}`} />
              <span>{isZipping ? 'Mengemas Berkas ZIP...' : 'Download Paket Lengkap (.ZIP)'}</span>
            </button>

            <button
              onClick={handleManualSyncAll}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Semua Data Sekarang'}</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Subtab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Konfigurasi &amp; Status Spreadsheet
        </button>
        <button
          onClick={() => setActiveSubTab('code')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'code' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Salin Kode Apps Script (Code.gs)
        </button>
        <button
          onClick={() => setActiveSubTab('logs')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeSubTab === 'logs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Log Riwayat Sinkronisasi Real-Time
        </button>
      </div>

      {/* TAB 1: OVERVIEW & CONFIGURATION */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Status & KPI Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 block">Status Koneksi Web App</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-extrabold text-slate-900">{config.lastSyncStatus}</span>
              </div>
              <span className="text-[11px] text-emerald-700 block mt-1 font-mono">
                {config.autoSync ? 'Auto-Sync: AKTIF' : 'Auto-Sync: NONAKTIF'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 block">Waktu Sinkronisasi Terakhir</span>
              <span className="text-sm font-bold text-slate-900 font-mono block tabular-nums">
                {config.lastSyncTimestamp || 'Baru Saja'}
              </span>
              <span className="text-[11px] text-slate-400 block">Sinkronisasi otomatis periodik</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 block">Akumulasi Baris Tersinkron</span>
              <span className="text-xl font-extrabold text-indigo-900 font-mono tabular-nums">
                {config.totalSyncedRows || 142}
              </span>
              <span className="text-[11px] text-slate-500 block">Tercatat di Google Sheets</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 block">Ekspor Cadangan Lengkap</span>
              <button
                onClick={handleDownloadZip}
                className="mt-1 w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download ZIP
              </button>
              <span className="text-[10px] text-slate-400 block text-center mt-0.5">Code.gs + CSV + JSON</span>
            </div>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveConfig} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Parameter Koneksi Webhook Google Apps Script</h3>
                  <p className="text-xs text-slate-500">Masukkan URL Web App hasil deployment dari Google Apps Script editor Anda</p>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-xs"
              >
                Simpan Parameter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Google Apps Script Web App URL (Endpoint)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={webAppUrlInput}
                  onChange={(e) => setWebAppUrlInput(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  Pastikan deployment disetel: "Execute as: Me" dan "Who has access: Anyone".
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Google Spreadsheet ID (Dari URL browser Anda)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  value={spreadsheetIdInput}
                  onChange={(e) => setSpreadsheetIdInput(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  ID terletak di antara /d/ dan /edit pada URL Google Spreadsheet Anda.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Buku Spreadsheet</label>
                <input
                  type="text"
                  value={spreadsheetNameInput}
                  onChange={(e) => setSpreadsheetNameInput(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={autoSyncInput}
                    onChange={(e) => setAutoSyncInput(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-emerald-950 block">Sinkronisasi Otomatis Aktif (Auto-Sync)</span>
                    <span className="text-[11px] text-emerald-800">
                      Otomatis kirim data ke Google Sheets setiap ada presensi, jurnal, atau setoran baru
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Sheets Mapping Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pemetaan Tab Lembar Kerja (Sheets Mapping)</h4>
                <p className="text-xs text-slate-500">Masing-masing entitas MADANI dicatat ke tab terpisah secara terstruktur</p>
              </div>
              <button
                onClick={handleManualSyncAll}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Sinkronkan Semua
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-3">Nama Tab di Google Sheets</th>
                  <th className="px-4 py-3">Modul MADANI</th>
                  <th className="px-4 py-3">Jumlah Baris</th>
                  <th className="px-4 py-3">Kolom Terpetakan</th>
                  <th className="px-4 py-3">Status Sinkron</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sheetsSummary.map(sh => (
                  <tr key={sh.name} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {sh.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{sh.label}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 tabular-nums">{sh.count} baris</td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">{sh.desc}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Siap / Terhubung
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: APPS SCRIPT CODE VIEWER (CODE.GS) */}
      {activeSubTab === 'code' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Kode Google Apps Script Siap Pakai (Code.gs)</h3>
                <p className="text-xs text-slate-500">Salin dan tempelkan ke editor Apps Script spreadsheet Anda</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" /> Salin Seluruh Kode
                </button>
                <button
                  onClick={handleDownloadZip}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Berkas ZIP
                </button>
              </div>
            </div>

            {/* Quick 4 Steps Guide */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 space-y-2">
              <span className="font-bold block">4 Langkah Praktis Pemasangan di Google Spreadsheet:</span>
              <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                <li>Buka Google Spreadsheet baru di <strong>https://sheets.new</strong></li>
                <li>Klik menu <strong>Ekstensi (Extensions)</strong> &rarr; <strong>Apps Script</strong></li>
                <li>Hapus kode bawaan, lalu tempelkan kode di bawah ini. Pilih fungsi <code>setupMadaniSheets</code> lalu klik <strong>Jalankan (Run)</strong> untuk membuat tabel otomatis.</li>
                <li>Klik tombol biru <strong>Terapkan (Deploy)</strong> &rarr; <strong>Penerapan Baru (New Deployment)</strong> &rarr; Pilih jenis <strong>Aplikasi Web (Web App)</strong> &rarr; Akses: <strong>Siapa Saja (Anyone)</strong>. Salin URL hasilnya ke MADANI!</li>
              </ol>
            </div>

            {/* Syntax Box */}
            <div className="relative bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{gasCode}</pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME LOGS */}
      {activeSubTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Log Pengiriman Data ke Google Apps Script</h4>
              <p className="text-xs text-slate-500">Daftar transaksi pengiriman otomatis maupun manual ke spreadsheet</p>
            </div>
            <button
              onClick={handleManualSyncAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Uji Koneksi Ulang
            </button>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="px-4 py-3">Waktu Transaksi</th>
                <th className="px-4 py-3">Aksi</th>
                <th className="px-4 py-3">Tab Tujuan</th>
                <th className="px-4 py-3">Jumlah Baris</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Uraian Transaksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gasSyncLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-mono text-slate-500 tabular-nums">{log.timestamp} WIB</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      log.action === 'Auto-Sync'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{log.sheetTarget}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800 tabular-nums">{log.rowsCount}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px] max-w-sm truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
