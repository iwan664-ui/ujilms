/**
 * Form Pengajuan Dispensasi Siswa Multi-Kelas & Multi-Siswa
 * Integrated approval pipeline: Kurikulum & Kesiswaan
 */

import React, { useState } from 'react';
import { useMadani } from '../../context/MadaniContext';
import { FileText, Check, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { Siswa } from '../../types/madani';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DispensasiFormModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, classes, addDispensasi } = useMadani();

  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [selectedStudents, setSelectedStudents] = useState<Siswa[]>([]);
  const [keperluan, setKeperluan] = useState('');
  const [penyelenggara, setPenyelenggara] = useState('');
  const [kategori, setKategori] = useState<'Lomba Akademik/Sains' | 'Lomba Olahraga/Seni' | 'Organisasi/OSIM' | 'Urusan Keluarga/Dinas'>('Lomba Akademik/Sains');
  const [tanggalMulai, setTanggalMulai] = useState(new Date().toISOString().split('T')[0]);
  const [tanggalSelesai, setTanggalSelesai] = useState(new Date().toISOString().split('T')[0]);
  const [berkasNama, setBerkasNama] = useState('Surat_Undangan_Delegasi_Resmi.pdf');

  if (!isOpen) return null;

  const filteredStudents = selectedClassId === 'all'
    ? students
    : students.filter(s => {
        const cls = classes.find(c => c.id === selectedClassId);
        return cls && s.kelas.includes(cls.nama.substring(0, 4));
      });

  const toggleSelectStudent = (student: Siswa) => {
    if (selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents(prev => prev.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents(prev => [...prev, student]);
    }
  };

  const removeSelectedStudent = (id: string) => {
    setSelectedStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      alert('Pilih minimal satu santri/siswa penerima dispensasi.');
      return;
    }
    if (!keperluan.trim()) {
      alert('Mohon isi deskripsi keperluan dispensasi.');
      return;
    }

    addDispensasi({
      tanggalMulai,
      tanggalSelesai,
      keperluan,
      penyelenggara: penyelenggara || 'Kementerian Agama / Dinas Pendidikan',
      kategori,
      siswaList: selectedStudents.map(s => ({
        siswaId: s.id,
        nama: s.nama,
        nis: s.nis,
        kelas: s.kelas
      })),
      berkasSuratUndangan: berkasNama
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-xs border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Form Pengajuan Dispensasi Santri</h3>
            <p className="text-xs text-slate-500">Mendukung pemilihan multi-santri lintas kelas &amp; verifikasi berjenjang</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Activity detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori Kegiatan</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Lomba Akademik/Sains">Lomba Akademik &amp; Sains (OSM/KSM/CBT)</option>
                <option value="Lomba Olahraga/Seni">Lomba Olahraga &amp; Seni (POSPEDA/Aksioma)</option>
                <option value="Organisasi/OSIM">Tugas Organisasi Santri (OSIM/Pramuka/PMR)</option>
                <option value="Urusan Keluarga/Dinas">Urusan Keluarga Mendesak / Ibadah Khusus</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Instansi Penyelenggara</label>
              <input
                type="text"
                placeholder="Contoh: Kemenag RI, Kemendikbud, PTN"
                value={penyelenggara}
                onChange={(e) => setPenyelenggara(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kegiatan &amp; Keperluan</label>
            <input
              type="text"
              required
              placeholder="Contoh: Delegasi Olimpiade Sains Madrasah Nasional Tahap Final"
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Mulai Dispensasi</label>
              <input
                type="date"
                required
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Selesai</label>
              <input
                type="date"
                required
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Student picker section */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Pilih Santri / Siswa</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[11px] font-mono">
                  {selectedStudents.length} Terpilih
                </span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter Kelas:</span>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-md focus:outline-hidden"
                >
                  <option value="all">Semua Kelas</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.nama}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of candidates */}
            <div className="max-h-40 overflow-y-auto bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
              {filteredStudents.map(student => {
                const isSelected = selectedStudents.some(s => s.id === student.id);
                return (
                  <div
                    key={student.id}
                    onClick={() => toggleSelectStudent(student)}
                    className={`flex items-center justify-between p-2.5 text-xs cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <span className="font-medium text-slate-900">{student.nama}</span>
                        <span className="text-slate-500 ml-2">NIS: {student.nis}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium px-2 py-0.5 rounded bg-slate-100 shrink-0">
                      {student.kelas}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected chips list */}
            {selectedStudents.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selectedStudents.map(s => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-indigo-200 text-indigo-900 rounded-md text-xs shadow-xs"
                  >
                    <span>{s.nama} ({s.kelas})</span>
                    <button
                      type="button"
                      onClick={() => removeSelectedStudent(s.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Document Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lampiran Berkas Undangan / Surat Rekomendasi</label>
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <FileText className="w-6 h-6 text-slate-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">{berkasNama}</p>
                <p className="text-[11px] text-slate-500">PDF Document (Surat Resmi Berstempel)</p>
              </div>
              <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md text-xs font-medium transition-colors">
                Ganti File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setBerkasNama(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Workflow Note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p>
              Setelah dikirim, dispensasi ini otomatis masuk ke antrean verifikasi dua pintu: <strong>Waka Kurikulum</strong> (sinkronisasi presensi KBM) dan <strong>Waka Kesiswaan</strong> (validasi pembinaan/izin resmi).
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              Kirim Pengajuan Dispensasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
