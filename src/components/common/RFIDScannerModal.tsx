/**
 * RFID & NIS Scanner Simulator Modal
 * Realistic gate scan terminal with audio beep and instant student punch-in
 */

import React, { useState } from 'react';
import { useMadani } from '../../context/MadaniContext';
import { Radio, X, UserCheck, AlertCircle, Smartphone, Volume2 } from 'lucide-react';
import { Siswa } from '../../types/madani';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RFIDScannerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, simulateRFIDScan, rfidLogs } = useMadani();
  const [scanInput, setScanInput] = useState('');
  const [lastScanned, setLastScanned] = useState<{ student?: Siswa; success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  // Web Audio API beep sound
  const playBeep = (isSuccess: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = isSuccess ? 'sine' : 'sawtooth';
      osc.frequency.value = isSuccess ? 1200 : 300;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (isSuccess ? 0.15 : 0.35));
      osc.start();
      osc.stop(audioCtx.currentTime + (isSuccess ? 0.15 : 0.35));
    } catch {
      // Audio blocked or not supported
    }
  };

  const handleScan = (codeToScan: string) => {
    if (!codeToScan.trim()) return;
    const result = simulateRFIDScan(codeToScan);
    setLastScanned(result);
    playBeep(result.success);
    setScanInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Simulator Scanner RFID / Barcode Gerbang</h3>
              <p className="text-xs text-slate-400">Gerbang Utama Madrasah &amp; Presensi Kehadiran Otomatis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Hardware Terminal Box */}
          <div className="p-5 bg-slate-950 text-emerald-400 rounded-xl font-mono border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
              <span>READER: RC522_UHF_01 [READY]</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Volume2 className="w-3.5 h-3.5" /> BEEP ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-500">&gt;</span>
              <input
                type="text"
                autoFocus
                placeholder="Tempelkan kartu RFID atau ketik NIS..."
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleScan(scanInput);
                  }
                }}
                className="flex-1 bg-transparent text-emerald-400 text-sm font-mono focus:outline-hidden placeholder:text-slate-600"
              />
              <button
                onClick={() => handleScan(scanInput)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded transition-colors"
              >
                Scan (Enter)
              </button>
            </div>
          </div>

          {/* Quick Tap Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 block">
              Simulasi Uji Cepat (Klik Kartu Santri):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {students.slice(0, 3).map(student => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleScan(student.rfidTag)}
                  className="p-2.5 rounded-lg border border-slate-200 text-left hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs"
                >
                  <p className="font-semibold text-slate-900 truncate">{student.nama.split(' ')[0]}...</p>
                  <span className="text-[11px] text-slate-500 font-mono block">RFID: {student.rfidTag.slice(-4)}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{student.kelas}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          {lastScanned && (
            <div className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all ${
              lastScanned.success
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                : 'bg-rose-50/80 border-rose-300 text-rose-900'
            }`}>
              {lastScanned.success ? (
                <UserCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  {lastScanned.success ? 'PRESENSI BERHASIL DITERIMA' : 'KARTU TIDAK TERDAFTAR'}
                </h4>
                <p className="text-xs font-medium mt-0.5">{lastScanned.message}</p>
                {lastScanned.student && (
                  <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    Notifikasi WhatsApp otomatis dikirim ke: {lastScanned.student.noHpOrtu} ({lastScanned.student.namaOrtu})
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Recent logs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Log Scan Terakhir:</h4>
            <div className="max-h-36 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg text-xs">
              {rfidLogs.slice(0, 5).map(log => (
                <div key={log.id} className="p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 tabular-nums">{log.timestamp}</span>
                    <span className="font-medium text-slate-800">{log.namaSiswa}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({log.kelas})</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    log.status === 'Berhasil' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
