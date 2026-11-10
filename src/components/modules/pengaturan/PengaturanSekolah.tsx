/**
 * Modul Pengaturan Sistem, Identitas Sekolah, RBAC, Langganan SaaS, & Backup/Restore
 */

import React, { useState } from 'react';
import { useMadani, PengaturanTab } from '../../../context/MadaniContext';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  Database,
  Building2,
  FileCheck2,
  Download,
  Upload,
  RefreshCw,
  Printer,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const PengaturanSekolah: React.FC = () => {
  const {
    activePengaturanTab,
    setActivePengaturanTab,
    schoolProfile,
    updateSchoolProfile,
    users,
    exportDatabaseJSON,
    importDatabaseJSON,
    resetToDefaultData
  } = useMadani();

  const [namaSekolah, setNamaSekolah] = useState(schoolProfile.namaSekolah);
  const [kepalaSekolah, setKepalaSekolah] = useState(schoolProfile.kepalaSekolah);
  const [nipKepala, setNipKepala] = useState(schoolProfile.nipKepala);
  const [alamat, setAlamat] = useState(schoolProfile.alamat);
  const [telepon, setTelepon] = useState(schoolProfile.telepon);
  const [radiusMeters, setRadiusMeters] = useState(schoolProfile.geofence.radiusMeters);
  const [importJsonText, setImportJsonText] = useState('');

  // Selected SaaS Invoice for PDF preview
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile({
      namaSekolah,
      kepalaSekolah,
      nipKepala,
      alamat,
      telepon,
      geofence: {
        ...schoolProfile.geofence,
        radiusMeters
      }
    });
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importDatabaseJSON(importJsonText);
    if (success) setImportJsonText('');
  };

  return (
    <div className="space-y-6">
      {/* Subtab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActivePengaturanTab('sekolah')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activePengaturanTab === 'sekolah' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Identitas &amp; Kop Surat
        </button>
        <button
          onClick={() => setActivePengaturanTab('rbac')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activePengaturanTab === 'rbac' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Manajemen Hak Akses (RBAC)
        </button>
        <button
          onClick={() => setActivePengaturanTab('langganan_saas')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activePengaturanTab === 'langganan_saas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Langganan SaaS &amp; Tagihan
        </button>
        <button
          onClick={() => setActivePengaturanTab('backup_restore')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activePengaturanTab === 'backup_restore' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cadangkan / Pulihkan (JSON)
        </button>
      </div>

      {/* TAB 1: IDENTITAS SEKOLAH */}
      {activePengaturanTab === 'sekolah' && (
        <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Identitas Madrasah &amp; Tanda Tangan Digital Kepala</h3>
              <p className="text-xs text-slate-500">Kop surat resmi ini digunakan secara otomatis pada dokumen Jadwal A4 dan Raport</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-xs"
            >
              Simpan Identitas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Resmi Madrasah</label>
              <input
                type="text"
                value={namaSekolah}
                onChange={(e) => setNamaSekolah(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon &amp; Kontak</label>
              <input
                type="text"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Madrasah (Beserta Gelar)</label>
              <input
                type="text"
                value={kepalaSekolah}
                onChange={(e) => setKepalaSekolah(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Madrasah</label>
              <input
                type="text"
                value={nipKepala}
                onChange={(e) => setNipKepala(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap Kampus Madrasah</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
            />
          </div>

          {/* Geofence Settings */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Pengaturan Geofencing Radius Presensi GPS</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-500 block text-[11px]">Latitude Pusat Kampus</span>
                <input
                  type="text"
                  readOnly
                  value={schoolProfile.geofence.latitude}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md font-mono"
                />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Longitude Pusat Kampus</span>
                <input
                  type="text"
                  readOnly
                  value={schoolProfile.geofence.longitude}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md font-mono"
                />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Radius Toleransi Ceklok (Meter)</span>
                <input
                  type="number"
                  value={radiusMeters}
                  onChange={(e) => setRadiusMeters(parseInt(e.target.value) || 100)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-md font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Digital Signature Preview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Tanda Tangan Digital Kepala Madrasah Terverifikasi</span>
              <p className="text-slate-500 text-[11px]">Diterapkan secara otomatis pada lembar supervisi, jadwal resmi, dan raport</p>
            </div>
            <img
              src={schoolProfile.ttdDigitalUrl}
              alt="TTD Kepala"
              className="h-12 w-auto bg-white p-1 rounded-md border border-slate-200"
            />
          </div>
        </form>
      )}

      {/* TAB 2: RBAC MATRIX */}
      {activePengaturanTab === 'rbac' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Matriks Hak Akses Pengguna (Role-Based Access Control)</h3>
              <p className="text-xs text-slate-500">Pemberian wewenang navigasi dan otoritas approval per divisi</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">Peran / Role</th>
                  <th className="px-3 py-2.5">Dashboard &amp; KBM</th>
                  <th className="px-3 py-2.5">Jurnal &amp; Ceklok</th>
                  <th className="px-3 py-2.5">Dispensasi Approval</th>
                  <th className="px-3 py-2.5">Supervisi</th>
                  <th className="px-3 py-2.5">Tahfiz &amp; Asrama</th>
                  <th className="px-3 py-2.5">Security Gate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-bold text-indigo-900">Super Admin (IT)</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-bold text-slate-800">Waka Kurikulum</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Pintu 1</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                  <td className="px-3 py-2.5 text-slate-400">Lihat</td>
                  <td className="px-3 py-2.5 text-slate-400">Lihat</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-bold text-slate-800">Waka Kesiswaan</td>
                  <td className="px-3 py-2.5 text-slate-600">Lihat</td>
                  <td className="px-3 py-2.5 text-slate-400">-</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Pintu 2 (Final)</td>
                  <td className="px-3 py-2.5 text-slate-400">-</td>
                  <td className="px-3 py-2.5 text-slate-600">Disiplin</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Penuh</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-bold text-slate-800">Guru Mapel</td>
                  <td className="px-3 py-2.5 text-slate-600">Lihat</td>
                  <td className="px-3 py-2.5 text-emerald-700 font-semibold">Input Mandiri</td>
                  <td className="px-3 py-2.5 text-slate-400">-</td>
                  <td className="px-3 py-2.5 text-slate-600">Lihat Nilai</td>
                  <td className="px-3 py-2.5 text-slate-400">-</td>
                  <td className="px-3 py-2.5 text-slate-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LANGGANAN SAAS */}
      {activePengaturanTab === 'langganan_saas' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Status Langganan SaaS Madani Enterprise</h3>
                <p className="text-xs text-slate-500">Masa aktif lisensi, kuota server cloud, dan riwayat faktur tagihan</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                PAKET AKTIF: PRO PESANTREN UNGGULAN
              </span>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="font-bold text-slate-900 block text-sm">Paket Starter</span>
                <p className="text-slate-500">Untuk madrasah reguler skala kecil (s.d. 300 siswa)</p>
                <div className="text-lg font-mono font-extrabold text-slate-900">Rp 450.000 <span className="text-xs text-slate-500 font-normal">/bulan</span></div>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Manajemen Jadwal &amp; Siswa</li>
                  <li>Ceklok GPS Guru (Dasar)</li>
                  <li>Buku Tamu Digital</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border-2 border-indigo-600 bg-indigo-50/40 space-y-3 relative">
                <span className="absolute -top-2.5 right-4 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  PAKET MADANI ANDA
                </span>
                <span className="font-bold text-indigo-950 block text-sm">Pro Pesantren</span>
                <p className="text-slate-600">Untuk Madrasah Boarding &amp; Terpadu (s.d. 1.200 siswa)</p>
                <div className="text-lg font-mono font-extrabold text-indigo-900">Rp 1.250.000 <span className="text-xs text-slate-500 font-normal">/bulan</span></div>
                <ul className="space-y-1 text-slate-700 list-disc pl-4 font-medium">
                  <li>Seluruh Fitur Starter</li>
                  <li>Time Map KBM Monitor Real-Time</li>
                  <li>Supervisi Akademik &amp; Nilai KKM</li>
                  <li>Modul Tahfiz &amp; Halaqah Santri</li>
                  <li>WhatsApp Gateway Fonnte Otomatis</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="font-bold text-slate-900 block text-sm">Enterprise Multi-Kampus</span>
                <p className="text-slate-500">Yayasan dengan beberapa cabang madrasah &amp; asrama</p>
                <div className="text-lg font-mono font-extrabold text-slate-900">Rp 2.800.000 <span className="text-xs text-slate-500 font-normal">/bulan</span></div>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Multi-Institusi &amp; SSO</li>
                  <li>Dedicated Cloud Hosting</li>
                  <li>Custom Domain &amp; Whitelabel</li>
                  <li>SLA Dukungan 24/7</li>
                </ul>
              </div>
            </div>

            {/* Invoice button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Pratinjau Invoice Resmi PDF
              </button>
            </div>
          </div>

          {/* Invoice Modal Preview */}
          {showInvoiceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="bg-white p-8 rounded-2xl max-w-xl w-full border border-slate-200 space-y-6 text-xs text-slate-900 shadow-2xl">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-extrabold text-base text-indigo-900">FAKTUR TAGIHAN RESMI (INVOICE)</h3>
                    <p className="font-mono text-slate-500 text-[11px]">INV/MADANI-SAAS/2026/11/0091</p>
                  </div>
                  <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-800">
                    Tutup
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Diterbitkan Untuk:</span>
                    <p className="font-bold">{schoolProfile.namaSekolah}</p>
                    <p className="text-slate-500 text-[11px]">{schoolProfile.alamat}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Status Pembayaran:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      LUNAS (PAID)
                    </span>
                    <p className="text-slate-500 text-[11px] mt-1 font-mono">Batas: 2026-12-09</p>
                  </div>
                </div>

                <table className="w-full border border-slate-200 text-left border-collapse">
                  <thead className="bg-slate-50 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2">Item Layanan</th>
                      <th className="p-2 text-right">Durasi</th>
                      <th className="p-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-2">Lisensi SaaS Madani Pro Pesantren (All Modules)</td>
                      <td className="p-2 text-right font-mono">1 Bulan</td>
                      <td className="p-2 text-right font-mono font-bold">Rp 1.250.000</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-2">Add-on WhatsApp Gateway Fonnte (10.000 Quota)</td>
                      <td className="p-2 text-right font-mono">1 Bulan</td>
                      <td className="p-2 text-right font-mono font-bold">Rp 150.000</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold">
                    <tr>
                      <td colSpan={2} className="p-2 text-right">Total Tagihan:</td>
                      <td className="p-2 text-right font-mono text-sm text-indigo-900">Rp 1.400.000</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      alert('Invoice PDF siap diunduh.');
                      setShowInvoiceModal(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
                  >
                    Download Invoice PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: BACKUP & RESTORE */}
      {activePengaturanTab === 'backup_restore' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cadangkan &amp; Pulihkan Database Madrasah (JSON Dump)</h3>
              <p className="text-xs text-slate-500">Simpan seluruh rekam data santri, presensi, jadwal, dan jurnal secara offline</p>
            </div>
            <button
              onClick={exportDatabaseJSON}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Export Backup Database (JSON)
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 block">Restore dari Berkas JSON:</span>
            <textarea
              rows={4}
              placeholder="Tempelkan isi JSON cadangan di sini..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
            />
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" /> Pulihkan Data dari JSON
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-rose-700 block">Reset ke Kondisi Bibit Awal</span>
              <p className="text-slate-500 text-[11px]">Hapus modifikasi lokal dan kembalikan ke data awal madrasah</p>
            </div>
            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset seluruh database ke bibit awal?')) {
                  resetToDefaultData();
                }
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 text-rose-700 font-semibold rounded-lg border border-slate-200 hover:border-rose-200 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Database
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
