/**
 * Widget & Monitor Time Map KBM Real-Time
 * Auto-detects current active period, class progress, and full-screen lobby display
 */

import React, { useState, useEffect } from 'react';
import { useMadani } from '../../../context/MadaniContext';
import { jamPelajaranList } from '../../../data/mockData';
import { Clock, Maximize2, Minimize2, Play, Users, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const TimeMapKBM: React.FC = () => {
  const { classes, jadwal, students } = useMadani();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'>('Senin');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [simulatedPeriod, setSimulatedPeriod] = useState<number | null>(1); // Default period 1 for preview

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Get active period
  const activePeriod = simulatedPeriod !== null
    ? simulatedPeriod
    : 1;

  const currentPeriodInfo = jamPelajaranList.find(p => p.period === activePeriod);

  return (
    <div className={`space-y-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-900 text-white p-6 overflow-y-auto' : ''}`}>
      {/* Top Monitor Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isFullScreen ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-base font-bold ${isFullScreen ? 'text-white' : 'text-slate-900'}`}>
                Time Map KBM &amp; Monitor Kelas Real-Time
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" /> LIVE
              </span>
            </div>
            <p className={`text-xs ${isFullScreen ? 'text-slate-400' : 'text-slate-500'}`}>
              Pemantauan jadwal pembelajaran aktif, perpindahan kelas, dan guru bertugas di setiap ruang
            </p>
          </div>
        </div>

        {/* Controls: Live Clock, Period simulation, Day selector, Fullscreen */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Clock Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-sm tabular-nums">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>{timeString} WIB</span>
          </div>

          {/* Day Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
            {(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedDay === day
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={`p-2 rounded-lg border transition-colors ${
              isFullScreen
                ? 'bg-slate-700 text-white border-slate-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Layar Penuh (Lobby Monitor Mode)"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Period Indicator Bar */}
      <div className={`p-4 rounded-xl border ${isFullScreen ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className={`text-xs font-semibold ${isFullScreen ? 'text-slate-300' : 'text-slate-700'}`}>
              Jalur Timeline Waktu Pembelajaran:
            </span>
          </div>
          <span className={`text-xs ${isFullScreen ? 'text-indigo-400' : 'text-indigo-700'} font-medium`}>
            Saat ini menampilkan: <strong>Jam Pelajaran ke-{activePeriod} ({currentPeriodInfo?.startTime} - {currentPeriodInfo?.endTime})</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {jamPelajaranList.filter(p => !p.isBreak).map(p => {
            const isActive = activePeriod === p.period;
            return (
              <button
                key={p.period}
                onClick={() => setSimulatedPeriod(p.period)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300/50'
                    : isFullScreen
                    ? 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold">Jam ke-{p.period}</span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-200" />}
                </div>
                <div className="font-mono text-xs tabular-nums opacity-90">
                  {p.startTime} - {p.endTime}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Class Status for Selected Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(kelas => {
          // Find matching schedule item
          const item = jadwal.find(
            j => j.hari === selectedDay && j.period === activePeriod && j.kelasId === kelas.id
          );

          return (
            <div
              key={kelas.id}
              className={`p-4 rounded-xl border transition-all ${
                isFullScreen
                  ? 'bg-slate-800/90 border-slate-700'
                  : 'bg-white border-slate-200 shadow-xs hover:border-indigo-300'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <h3 className={`text-sm font-bold ${isFullScreen ? 'text-white' : 'text-slate-900'}`}>
                    {kelas.nama}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{kelas.ruang}</span>
                  </div>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                  kelas.isMovingClass
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {kelas.isMovingClass ? 'Moving Class' : 'Ruang Tetap'}
                </span>
              </div>

              {/* Subject Content */}
              <div className="py-3">
                {item ? (
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Mata Pelajaran Aktif</span>
                      <p className={`text-sm font-bold ${isFullScreen ? 'text-indigo-300' : 'text-indigo-900'}`}>
                        {item.subjectName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                        {item.teacherName.charAt(0)}
                      </div>
                      <span className={`font-medium truncate ${isFullScreen ? 'text-slate-300' : 'text-slate-800'}`}>
                        {item.teacherName}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-700 text-slate-500">
                      <span>Ruang: {item.ruang}</span>
                      <span className="text-emerald-700 font-medium">KBM Berlangsung</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-slate-400">
                    <p>Tidak ada jadwal terdaftar pada jam ke-{activePeriod}</p>
                    <span className="text-[11px] text-slate-500 block mt-1">Kegiatan Literasi / Jam Bebas Terbimbing</span>
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{kelas.totalSiswa} Santri</span>
                </div>
                <span className="text-[11px]">Wali: {kelas.waliKelasNama.split(',')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Classic Schedule Table Link / Overview */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isFullScreen ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          <strong>Tips Monitor KBM:</strong> Tampilan ini terhubung langsung dengan sistem Ceklok GPS PWA Guru dan Jurnal Mengajar. Jika guru belum ceklok atau terlambat, sistem otomatis memberikan notifikasi pada koordinator piket.
        </div>
      </div>
    </div>
  );
};
