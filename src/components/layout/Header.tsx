/**
 * MADANI Top Navigation Bar
 * Follows strict 3-Zone contract with quick role switching, search, and notification popovers
 */

import React, { useState } from 'react';
import { useMadani, ActiveModule } from '../../context/MadaniContext';
import { UserRole } from '../../types/madani';
import {
  Search,
  Bell,
  Smartphone,
  ChevronDown,
  Layers,
  Send,
  MessageSquare,
  Sparkles,
  Shield,
  BookOpen,
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';

interface Props {
  onOpenGPSModal: () => void;
  onOpenChatModal: () => void;
  onOpenRFIDModal: () => void;
}

export const Header: React.FC<Props> = ({ onOpenGPSModal, onOpenChatModal, onOpenRFIDModal }) => {
  const {
    currentUser,
    currentUserRole,
    setCurrentUserRole,
    activeModule,
    setActiveModule,
    isMobileTeacherMode,
    setIsMobileTeacherMode,
    searchQuery,
    setSearchQuery,
    waLogs,
    schoolProfile
  } = useMadani();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const roleLabels: Record<UserRole, string> = {
    super_admin: 'Super Admin (Kepala IT)',
    waka_kurikulum: 'Waka Kurikulum',
    waka_kesiswaan: 'Waka Kesiswaan',
    waka_humas: 'Waka Humas',
    waka_sarpras: 'Waka Sarpras',
    guru: 'Guru Mata Pelajaran',
    supervisor: 'Supervisor / Pengawas Kemenag',
    pembina_asrama: 'Pembina Asrama & Tahfiz',
    security: 'Security / Satpam Gerbang'
  };

  const rolesList: UserRole[] = [
    'super_admin',
    'waka_kurikulum',
    'waka_kesiswaan',
    'guru',
    'pembina_asrama',
    'supervisor',
    'security'
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Single text wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveModule('dashboard')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
            M
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              MADANI
            </span>
            <span className="text-[10px] text-emerald-600 font-bold ml-1.5 px-1.5 py-0.5 rounded bg-emerald-50 font-mono">
              DIGITAL
            </span>
          </div>
        </button>
      </div>

      {/* Zone 2: Search & Module Quick Jump */}
      <div className="flex-1 max-w-xl hidden md:flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari santri, NIS, jadwal KBM, guru, atau buku..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenGPSModal}
            title="Ceklok Kehadiran GPS"
            className="px-2.5 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
          >
            Ceklok GPS
          </button>
          <button
            onClick={onOpenRFIDModal}
            title="Simulator Gerbang RFID"
            className="px-2.5 py-1.5 text-xs font-medium text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
          >
            Scan RFID
          </button>
          <button
            onClick={onOpenChatModal}
            title="Obrolan Guru & Staf"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Zone 3: Actions, Mode Switch, Notifications, Role Switcher */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Toggle Mobile Teacher Mode */}
        <button
          onClick={() => setIsMobileTeacherMode(!isMobileTeacherMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
            isMobileTeacherMode
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Beralih ke tampilan PWA Guru untuk ponsel cerdas"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{isMobileTeacherMode ? 'Mode Desktop' : 'PWA Guru'}</span>
        </button>

        {/* Notifications WA & System Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifPopover(!showNotifPopover)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {showNotifPopover && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900">Notifikasi WhatsApp &amp; Sistem</span>
                <span className="text-[10px] text-emerald-600 font-semibold font-mono">Fonnte Connected</span>
              </div>
              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {waLogs.slice(0, 4).map(log => (
                  <div key={log.id} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-800">{log.template}</span>
                      <span className="font-mono text-slate-400">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{log.pesanPreview}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setActiveModule('kurikulum');
                    setShowNotifPopover(false);
                  }}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Buka Gerbang WhatsApp &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                {currentUser.name.split(',')[0]}
              </span>
              <span className="block text-[10px] text-slate-500 font-medium leading-tight">
                {roleLabels[currentUserRole]}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="text-[11px] text-slate-500 block">Simulasi Peran Pengguna (RBAC):</span>
                <span className="font-bold text-slate-900 text-xs block">{currentUser.name}</span>
              </div>
              <div className="py-1">
                {rolesList.map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentUserRole(role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between transition-colors ${
                      currentUserRole === role
                        ? 'bg-indigo-50 text-indigo-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{roleLabels[role]}</span>
                    {currentUserRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
