import React, { useState, useMemo } from 'react';
import { Candidate, RatingType } from '../types';
import { DAY_GUIDE_DATA } from '../data/dayGuideData';
import { 
  Calendar, 
  Copy, 
  Check, 
  AlertTriangle, 
  Compass, 
  Quote, 
  CheckCircle2, 
  Target, 
  Search, 
  Sparkles 
} from 'lucide-react';

interface ThirtyDaysViewProps {
  candidate: Candidate;
  onUpdateDayRating: (day: number, rating: RatingType, completed: boolean, note?: string) => void;
}

export const ThirtyDaysView: React.FC<ThirtyDaysViewProps> = ({
  candidate,
  onUpdateDayRating,
}) => {
  const [activePhase, setActivePhase] = useState<number | 'all'>('all');
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyQuestion = (day: number, question: string) => {
    navigator.clipboard.writeText(question);
    setCopiedDay(day);
    setTimeout(() => {
      setCopiedDay(null);
    }, 2000);
  };

  // Phase statistics
  const phaseStats = useMemo(() => {
    const stats: Record<number, { total: number; completed: number }> = {
      1: { total: 7, completed: 0 },
      2: { total: 8, completed: 0 },
      3: { total: 8, completed: 0 },
      4: { total: 7, completed: 0 },
    };

    DAY_GUIDE_DATA.forEach((d) => {
      if (candidate.dayRatings[d.day]?.completed) {
        stats[d.phase].completed++;
      }
    });

    const totalCompleted = Object.values(stats).reduce((acc, curr) => acc + curr.completed, 0);
    return { phases: stats, totalCompleted };
  }, [candidate.dayRatings]);

  const filteredDays = useMemo(() => {
    return DAY_GUIDE_DATA.filter((d) => {
      if (activePhase !== 'all' && d.phase !== activePhase) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.mission.toLowerCase().includes(q) ||
          d.taarufQuestion.toLowerCase().includes(q) ||
          d.fieldTest.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activePhase, searchQuery]);

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Progress Banner */}
      <div className="bg-gradient-to-br from-white to-[#fff0f5] border border-[#fcc2d7] rounded-2xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                Perjalanan 30 Hari Mengenal Calon Suami
              </h2>
              <span className="text-xs font-black text-[#d70f64] bg-[#fff0f5] px-2 py-0.5 rounded-full border border-[#fcc2d7]">
                {phaseStats.totalCompleted}/30 Hari
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Panduan terstruktur langkah demi langkah selama sebulan untuk menguji karakter, kestabilan finansial, dan kedewasaan emosi sebelum komitmen seumur hidup.
            </p>

            {/* Overall Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d70f64] to-[#ff2b85] h-full rounded-full transition-all duration-300"
                style={{ width: `${(phaseStats.totalCompleted / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 1, title: 'Fase 1 (H1-7)', subtitle: 'Fondasi & Niat', count: phaseStats.phases[1] },
          { id: 2, title: 'Fase 2 (H8-15)', subtitle: 'Finansial & Nafkah', count: phaseStats.phases[2] },
          { id: 3, title: 'Fase 3 (H16-23)', subtitle: 'Emosi & Konflik', count: phaseStats.phases[3] },
          { id: 4, title: 'Fase 4 (H24-30)', subtitle: 'Wali & Keputusan', count: phaseStats.phases[4] },
        ].map((f) => {
          const isActive = activePhase === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActivePhase(activePhase === f.id ? 'all' : f.id)}
              className={`p-2.5 rounded-xl text-left transition-all select-none border ${
                isActive
                  ? 'bg-[#d70f64] text-white border-b-[3.5px] border-[#8a073d] shadow-sm active:translate-y-0.5'
                  : 'bg-white text-slate-800 border-[#fcc2d7] border-b-[3.5px] border-b-[#f497be] hover:bg-[#fff0f5] active:translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {f.title}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {f.count.completed}/{f.count.total}
                </span>
              </div>
              <span className={`text-[10px] block mt-0.5 font-medium truncate ${
                isActive ? 'text-white/80' : 'text-slate-500'
              }`}>
                {f.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar for Days */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari hari, topik misi, atau pertanyaan ta'aruf..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64] focus:border-transparent transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Hapus
          </button>
        )}
      </div>

      {/* Days List */}
      <div className="space-y-3.5">
        {filteredDays.map((d) => {
          const currentData = candidate.dayRatings[d.day] || { rating: 'unrated', completed: false };
          const isCopied = copiedDay === d.day;

          return (
            <div
              key={d.day}
              className={`bg-white rounded-2xl border transition-all p-4 shadow-xs ${
                currentData.completed
                  ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/15'
                  : currentData.rating === 'red'
                  ? 'border-rose-300 ring-1 ring-rose-200'
                  : 'border-[#fcc2d7]'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    H{d.day}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-[#d70f64] uppercase tracking-wider block">
                      {d.phaseTitle}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {d.title}
                    </h3>
                  </div>
                </div>

                {/* Completed Toggle Checkbox */}
                <button
                  onClick={() => onUpdateDayRating(d.day, currentData.rating, !currentData.completed, currentData.note)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                    currentData.completed
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#d70f64]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentData.completed ? 'Selesai' : 'Tandai Selesai'}</span>
                </button>
              </div>

              {/* 1. Misi Hari Ini */}
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#fff0f5] border border-[#fcc2d7]/80 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#d70f64] mb-0.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Misi Hari Ini:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {d.mission}
                </p>
              </div>

              {/* 2. Ujian Lapangan */}
              <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-0.5">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ujian Lapangan (Observasi Nyata):</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {d.fieldTest}
                </p>
              </div>

              {/* 3. Soalan Ta'aruf Hari Ini (Bold Plus Jakarta Sans + Copy Button) */}
              <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#fcc2d7] shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-black text-[#d70f64] uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Pertanyaan Ta'aruf Hari Ini:
                  </span>
                  <button
                    onClick={() => handleCopyQuestion(d.day, d.taarufQuestion)}
                    className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#fff0f5] text-[#d70f64] hover:bg-[#ffe3ee] transition border border-[#fcc2d7]"
                    title="Salin teks pertanyaan"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Pertanyaan</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  "{d.taarufQuestion}"
                </p>
              </div>

              {/* 4. Amaran Red Flag */}
              <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Peringatan Red Flag:</span>
                </div>
                <p className="text-rose-900 leading-relaxed font-medium">
                  {d.redFlagWarning}
                </p>
              </div>

              {/* 5. Kata Hikmah / Refleksi Kebijaksanaan */}
              <div className="mt-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs italic">
                <div className="flex items-center gap-1 font-bold text-amber-800 not-italic mb-0.5">
                  <Quote className="w-3 h-3 text-amber-600" />
                  <span>Refleksi Wanita Matang:</span>
                </div>
                <p className="text-amber-900 leading-relaxed font-medium">
                  "{d.wiseQuote}"
                </p>
              </div>

              {/* 3D Tactile Rating Buttons for Day */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  Evaluasi Respon Hari Ini:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateDayRating(d.day, 'green', currentData.completed, currentData.note)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all select-none ${
                      currentData.rating === 'green'
                        ? 'bg-emerald-600 text-white border-b-[3px] border-emerald-800 shadow-sm active:translate-y-0.5'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 border-b-[3px] border-b-emerald-400 hover:bg-emerald-100 active:translate-y-0.5'
                    }`}
                  >
                    🟢 Green Flag
                  </button>

                  <button
                    onClick={() => onUpdateDayRating(d.day, 'red', currentData.completed, currentData.note)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all select-none ${
                      currentData.rating === 'red'
                        ? 'bg-rose-600 text-white border-b-[3px] border-rose-800 shadow-sm active:translate-y-0.5'
                        : 'bg-rose-50 text-rose-800 border border-rose-200 border-b-[3px] border-b-rose-400 hover:bg-rose-100 active:translate-y-0.5'
                    }`}
                  >
                    🔴 Red Flag
                  </button>

                  <button
                    onClick={() => onUpdateDayRating(d.day, 'unrated', currentData.completed, currentData.note)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all select-none ${
                      currentData.rating === 'unrated'
                        ? 'bg-slate-700 text-white border-b-[3px] border-slate-900'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 border-b-[3px] border-b-slate-300'
                    }`}
                  >
                    ⚪ Reset
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
