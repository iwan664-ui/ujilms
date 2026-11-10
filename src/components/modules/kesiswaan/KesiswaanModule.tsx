/**
 * Modul Kesiswaan & Kedisiplinan Santri
 * Presensi Gerbang RFID/NIS, Dispensasi Multi-Siswa, Poin Pelanggaran & SP, Designer Kartu Pelajar, Daftar Ulang Dinamis
 */

import React, { useState } from 'react';
import { useMadani, KesiswaanTab } from '../../../context/MadaniContext';
import {
  QrCode,
  Users2,
  AlertTriangle,
  CreditCard,
  FileCheck,
  CheckCircle2,
  XCircle,
  Plus,
  Printer,
  Sparkles,
  Search,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { Siswa } from '../../../types/madani';

interface Props {
  onOpenRFIDModal: () => void;
  onOpenDispensasiModal: () => void;
}

export const KesiswaanModule: React.FC<Props> = ({ onOpenRFIDModal, onOpenDispensasiModal }) => {
  const {
    activeKesiswaanTab,
    setActiveKesiswaanTab,
    rfidLogs,
    dispensasiList,
    updateDispensasiApproval,
    pelanggaranList,
    addPelanggaran,
    students,
    schoolProfile
  } = useMadani();

  // Pelanggaran input state
  const [showPelanggaranForm, setShowPelanggaranForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [jenisPelanggaran, setJenisPelanggaran] = useState('');
  const [kategoriPel, setKategoriPel] = useState<'Ringan' | 'Sedang' | 'Berat'>('Ringan');
  const [poinInput, setPoinInput] = useState(10);
  const [sanksiInput, setSanksiInput] = useState('');

  // Selected student for ID Card preview
  const [selectedCardStudent, setSelectedCardStudent] = useState<Siswa>(students[0]);
  const [cardTemplateColor, setCardTemplateColor] = useState<'indigo' | 'emerald' | 'navy'>('indigo');

  const handleAddPelanggaranSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st || !jenisPelanggaran.trim()) return;

    addPelanggaran({
      siswaId: st.id,
      siswaNama: st.nama,
      kelas: st.kelas,
      jenisPelanggaran,
      kategori: kategoriPel,
      poin: poinInput,
      sanksiDiberikan: sanksiInput || 'Teguran lisan & pencatatan poin pelanggaran',
      statusPenanganan: 'Ditangani Wali Kelas',
      dicatatOleh: 'Tim Satgas Disiplin Madrasah'
    });

    setJenisPelanggaran('');
    setSanksiInput('');
    setShowPelanggaranForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Subtab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
        <button
          onClick={() => setActiveKesiswaanTab('rfid_scan')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKesiswaanTab === 'rfid_scan' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Presensi RFID / NIS
        </button>
        <button
          onClick={() => setActiveKesiswaanTab('dispensasi')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKesiswaanTab === 'dispensasi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dispensasi Santri
        </button>
        <button
          onClick={() => setActiveKesiswaanTab('pelanggaran_poin')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKesiswaanTab === 'pelanggaran_poin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Catatan &amp; Poin Disiplin
        </button>
        <button
          onClick={() => setActiveKesiswaanTab('kartu_pelajar')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKesiswaanTab === 'kartu_pelajar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Designer Kartu Pelajar
        </button>
        <button
          onClick={() => setActiveKesiswaanTab('daftar_ulang')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeKesiswaanTab === 'daftar_ulang' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Daftar Ulang Dinamis
        </button>
      </div>

      {/* TAB 1: RFID SCAN */}
      {activeKesiswaanTab === 'rfid_scan' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Gerbang Presensi RFID &amp; Barcode NIS Santri</h3>
              <p className="text-xs text-slate-500">Integrasi scanner gate, pembaca RFID UHF, dan notifikasi WhatsApp otomatis ke orang tua</p>
            </div>
            <button
              onClick={onOpenRFIDModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" /> Buka Terminal Scanner
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Log Masuk &amp; Pulang Santri Hari Ini</h4>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Live Scanner Feed
              </span>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-3">Waktu</th>
                  <th className="px-4 py-3">Nama Santri</th>
                  <th className="px-4 py-3">NIS &amp; Kelas</th>
                  <th className="px-4 py-3">Tag RFID</th>
                  <th className="px-4 py-3">Terminal Gate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rfidLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{log.timestamp} WIB</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{log.namaSiswa}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{log.nis} · {log.kelas}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{log.rfidTag}</td>
                    <td className="px-4 py-3 text-slate-600">{log.mesinId}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        log.status === 'Berhasil' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DISPENSASI */}
      {activeKesiswaanTab === 'dispensasi' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daftar Pengajuan Dispensasi Santri</h3>
              <p className="text-xs text-slate-500">Mekanisme verifikasi berjenjang: Bidang Kurikulum dan Bidang Kesiswaan</p>
            </div>
            <button
              onClick={onOpenDispensasiModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Ajukan Dispensasi Baru
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {dispensasiList.map(item => (
              <div key={item.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                      {item.nomorDispensasi}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.keperluan}</h4>
                    <p className="text-xs text-slate-500">Penyelenggara: {item.penyelenggara} · Kategori: {item.kategori}</p>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-semibold text-slate-700 block">Periode Dispensasi:</span>
                    <span className="font-mono text-slate-900 font-bold">{item.tanggalMulai} s.d. {item.tanggalSelesai}</span>
                  </div>
                </div>

                {/* List of students receiving dispensasi */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">Santri Penerima Dispensasi ({item.siswaList.length} orang):</span>
                  <div className="flex flex-wrap gap-2">
                    {item.siswaList.map(s => (
                      <span key={s.siswaId} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs">
                        <strong>{s.nama}</strong> ({s.kelas}) - <span className="font-mono text-slate-500">NIS {s.nis}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Multi-tier Approval Bar */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Persetujuan Kurikulum:</span>
                      <span className={`font-semibold ${item.statusKurikulum === 'Disetujui' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {item.statusKurikulum}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Persetujuan Kesiswaan:</span>
                      <span className={`font-semibold ${item.statusKesiswaan === 'Disetujui' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {item.statusKesiswaan}
                      </span>
                    </div>
                  </div>

                  {/* Actions for approvals */}
                  <div className="flex items-center gap-2">
                    {item.statusKurikulum === 'Menunggu' && (
                      <button
                        onClick={() => updateDispensasiApproval(item.id, 'kurikulum', 'Disetujui')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold"
                      >
                        Setujui (Kurikulum)
                      </button>
                    )}
                    {item.statusKesiswaan === 'Menunggu' && (
                      <button
                        onClick={() => updateDispensasiApproval(item.id, 'kesiswaan', 'Disetujui')}
                        className="px-2.5 py-1 bg-indigo-600 text-white rounded text-[11px] font-semibold"
                      >
                        Setujui (Kesiswaan)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PELANGGARAN & POIN DISIPLIN */}
      {activeKesiswaanTab === 'pelanggaran_poin' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sistem Kalkulasi Poin Pelanggaran &amp; Surat Peringatan (SP)</h3>
              <p className="text-xs text-slate-500">Threshold otomatis: 25 poin (Teguran/Wali Kelas), 50 poin (SP1), 75 poin (SP2), 100 poin (Skorsing/SP3)</p>
            </div>
            <button
              onClick={() => setShowPelanggaranForm(!showPelanggaranForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" /> {showPelanggaranForm ? 'Tutup Form' : 'Catat Pelanggaran'}
            </button>
          </div>

          {/* Add form */}
          {showPelanggaranForm && (
            <form onSubmit={handleAddPelanggaranSubmit} className="bg-white p-6 rounded-xl border border-rose-200 shadow-md space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Input Catatan Pelanggaran Tata Tertib Madrasah
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pilih Santri</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Pelanggaran</label>
                  <select
                    value={kategoriPel}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setKategoriPel(val);
                      setPoinInput(val === 'Ringan' ? 10 : val === 'Sedang' ? 20 : 50);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Ringan">Ringan (Kerapian, Terlambat Sholat / KBM)</option>
                    <option value="Sedang">Sedang (Gadget, Merusak Fasilitas, Berkelahi Ringan)</option>
                    <option value="Berat">Berat (Kabur Asrama, Bullying, Asusila)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bobot Poin</label>
                  <input
                    type="number"
                    value={poinInput}
                    onChange={(e) => setPoinInput(parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Uraian Kejadian Pelanggaran</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Menggunakan smartphone saat jam wajib tahfiz asrama tanpa izin"
                  value={jenisPelanggaran}
                  onChange={(e) => setJenisPelanggaran(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sanksi Edukatif Diberikan</label>
                <input
                  type="text"
                  placeholder="Contoh: Setoran hafalan Surat Ar-Rahman dan penyitaan gadget selama 1 pekan"
                  value={sanksiInput}
                  onChange={(e) => setSanksiInput(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPelanggaranForm(false)} className="px-4 py-2 text-slate-600">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-lg font-semibold">
                  Simpan Catatan Disiplin
                </button>
              </div>
            </form>
          )}

          {/* Table of Violations */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Nama Santri &amp; Kelas</th>
                  <th className="px-4 py-3">Pelanggaran</th>
                  <th className="px-4 py-3">Poin</th>
                  <th className="px-4 py-3">Sanksi</th>
                  <th className="px-4 py-3">Dicatat Oleh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pelanggaranList.map(pel => (
                  <tr key={pel.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-slate-500">{pel.tanggal}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-slate-900 block">{pel.siswaNama}</span>
                      <span className="text-[11px] text-slate-500">{pel.kelas}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-800">{pel.jenisPelanggaran}</td>
                    <td className="px-4 py-3 font-mono font-bold text-rose-600">+{pel.poin}</td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">{pel.sanksiDiberikan}</td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">{pel.dicatatOleh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DESIGNER KARTU PELAJAR */}
      {activeKesiswaanTab === 'kartu_pelajar' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Designer Kartu Tanda Pelajar &amp; Santri Madani</h3>
              <p className="text-xs text-slate-500">Pratinjau layout standar ISO CR80 dengan QR Code dinamis dan barcode NIS</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedCardStudent.id}
                onChange={(e) => {
                  const st = students.find(s => s.id === e.target.value);
                  if (st) setSelectedCardStudent(st);
                }}
                className="text-xs p-2 bg-white border border-slate-200 rounded-lg"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
                ))}
              </select>
              <button
                onClick={() => alert(`Cetak kartu pelajar untuk ${selectedCardStudent.nama} dikirim ke antrean cetak PVC.`)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak Kartu
              </button>
            </div>
          </div>

          {/* Interactive Card Preview Canvas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-8 bg-slate-100 rounded-2xl border border-slate-200">
            {/* Front Card */}
            <div className="w-80 h-48 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-xl border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center font-bold text-xs text-slate-950">
                    M
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase block text-indigo-200">
                      MAS INTEGRATED AL-MADANI
                    </span>
                    <span className="text-[9px] text-slate-400 block">KARTU TANDA PELAJAR</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  RFID ACTIVE
                </span>
              </div>

              <div className="flex items-center gap-3 relative z-10 my-1">
                <div className="w-14 h-16 rounded-lg bg-slate-800 border-2 border-indigo-400/40 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt={selectedCardStudent.nama}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-xs font-extrabold truncate text-white">{selectedCardStudent.nama}</h4>
                  <p className="text-[10px] font-mono text-indigo-300">NIS: {selectedCardStudent.nis}</p>
                  <p className="text-[10px] text-slate-300">{selectedCardStudent.kelas}</p>
                  <p className="text-[9px] text-emerald-400">{selectedCardStudent.kamarAsrama}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-700/60 pt-1.5 relative z-10">
                <span className="font-mono">EXP: 07/2027</span>
                <span className="font-mono text-indigo-300">RFID: {selectedCardStudent.rfidTag.slice(-6)}</span>
              </div>

              {/* Decorative shapes */}
              <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-xl" />
            </div>

            {/* Back Card */}
            <div className="w-80 h-48 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h5 className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200">
                  KETENTUAN KARTU PELAJAR
                </h5>
                <ul className="text-[8px] text-slate-600 space-y-0.5 list-disc pl-3 mt-1.5">
                  <li>Kartu ini adalah identitas resmi santri MAS Integrated Al-Madani.</li>
                  <li>Wajib dibawa saat KBM, sholat berjamaah, dan izin asrama.</li>
                  <li>Dilarang meminjamkan kartu RFID ini kepada orang lain.</li>
                </ul>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="h-6 w-32 bg-slate-900 flex items-center justify-around px-1 rounded-xs">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className={`h-full ${i % 3 === 0 ? 'w-1 bg-white' : 'w-0.5 bg-white'}`} />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block text-center mt-0.5">
                    *{selectedCardStudent.nis}*
                  </span>
                </div>
                <div className="w-10 h-10 border border-slate-300 rounded flex items-center justify-center font-mono text-[8px] text-slate-600 text-center">
                  QR ID
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DAFTAR ULANG DINAMIS */}
      {activeKesiswaanTab === 'daftar_ulang' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Formulir Daftar Ulang Dinamis &amp; Verifikasi Berkas</h3>
              <p className="text-xs text-slate-500">Konfigurasi custom fields santri baru, verifikasi KK, akta, dan bukti pembayaran SPP</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              Gelombang 1 Dibuka
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Daftar Field Kustom yang Diaktifkan:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <span className="p-2 bg-white rounded border border-slate-200 text-slate-700 font-medium">1. Nomor Induk Santri (NIS)</span>
                <span className="p-2 bg-white rounded border border-slate-200 text-slate-700 font-medium">2. Riwayat Penyakit Khusus</span>
                <span className="p-2 bg-white rounded border border-slate-200 text-slate-700 font-medium">3. Ukuran Seragam &amp; Jubah</span>
                <span className="p-2 bg-white rounded border border-slate-200 text-slate-700 font-medium">4. Pilihan Halaqah Tahfiz</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
