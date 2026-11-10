/**
 * Modul Keasramaan & Tahfiz Terpadu
 * Progres Tahfiz (Mutqin/Jayyid), Halaqah, Ibadah Harian, Izin Keluar Asrama, Pos Keamanan, & Gadget
 */

import React, { useState } from 'react';
import { useMadani, AsramaTab } from '../../../context/MadaniContext';
import {
  Moon,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Clock,
  Smartphone,
  Shield,
  FileText,
  UserCheck,
  XCircle,
  Volume2
} from 'lucide-react';

export const AsramaTahfizModule: React.FC = () => {
  const {
    activeAsramaTab,
    setActiveAsramaTab,
    progresTahfizList,
    addProgresTahfiz,
    halaqahList,
    izinAsramaList,
    updateIzinAsramaStatus,
    students
  } = useMadani();

  // Setoran Tahfiz input modal state
  const [showTahfizForm, setShowTahfizForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [surah, setSurah] = useState('Surat Al-Mulk');
  const [ayatAwal, setAyatAwal] = useState(1);
  const [ayatAkhir, setAyatAkhir] = useState(30);
  const [kategoriTahfiz, setKategoriTahfiz] = useState<'Ziyadah (Baru)' | 'Murajaah (Lama)' | 'Ujian Juz'>('Murajaah (Lama)');
  const [kualitas, setKualitas] = useState<'Mutqin (A)' | 'Jayyid Jiddan (B+)' | 'Jayyid (B)' | 'Maqbul (C)'>('Mutqin (A)');
  const [tajwid, setTajwid] = useState<'Sangat Fasih' | 'Fasih' | 'Perlu Perbaikan'>('Sangat Fasih');
  const [catatanMusyrif, setCatatanMusyrif] = useState('');

  // Daily ibadah checklist simulation
  const [ibadahChecklist, setIbadahChecklist] = useState<Record<string, Record<string, boolean>>>({
    's-101': { subuh: true, dhuha: true, dzuhur: true, ashar: true, maghrib: true, isya: true, tahajud: true },
    's-102': { subuh: true, dhuha: true, dzuhur: true, ashar: true, maghrib: true, isya: true, tahajud: false },
    's-103': { subuh: true, dhuha: false, dzuhur: true, ashar: true, maghrib: true, isya: true, tahajud: false }
  });

  const toggleIbadah = (studentId: string, prayer: string) => {
    setIbadahChecklist(prev => {
      const studentP = prev[studentId] || { subuh: true, dhuha: false, dzuhur: true, ashar: true, maghrib: true, isya: true, tahajud: false };
      return {
        ...prev,
        [studentId]: {
          ...studentP,
          [prayer]: !studentP[prayer]
        }
      };
    });
  };

  const handleTahfizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    addProgresTahfiz({
      siswaId: st.id,
      siswaNama: st.nama,
      halaqahNama: 'Halaqah Utsman bin Affan (Juz 28-30)',
      surah,
      ayatAwal,
      ayatAkhir,
      kategori: kategoriTahfiz,
      kualitasHafalan: kualitas,
      kelancaranTajwid: tajwid,
      catatanMusyrif: catatanMusyrif || 'Setoran hafalan lancar sesuai tajwid terapan.'
    });

    setShowTahfizForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Subtab Segmented Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveAsramaTab('progres_tahfiz')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'progres_tahfiz' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Progres Tahfiz &amp; Setoran
        </button>
        <button
          onClick={() => setActiveAsramaTab('halaqah')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'halaqah' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kelola Halaqah
        </button>
        <button
          onClick={() => setActiveAsramaTab('ibadah_harian')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'ibadah_harian' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monitoring Ibadah Santri
        </button>
        <button
          onClick={() => setActiveAsramaTab('izin_keluar')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'izin_keluar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Izin Keluar Asrama
        </button>
        <button
          onClick={() => setActiveAsramaTab('pos_keamanan')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'pos_keamanan' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pos Keamanan &amp; Patroli
        </button>
        <button
          onClick={() => setActiveAsramaTab('gadget')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeAsramaTab === 'gadget' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Manajemen Gadget
        </button>
      </div>

      {/* TAB 1: PROGRES TAHFIZ */}
      {activeAsramaTab === 'progres_tahfiz' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Jurnal &amp; Capaian Tahfiz Al-Qur'an Santri</h3>
              <p className="text-xs text-slate-500">Kategori Ziyadah (Hafalan Baru) dan Murajaah dengan penilaian Mutqin</p>
            </div>
            <button
              onClick={() => setShowTahfizForm(!showTahfizForm)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> {showTahfizForm ? 'Tutup Form' : 'Input Setoran Baru'}
            </button>
          </div>

          {/* Input Setoran Form */}
          {showTahfizForm && (
            <form onSubmit={handleTahfizSubmit} className="bg-white p-6 rounded-xl border border-emerald-200 shadow-md space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Pencatatan Setoran Tahfiz Santri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Santri</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Surah Al-Qur'an</label>
                  <input
                    type="text"
                    value={surah}
                    onChange={(e) => setSurah(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rentang Ayat</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={ayatAwal}
                      onChange={(e) => setAyatAwal(parseInt(e.target.value) || 1)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                    <span>s/d</span>
                    <input
                      type="number"
                      value={ayatAkhir}
                      onChange={(e) => setAyatAkhir(parseInt(e.target.value) || 1)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Setoran</label>
                  <select
                    value={kategoriTahfiz}
                    onChange={(e) => setKategoriTahfiz(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Ziyadah (Baru)">Ziyadah (Hafalan Baru)</option>
                    <option value="Murajaah (Lama)">Murajaah (Pengulangan Hafalan)</option>
                    <option value="Ujian Juz">Ujian Juz / Tasm'i Bil Ghaib</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kualitas Hafalan</label>
                  <select
                    value={kualitas}
                    onChange={(e) => setKualitas(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Mutqin (A)">Mutqin (A - Sangat Kuat &amp; Tanpa Salah)</option>
                    <option value="Jayyid Jiddan (B+)">Jayyid Jiddan (B+ - Lancar 1-2 Salah Ringan)</option>
                    <option value="Jayyid (B)">Jayyid (B - Cukup Lancar)</option>
                    <option value="Maqbul (C)">Maqbul (C - Perlu Diulang)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Makharijul Huruf &amp; Tajwid</label>
                  <select
                    value={tajwid}
                    onChange={(e) => setTajwid(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Sangat Fasih">Sangat Fasih &amp; Tartil</option>
                    <option value="Fasih">Fasih</option>
                    <option value="Perlu Perbaikan">Perlu Perbaikan Dengung / Mad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Catatan Musyrif</label>
                <input
                  type="text"
                  placeholder="Contoh: Makhraj huruf ha' dan 'ain sangat fasih. Siap maju ke juz berikutnya."
                  value={catatanMusyrif}
                  onChange={(e) => setCatatanMusyrif(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowTahfizForm(false)} className="px-4 py-2 text-slate-600">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold">
                  Simpan Catatan Setoran
                </button>
              </div>
            </form>
          )}

          {/* List of Progres */}
          <div className="grid grid-cols-1 gap-3">
            {progresTahfizList.map(item => (
              <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.kategori}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.siswaNama}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span>{item.tanggal}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{item.surah}</span>
                    <span className="text-slate-600 ml-2 font-mono">Ayat {item.ayatAwal} - {item.ayatAkhir}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700">
                      {item.kualitasHafalan}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {item.kelancaranTajwid}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                  <strong>Catatan Ustadz:</strong> {item.catatanMusyrif}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HALAQAH */}
      {activeAsramaTab === 'halaqah' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Distribusi Kelompok Halaqah Tahfiz</h3>
            <p className="text-xs text-slate-500">Setiap halaqah dibimbing oleh Ustadz/Ustadzah Musyrif bersanad</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {halaqahList.map(h => (
              <div key={h.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">{h.namaHalaqah}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                    {h.waktu}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <p><strong>Musyrif:</strong> {h.musyrifNama}</p>
                  <p><strong>Lokasi:</strong> {h.lokasi}</p>
                  <p><strong>Target:</strong> {h.targetSemester}</p>
                  <p><strong>Jumlah Santri:</strong> {h.totalSantri} Santri</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MONITORING IBADAH HARIAN */}
      {activeAsramaTab === 'ibadah_harian' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Ceklis Sholat Berjamaah &amp; Amaliah Santri</h3>
            <p className="text-xs text-slate-500">Pantauan kepatuhan sholat fardhu berjamaah di masjid madrasah dan sholat malam</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
            <table className="w-full text-xs text-center">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-left">Nama Santri</th>
                  <th className="px-2 py-3">Subuh</th>
                  <th className="px-2 py-3">Dhuha</th>
                  <th className="px-2 py-3">Dzuhur</th>
                  <th className="px-2 py-3">Ashar</th>
                  <th className="px-2 py-3">Maghrib</th>
                  <th className="px-2 py-3">Isya</th>
                  <th className="px-2 py-3">Tahajud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.slice(0, 4).map(st => {
                  const p = ibadahChecklist[st.id] || { subuh: true, dhuha: true, dzuhur: true, ashar: true, maghrib: true, isya: true, tahajud: false };
                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 text-left">
                        <span className="font-bold text-slate-900 block">{st.nama}</span>
                        <span className="text-[11px] text-slate-500">{st.kamarAsrama}</span>
                      </td>
                      {(['subuh', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya', 'tahajud'] as const).map(pr => (
                        <td key={pr} className="px-2 py-3">
                          <button
                            onClick={() => toggleIbadah(st.id, pr)}
                            className={`w-6 h-6 mx-auto rounded flex items-center justify-center transition-colors ${
                              p[pr] ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: IZIN KELUAR ASRAMA */}
      {activeAsramaTab === 'izin_keluar' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Surat Izin Keluar Asrama Santri &amp; Verifikasi Gerbang</h3>
            <p className="text-xs text-slate-500">Mekanisme dua tahap: Persetujuan Pembina Asrama dilanjutkan Validasi Pos Security</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {izinAsramaList.map(item => (
              <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                      {item.kodeIzin}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.siswaNama} ({item.kelas})</h4>
                    <p className="text-xs text-slate-500">Kamar: {item.kamar} · Keperluan: {item.keperluan}</p>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-slate-500 block">Jadwal Keluar - Rencana Kembali:</span>
                    <span className="font-mono text-slate-900 font-bold">{item.waktuKeluarRencana} s.d. {item.waktuKembaliRencana}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p><strong>Penjemput:</strong> {item.namaPenjemput} (<span className="font-mono">{item.kontakPenjemput}</span>)</p>
                    <p className="mt-1">
                      Status Pembina: <span className="font-semibold text-emerald-700">{item.statusPembina}</span> ·
                      Status Pos Gerbang: <span className="font-semibold text-indigo-700">{item.statusKeamanan}</span>
                    </p>
                  </div>

                  {/* Actions for security gate check-out and check-in */}
                  <div className="flex items-center gap-2">
                    {item.statusKeamanan === 'Menunggu di Pos' && (
                      <button
                        onClick={() => updateIzinAsramaStatus(item.id, 'keamanan', 'Sudah Keluar')}
                        className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-xs"
                      >
                        Validasi Keluar Gerbang
                      </button>
                    )}
                    {item.statusKeamanan === 'Sudah Keluar' && (
                      <button
                        onClick={() => updateIzinAsramaStatus(item.id, 'keamanan', 'Sudah Kembali')}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-xs"
                      >
                        Validasi Kembali ke Asrama
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: POS KEAMANAN & PATROLI */}
      {activeAsramaTab === 'pos_keamanan' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pos Pengamanan &amp; Buku Jurnal Patroli Ronda</h3>
              <p className="text-xs text-slate-500">Pencatatan ronda asrama malam, kontrol lampu gerbang, dan log keluar masuk kendaraan</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md">
              REGU MALAM: PAK SUPARMAN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800">Patroli 23:00 WIB</span>
              <p className="text-slate-600">Pintu gerbang asrama putra terkunci rapat, mushaf masjid dirapikan, aman terkendali.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800">Patroli 01:30 WIB</span>
              <p className="text-slate-600">Pengecekan area jemuran santri &amp; laboratorium sains, lampu sorot aktif optimal.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800">Patroli 03:45 WIB</span>
              <p className="text-slate-600">Membantu pembina asrama membangunkan santri persiapan sholat tahajud &amp; subuh.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MANAJEMEN GADGET */}
      {activeAsramaTab === 'gadget' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Manajemen Gadget &amp; Loker Penyimpanan Santri</h3>
              <p className="text-xs text-slate-500">Penyimpanan smartphone santri selama hari KBM dan jadwal serah terima weekend</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Smartphone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Santri hanya diperbolehkan mengakses gadget pada hari Sabtu pukul 16:00 WIB hingga Ahad pukul 17:00 WIB untuk keperluan komunikasi keluarga dengan izin tertulis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
