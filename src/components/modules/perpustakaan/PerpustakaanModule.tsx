/**
 * Modul Perpustakaan Digital & Sirkulasi Otomatis
 * Katalog Buku, Eksemplar, Rak, Sirkulasi RFID/Barcode, & Perhitungan Denda
 */

import React, { useState } from 'react';
import { useMadani } from '../../../context/MadaniContext';
import { Library, BookOpen, Search, CheckCircle2, Clock, Plus, QrCode } from 'lucide-react';

export const PerpustakaanModule: React.FC = () => {
  const { bukuList, peminjamanList } = useMadani();
  const [activeTab, setActiveTab] = useState<'katalog' | 'sirkulasi'>('katalog');
  const [searchBuku, setSearchBuku] = useState('');

  const filteredBuku = bukuList.filter(b =>
    b.judul.toLowerCase().includes(searchBuku.toLowerCase()) ||
    b.pengarang.toLowerCase().includes(searchBuku.toLowerCase()) ||
    b.kategori.toLowerCase().includes(searchBuku.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveTab('katalog')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'katalog' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Katalog Buku &amp; Eksemplar
        </button>
        <button
          onClick={() => setActiveTab('sirkulasi')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'sirkulasi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sirkulasi Peminjaman &amp; Denda
        </button>
      </div>

      {activeTab === 'katalog' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul buku, pengarang, kitab..."
                value={searchBuku}
                onChange={(e) => setSearchBuku(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <button
              onClick={() => alert('Form input buku baru dibuka.')}
              className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Koleksi Buku
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredBuku.map(buku => (
              <div key={buku.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {buku.kategori}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{buku.lokasiRak}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-2">{buku.judul}</h4>
                  <p className="text-xs text-slate-600 mt-1">{buku.pengarang}</p>
                  <p className="text-[11px] text-slate-400 font-mono">ISBN: {buku.isbn}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    Tersedia: <strong className="text-emerald-700">{buku.tersedia}</strong> / {buku.totalEksemplar}
                  </span>
                  <button
                    onClick={() => alert(`Barcode buku "${buku.judul}" siap dicetak.`)}
                    className="p-1 text-slate-500 hover:text-slate-900"
                    title="Cetak Barcode Buku"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sirkulasi' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">Catatan Peminjaman Aktif Santri</h4>
            <span className="text-xs text-slate-500">Maksimal peminjaman: 7 hari kerja</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="px-4 py-3">Kode Pinjam</th>
                <th className="px-4 py-3">Nama Santri &amp; Kelas</th>
                <th className="px-4 py-3">Judul Buku</th>
                <th className="px-4 py-3">Tanggal Pinjam</th>
                <th className="px-4 py-3">Tenggat Kembali</th>
                <th className="px-4 py-3">Denda</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {peminjamanList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-mono text-indigo-700 font-bold">{item.kodePinjam}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900 block">{item.namaSiswa}</span>
                    <span className="text-[11px] text-slate-500">{item.kelas}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-800 font-medium max-w-xs truncate">{item.judulBuku}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{item.tanggalPinjam}</td>
                  <td className="px-4 py-3 font-mono text-slate-800 font-bold">{item.tenggatKembali}</td>
                  <td className="px-4 py-3 font-mono text-emerald-700">Rp {item.denda}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
