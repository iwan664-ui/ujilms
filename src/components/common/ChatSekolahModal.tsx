/**
 * Obrolan Internal Dewan Guru & Staf Madrasah (Chat Sekolah Real-Time)
 * Dedicated messaging channel with role labels, pinned notices, and moderation
 */

import React, { useState, useRef, useEffect } from 'react';
import { useMadani } from '../../context/MadaniContext';
import { Send, Pin, Trash2, X, MessageSquare, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSekolahModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { chatMessages, sendChatMessage, deleteChatMessage, currentUser } = useMadani();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, chatMessages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const isModerator = ['super_admin', 'waka_kurikulum', 'waka_kesiswaan'].includes(currentUser.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Ruang Komunikasi Pendidik &amp; Staf</h3>
              <p className="text-xs text-slate-400">Kanal Koordinasi Harian Madrasah Digital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pinned announcement notice */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-900 shrink-0">
          <Pin className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="truncate">
            <strong>Pemberitahuan Waka Kurikulum:</strong> Pengisian Jurnal KBM harap tuntas tepat waktu setiap harinya.
          </span>
        </div>

        {/* Message feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {chatMessages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 group ${isMe ? 'flex-row-reverse' : ''}`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs relative text-xs ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                }`}>
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className={`font-semibold text-[11px] truncate ${isMe ? 'text-indigo-100' : 'text-slate-900'}`}>
                      {msg.senderName}
                    </span>
                    <span className={`text-[10px] tabular-nums font-mono ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                  {/* Moderator delete action */}
                  {isModerator && (
                    <button
                      onClick={() => deleteChatMessage(msg.id)}
                      title="Hapus / Moderasi Pesan"
                      className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white shadow-sm hover:bg-rose-700 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={`Tulis pesan koordinasi sebagai ${currentUser.name.split(',')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
