/**
 * Modul Humas & Sarana Prasarana (Sarpras)
 * Buku Tamu Digital, Surat Masuk/Keluar, Inventarisasi Barang, & Pengadaan ATK
 */

import React, { useState } from 'react';
import { useMadani, HumasSarprasTab } from '../../../context/MadaniContext';
import { Building2, UserPlus, FileText, QrCode, Plus, CheckCircle2 } from 'lucide-react';

export const HumasSarprasModule: React.FC = () => {
  const {
    activeHumasSarprasTab,
    setActiveHumasSarprasTab,
    bukuTamuList,
    inventarisList
  } = useMadani();

  return (
    <div className="space-y-6">
      {/* Subtab Segmented Nav */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveHumasSarprasTab('buku_tamu')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeHumasSarprasTab === 'buku_tamu' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Buku Tamu Digital
        </button>
        <button
          onClick={() => setActiveHumasSarprasTab('inventaris')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeHumasSarprasTab === 'inventaris' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Inventaris Sarpras
        </button>
        <button
          onClick={() => setActiveHumasSarprasTab('surat')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeHumasSarprasTab === 'surat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Surat Masuk &amp; Keluar
        </button>
        <button
          onClick={() => setActiveHumasSarprasTab('atk')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeHumasSarprasTab === 'atk' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Permintaan ATK
        </button>
      </div>

      {/* TAB 1: BUKU TAMU */}
      {activeHumasSarprasTab === 'buku_tamu' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Buku Tamu Digital &amp; Pelayanan Publik Terpadu</h3>
              <p className="text-xs text-slate-500">Pencatatan instansi, maksud kedatangan, verifikasi identitas, dan survei kepuasan</p>
            </div>
            <button
              onClick={() => alert('Form registrasi tamu lobi dibuka.')}
              className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" /> Registrasi Tamu Baru
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-3">Tanggal &amp; Waktu</th>
                  <th className="px-4 py-3">Nama Tamu</th>
                  <th className="px-4 py-3">Instansi / Asal</th>
                  <th className="px-4 py-3">Tujuan Bertemu</th>
                  <th className="px-4 py-3">Keperluan</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bukuTamuList.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-slate-500">{t.tanggal} {t.jam} WIB</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{t.nama}</td>
                    <td className="px-4 py-3 text-slate-700">{t.instansi}</td>
                    <td className="px-4 py-3 text-indigo-700 font-medium">{t.tujuanBertemu}</td>
                    <td className="px-4 py-3 text-slate-600">{t.keperluan}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTARIS SARPRAS */}
      {activeHumasSarprasTab === 'inventaris' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Inventaris Sarana &amp; Prasarana Madrasah</h3>
              <p className="text-xs text-slate-500">Pencatatan aset ruangan, kondisi barang, dan pelabelan kode QR</p>
            </div>
            <button
              onClick={() => alert('Form input aset inventaris baru dibuka.')}
              className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Barang Aset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {inventarisList.map(item => (
              <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.kodeBarang}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                    Kondisi: {item.kondisi}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.namaBarang}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.lokasiRuang}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Jumlah: <strong>{item.jumlah} {item.satuan}</strong></span>
                  <span className="font-mono text-[11px] text-slate-400">Tahun {item.tahunPerolehan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3 & 4: SURAT & ATK */}
      {(activeHumasSarprasTab === 'surat' || activeHumasSarprasTab === 'atk') && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">
            {activeHumasSarprasTab === 'surat' ? 'Agenda Surat Masuk & Keluar Digital' : 'Workflow Pengajuan & Pengadaan ATK'}
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Modul terintegrasi dengan disposisi online Kepala Madrasah dan persetujuan bendahara madrasah. Seluruh dokumen surat tersimpan dengan penomoran otomatis Kemenag.
          </p>
        </div>
      )}
    </div>
  );
};
