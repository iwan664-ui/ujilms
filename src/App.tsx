/**
 * MADANI - Sistem Informasi & LMS Madrasah Digital Terintegrasi
 * Main Application Root Layout & Router
 */

import React, { useState } from 'react';
import { MadaniProvider, useMadani } from './context/MadaniContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileTeacherView } from './components/layout/MobileTeacherView';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { TimeMapKBM } from './components/modules/timemap/TimeMapKBM';
import { KurikulumModule } from './components/modules/kurikulum/KurikulumModule';
import { KesiswaanModule } from './components/modules/kesiswaan/KesiswaanModule';
import { AsramaTahfizModule } from './components/modules/asrama/AsramaTahfizModule';
import { PerpustakaanModule } from './components/modules/perpustakaan/PerpustakaanModule';
import { HumasSarprasModule } from './components/modules/humas_sarpras/HumasSarprasModule';
import { PengaturanSekolah } from './components/modules/pengaturan/PengaturanSekolah';
import { ArchitectureBlueprint } from './components/blueprint/ArchitectureBlueprint';
import { SpreadsheetGASModule } from './components/modules/spreadsheet/SpreadsheetGASModule';

// Common Modals
import { GPSCeklokModal } from './components/common/GPSCeklokModal';
import { DispensasiFormModal } from './components/common/DispensasiFormModal';
import { ChatSekolahModal } from './components/common/ChatSekolahModal';
import { RFIDScannerModal } from './components/common/RFIDScannerModal';

// Toast icons
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeModule,
    isMobileTeacherMode,
    setIsMobileTeacherMode,
    toasts,
    removeToast
  } = useMadani();

  // Modals state
  const [isGPSModalOpen, setIsGPSModalOpen] = useState(false);
  const [isDispensasiModalOpen, setIsDispensasiModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isRFIDModalOpen, setIsRFIDModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenGPSModal={() => setIsGPSModalOpen(true)}
        onOpenChatModal={() => setIsChatModalOpen(true)}
        onOpenRFIDModal={() => setIsRFIDModalOpen(true)}
      />

      {/* Main Content Area */}
      {isMobileTeacherMode ? (
        /* PWA Mobile Mode for Teachers */
        <main className="flex-1 p-2 sm:p-6 bg-slate-200/70 overflow-y-auto">
          <div className="max-w-md mx-auto mb-3 flex items-center justify-between text-xs text-slate-600 px-1">
            <span>Tampilan Simulasi Smartphone PWA Guru</span>
            <button
              onClick={() => setIsMobileTeacherMode(false)}
              className="text-indigo-600 font-bold hover:underline"
            >
              Kembali ke Mode Desktop
            </button>
          </div>
          <MobileTeacherView
            onOpenGPSModal={() => setIsGPSModalOpen(true)}
            onOpenChatModal={() => setIsChatModalOpen(true)}
          />
        </main>
      ) : (
        /* Full Desktop Layout */
        <div className="flex-1 flex overflow-hidden">
          {/* Dynamic Collapsible Sidebar */}
          <Sidebar />

          {/* Viewport Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {activeModule === 'dashboard' && (
              <DashboardOverview
                onOpenGPSModal={() => setIsGPSModalOpen(true)}
                onOpenRFIDModal={() => setIsRFIDModalOpen(true)}
                onOpenDispensasiModal={() => setIsDispensasiModalOpen(true)}
              />
            )}
            {activeModule === 'timemap' && <TimeMapKBM />}
            {activeModule === 'kurikulum' && (
              <KurikulumModule onOpenGPSModal={() => setIsGPSModalOpen(true)} />
            )}
            {activeModule === 'kesiswaan' && (
              <KesiswaanModule
                onOpenRFIDModal={() => setIsRFIDModalOpen(true)}
                onOpenDispensasiModal={() => setIsDispensasiModalOpen(true)}
              />
            )}
            {activeModule === 'asrama_tahfiz' && <AsramaTahfizModule />}
            {activeModule === 'perpustakaan' && <PerpustakaanModule />}
            {activeModule === 'humas_sarpras' && <HumasSarprasModule />}
            {activeModule === 'pengaturan' && <PengaturanSekolah />}
            {activeModule === 'spreadsheet' && <SpreadsheetGASModule />}
            {activeModule === 'blueprint' && <ArchitectureBlueprint />}
          </main>
        </div>
      )}

      {/* Global Interactive Modals */}
      <GPSCeklokModal
        isOpen={isGPSModalOpen}
        onClose={() => setIsGPSModalOpen(false)}
      />
      <DispensasiFormModal
        isOpen={isDispensasiModalOpen}
        onClose={() => setIsDispensasiModalOpen(false)}
      />
      <ChatSekolahModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
      <RFIDScannerModal
        isOpen={isRFIDModalOpen}
        onClose={() => setIsRFIDModalOpen(false)}
      />

      {/* Global Toast Notifications Hub */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-white border-emerald-800'
                : toast.type === 'warning'
                ? 'bg-amber-950 text-white border-amber-800'
                : toast.type === 'error'
                ? 'bg-rose-950 text-white border-rose-800'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold block leading-tight">{toast.title}</span>
              <p className="opacity-90 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <MadaniProvider>
      <AppContent />
    </MadaniProvider>
  );
}
