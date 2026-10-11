import React, { useState } from 'react';
import { Candidate } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { 
  HeartHandshake, 
  UserPlus, 
  Users, 
  Download, 
  HelpCircle, 
  DownloadCloud, 
  WifiOff, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  candidates: Candidate[];
  activeCandidate: Candidate;
  onSelectCandidate: (id: string) => void;
  onOpenCandidateModal: () => void;
  onOpenGuideModal: () => void;
  onOpenExportImportModal: () => void;
  totalCriteriaRated: number;
  totalDaysCompleted: number;
  compatibilityScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  candidates,
  activeCandidate,
  onSelectCandidate,
  onOpenCandidateModal,
  onOpenGuideModal,
  onOpenExportImportModal,
  totalCriteriaRated,
  totalDaysCompleted,
  compatibilityScore,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const isOnline = useOnlineStatus();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#fcc2d7] shadow-sm">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Mode Luar Taringan (Offline) — Data lokal tetap tersimpan aman.</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-2.5">
        {/* Top row: Brand & Action Tools */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] flex items-center justify-center text-white shadow-md shadow-[#d70f64]/20 flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black text-slate-900 truncate leading-tight tracking-tight">
                Checklist Calon Suami
              </h1>
              <p className="text-[11px] text-slate-500 font-medium truncate hidden sm:block">
                Kenali Tindakan Nyata, Bukan Sekadar Kata-Kata
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* PWA Install Button */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="btn-3d-primary flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                title="Pasang Aplikasi ke Layar Utama"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Pasang App</span>
              </button>
            )}

            {!isInstalled && isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="btn-3d-secondary flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#d70f64]"
                title="Petunjuk Pasang di iPhone"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Pasang iOS</span>
              </button>
            )}

            {/* Guide Button */}
            <button
              onClick={onOpenGuideModal}
              className="btn-3d-secondary flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700"
              title="Panduan Cara Penilaian Objektif"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#d70f64]" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            {/* Backup / Restore Button */}
            <button
              onClick={onOpenExportImportModal}
              className="btn-3d-secondary flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700"
              title="Cadangkan atau Pulihkan Data JSON"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Cadangan</span>
            </button>
          </div>
        </div>

        {/* Second row: Candidate Selector & Quick Metrics */}
        <div className="mt-2.5 pt-2 border-t border-[#fcc2d7]/50 flex flex-wrap items-center justify-between gap-2">
          {/* Candidate Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-[#fff0f5] hover:bg-[#ffe3ee] text-slate-900 border border-[#fcc2d7] px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-[#d70f64]" />
              <span className="max-w-[120px] sm:max-w-[160px] truncate">
                {activeCandidate.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-[#fcc2d7] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Calon Pasangan
                </div>
                {candidates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCandidate(c.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[#fff0f5] transition ${
                      c.id === activeCandidate.id ? 'text-[#d70f64] bg-[#fff0f5] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    {c.id === activeCandidate.id && (
                      <span className="w-2 h-2 rounded-full bg-[#d70f64]" />
                    )}
                  </button>
                ))}
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={onOpenCandidateModal}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold text-[#d70f64] flex items-center gap-1.5 hover:bg-[#fff0f5] transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Tambah / Kelola Calon</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
              <CheckCircle2 className="w-3 h-3 text-[#d70f64]" />
              <span>{totalCriteriaRated}/25 Kriteria</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{totalDaysCompleted}/30 Hari</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg font-bold ${
              compatibilityScore >= 80 
                ? 'bg-emerald-100 text-emerald-800' 
                : compatibilityScore >= 50 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              <span>Skor: {compatibilityScore}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* iOS Install Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-[#fcc2d7]">
            <div className="w-12 h-12 rounded-xl bg-[#fff0f5] text-[#d70f64] flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 text-center">
              Pasang di iPhone / iPad
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Agar aplikasi ini dapat dibuka kapan saja tanpa browser dan bekerja secara offline:
            </p>
            <ol className="mt-3 text-xs text-slate-700 space-y-2 bg-[#fff0f5] p-3 rounded-xl border border-[#fcc2d7]/70">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">1.</span>
                <span>Ketuk tombol <strong>Bagikan (Share)</strong> di bilah bawah Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">2.</span>
                <span>Gulir ke bawah dan pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">3.</span>
                <span>Ketuk <strong>Tambah</strong> di pojok kanan atas.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full btn-3d-primary py-2.5 rounded-xl text-xs font-bold text-white text-center"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
