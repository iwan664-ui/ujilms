/**
 * MADANI Architecture & Navigation Blueprint
 * Comprehensive architectural specifications, RBAC hierarchy tree, and entity schemas
 */

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Shield,
  Database,
  CheckCircle2,
  Code,
  Layout,
  Cpu,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types/madani';

export const ArchitectureBlueprint: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');

  const roleBlueprints: Record<UserRole, {
    title: string;
    description: string;
    accessModules: string[];
    actions: string[];
  }> = {
    super_admin: {
      title: 'Super Administrator (Kepala Pusat IT & Data)',
      description: 'Akses penuh ke seluruh konfigurasi arsitektur, RBAC, database dump/restore, kuota Fonnte WA gateway, dan monitoring server.',
      accessModules: [
        'Core & Executive Dashboard',
        'Time Map KBM Monitor Real-Time',
        'Kurikulum (Jadwal, Jurnal, Ceklok, Supervisi, Kalender, WA Gateway)',
        'Kesiswaan (RFID Gerbang, Dispensasi, Poin Disiplin, Kartu Pelajar)',
        'Keasramaan & Tahfiz (Progres, Halaqah, Ibadah, Izin Asrama, Gadget)',
        'Perpustakaan & Sarpras',
        'Pengaturan Sekolah, RBAC, Billing SaaS, & Backup/Restore'
      ],
      actions: [
        'Konfigurasi Geofencing & Koordinat Kampus',
        'Manajemen Hak Akses & Role Assignment',
        'Export & Import Backup JSON',
        'Moderasi Obrolan Sekolah Real-Time'
      ]
    },
    waka_kurikulum: {
      title: 'Waka Kurikulum & Akademik',
      description: 'Penanggung jawab alur pembelajaran KBM, validasi jurnal guru, jadwal A4, kalender pendidikan, dan pintu pertama verifikasi dispensasi.',
      accessModules: [
        'Dashboard Kurikulum & KBM',
        'Time Map KBM & Distribusi Guru Piket',
        'Manajemen Jadwal Kelas & Moving Class',
        'Verifikasi Rekap Jurnal Mengajar',
        'Persetujuan Dispensasi Pintu 1 (Sinkronisasi KBM)',
        'Pelaksanaan & Rekap Supervisi Akademik'
      ],
      actions: [
        'Penerbitan Jadwal A4 Berstempel',
        'Penguncian Presensi Otomatis Kalender KBM',
        'Evaluasi Kinerja Pendidik Skala 1-4'
      ]
    },
    waka_kesiswaan: {
      title: 'Waka Kesiswaan & Kedisiplinan',
      description: 'Pengendali tata tertib santri, kalkulasi poin pelanggaran, penerbitan Surat Peringatan (SP), dispensasi lomba, dan kartu pelajar.',
      accessModules: [
        'Dashboard Presensi & Kedisiplinan',
        'Log Gerbang Scanner RFID & NIS',
        'Verifikasi Akhir Dispensasi Santri (Pintu 2)',
        'Buku Rekap Poin Pelanggaran & SP',
        'Designer & Cetak Kartu Pelajar Massal'
      ],
      actions: [
        'Pemberian Sanksi Edukatif & Panggilan Orang Tua',
        'Otorisasi Dispensasi Delegasi OSM/Lomba',
        'Penyitaan & Serah Terima Gadget'
      ]
    },
    guru: {
      title: 'Guru Mata Pelajaran / Pendidik',
      description: 'Pengguna utama antarmuka web dan PWA Guru Mobile. Melakukan ceklok geofencing GPS, pengisian jurnal mengajar, dan absensi kelas.',
      accessModules: [
        'PWA Guru Mobile View',
        'Ceklok Mandiri GPS & Kamera Selfie',
        'Pengisian Jurnal Mengajar & Presensi Kelas',
        'Jadwal Mengajar Pribadi',
        'Kanal Obrolan Dewan Guru'
      ],
      actions: [
        'Presensi Kehadiran Geofence Radius 150m',
        'Input Capaian Pembelajaran & Refleksi Kelas',
        'Koordinasi Cepat via Chat Sekolah'
      ]
    },
    supervisor: {
      title: 'Supervisor & Pengawas Kemenag',
      description: 'Penilai mutu pembelajaran dengan instrumen 1.0 - 4.0, analisis perencanaan (RPP), pelaksanaan, penilaian, dan rekomendasi.',
      accessModules: [
        'Modul Supervisi Akademik',
        'Instrumen Penilaian Skala 1-4',
        'Generator Dokumen Lembar Pembinaan PDF',
        'Data Capaian Kurikulum'
      ],
      actions: [
        'Input Penilaian 4 Aspek Supervisi',
        'Penerbitan Nomor Surat Supervisi Resmi',
        'Pemberian Rekomendasi Guru Model'
      ]
    },
    pembina_asrama: {
      title: 'Pembina Asrama & Musyrif Tahfiz',
      description: 'Pengelola halaqah Al-Qur\'an, setoran tasm\'i hafalan santri (Mutqin/Jayyid), monitoring ibadah harian, dan izin keluar asrama.',
      accessModules: [
        'Jurnal Setoran Tahfiz & Sanad Surah',
        'Distribusi Halaqah & Musyrif',
        'Ceklis Sholat Berjamaah & Tahajud',
        'Persetujuan Surat Izin Keluar Asrama (Pintu 1)',
        'Loker Penyimpanan Smartphone Santri'
      ],
      actions: [
        'Verifikasi Mutqin Hafalan Santri',
        'Validasi Penjemputan Orang Tua',
        'Pencatatan Pelanggaran Kedisiplinan Asrama'
      ]
    },
    security: {
      title: 'Petugas Keamanan / Satpam Gerbang',
      description: 'Garda depan pos pengamanan kampus, verifikasi fisik santri keluar-masuk, log tamu humas, dan kontrol patroli ronda malam.',
      accessModules: [
        'Terminal Validasi Gerbang Utama',
        'Verifikasi Fisik Izin Santri (Sudah Keluar / Sudah Kembali)',
        'Log Scanner RFID Gerbang',
        'Buku Jurnal Patroli Keamanan Asrama'
      ],
      actions: [
        'Check-out & Check-in Surat Izin Santri',
        'Identifikasi Tamu Kendaraan & Penjemput',
        'Pencatatan Jam Ronda Malam'
      ]
    },
    waka_humas: {
      title: 'Waka Humas & Kemitraan',
      description: 'Pengelola buku tamu digital, agenda surat masuk/keluar, dan kepuasan publik.',
      accessModules: ['Buku Tamu Digital', 'Surat Masuk/Keluar'],
      actions: ['Registrasi Tamu', 'Disposisi Surat']
    },
    waka_sarpras: {
      title: 'Waka Sarana & Prasarana',
      description: 'Pengelola inventaris ruangan, label QR aset, dan pengadaan ATK.',
      accessModules: ['Inventaris Barang', 'Permintaan ATK'],
      actions: ['Pencatatan Aset', 'Approval Pengadaan']
    }
  };

  return (
    <div className="space-y-6">
      {/* Blueprint Header */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
            ARSITEKTUR PERANGKAT LUNAK &amp; BLUEPRINT UI/UX
          </span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Sistem Terintegrasi MADANI SaaS Madrasah Digital
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Dokumentasi formal arsitektur hierarki UI/UX, tata kelola hak akses berbasis peran (RBAC), skema entitas data terpadu (ERD), dan standar design system Clean Slate.
        </p>
      </div>

      {/* Role Navigation Hierarchy Explorer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">1. Peta Navigasi &amp; Wewenang per Peran (RBAC)</h3>
            <p className="text-xs text-slate-500">Pilih peran pengguna di bawah untuk meninjau hierarki menu yang aktif</p>
          </div>
        </div>

        {/* Role Selector Badges */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(roleBlueprints) as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {role.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Selected Role Card */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-4">
          <div>
            <h4 className="text-base font-extrabold text-slate-900">{roleBlueprints[selectedRole].title}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {roleBlueprints[selectedRole].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-indigo-600" /> Modul &amp; Tampilan yang Dapat Diakses:
              </span>
              <ul className="space-y-1 text-slate-700 list-disc pl-4">
                {roleBlueprints[selectedRole].accessModules.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" /> Aksi Kunci &amp; Wewenang Otorisasi:
              </span>
              <ul className="space-y-1 text-slate-700 list-disc pl-4">
                {roleBlueprints[selectedRole].actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Entity Relationship & Data Architecture */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">2. Skema Relasi Entitas (ERD) &amp; Model Data Kunci</h3>
            <p className="text-xs text-slate-500">Definisi struktur data modular tersinkronisasi dalam types/madani.ts</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            TypeScript Typings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 bg-slate-950 text-slate-200 rounded-xl space-y-1.5 border border-slate-800">
            <span className="text-emerald-400 font-bold block text-xs">interface User &amp; Presensi</span>
            <p className="text-[11px] text-slate-400">id, name, nip, role, avatar</p>
            <p className="text-[11px] text-slate-400">PresensiGuru: lat, lng, jarakMeter, isWithinRadius, photoUrl, status</p>
          </div>

          <div className="p-3.5 bg-slate-950 text-slate-200 rounded-xl space-y-1.5 border border-slate-800">
            <span className="text-indigo-400 font-bold block text-xs">interface KBM &amp; Supervisi</span>
            <p className="text-[11px] text-slate-400">Jadwal: hari, period, kelasId, subject</p>
            <p className="text-[11px] text-slate-400">Supervisi: skor 1-4 (Perencanaan, Pelaksanaan, Penilaian, Refleksi)</p>
          </div>

          <div className="p-3.5 bg-slate-950 text-slate-200 rounded-xl space-y-1.5 border border-slate-800">
            <span className="text-amber-400 font-bold block text-xs">interface Siswa &amp; Asrama</span>
            <p className="text-[11px] text-slate-400">Siswa: nis, rfidTag, poinPelanggaran</p>
            <p className="text-[11px] text-slate-400">Tahfiz: surah, ayat, kualitas (Mutqin/Jayyid)</p>
            <p className="text-[11px] text-slate-400">IzinAsrama: pembinaApprove, posGateLog</p>
          </div>
        </div>
      </div>

      {/* Design System Specifications */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          3. Standar Design System (Clean Slate &amp; Swiss Discipline)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Palet Primer &amp; Aksen</span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-900" /> Deep Slate: #0F172A</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-600" /> Royal Indigo: #4F46E5</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600" /> Islamic Emerald: #059669</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Tipografi 2+1 Rule</span>
            <p className="text-slate-600 text-[11px]">Display &amp; Body: <strong>Plus Jakarta Sans</strong></p>
            <p className="text-slate-600 text-[11px] mt-1">Data &amp; Tabular: <strong>JetBrains Mono</strong> (tabular-nums)</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Micro-Interactions</span>
            <p className="text-slate-600 text-[11px]">Latency response &le; 200ms</p>
            <p className="text-slate-600 text-[11px] mt-1">Web Audio API beep untuk scanner RFID hardware simulator</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Zero-Pill Discipline</span>
            <p className="text-slate-600 text-[11px]">Metadata unboxed dengan separator `·`</p>
            <p className="text-slate-600 text-[11px] mt-1">Bebas pseudo-code komentar header atau fake tickers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
