import React, { useState, useMemo } from 'react';
import { Candidate, RatingType } from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';
import { 
  HelpCircle, 
  Search, 
  Copy, 
  Check, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon,
  Lightbulb, 
  Sparkles,
  Edit3,
  Filter,
  Clock
} from 'lucide-react';

interface QuestionsViewProps {
  candidate: Candidate;
  onUpdateQuestionRating: (questionId: string, rating: RatingType, note?: string) => void;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  candidate,
  onUpdateQuestionRating,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<RatingType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Semua (32)' },
    { id: 'niat', label: 'Niat & Visi (4)' },
    { id: 'finansial', label: 'Finansial & Nafkah (5)' },
    { id: 'emosi', label: 'Kemarahan & Emosi (5)' },
    { id: 'anak', label: 'Anak & Single Mom (5)' },
    { id: 'masalalu', label: 'Masa Lalu & Status (3)' },
    { id: 'wali', label: 'Wali & Keluarga (4)' },
    { id: 'karier', label: 'Karier & Aktualisasi (4)' },
    { id: 'kesehatan', label: 'Kesehatan (2)' },
  ];

  const toggleNote = (id: string) => {
    setOpenNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Question ratings statistics
  const stats = useMemo(() => {
    let green = 0;
    let red = 0;
    let unrated = 0;

    const ratings = candidate.questionRatings || {};
    QUESTIONS_DATA.forEach((q) => {
      const r = ratings[q.id]?.rating || 'unrated';
      if (r === 'green') green++;
      else if (r === 'red') red++;
      else unrated++;
    });

    return { green, red, unrated, total: QUESTIONS_DATA.length };
  }, [candidate.questionRatings]);

  const filteredQuestions = useMemo(() => {
    const ratings = candidate.questionRatings || {};

    return QUESTIONS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Status filter
      const currentRating = ratings[item.id]?.rating || 'unrated';
      if (selectedStatus !== 'all' && currentRating !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.purpose.toLowerCase().includes(q) ||
          item.greenFlagAnswer.toLowerCase().includes(q) ||
          item.redFlagAnswer.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedStatus, searchQuery, candidate.questionRatings]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Hero Banner */}
      <div className="bg-gradient-to-br from-white to-[#fff0f5] border border-[#fcc2d7] rounded-2xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              32 Soalan Ta'aruf Matang & Bedah Jawaban
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Panduan pertanyaan psikologis dan syariat untuk mengungkap karakter asli. Nilai jawaban calon apakah mencerminkan kedewasaan (Green Flag) atau tanda manipulasi (Red Flag).
            </p>
          </div>
        </div>

        {/* Real-time Tally Counters for Question Ratings */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#fcc2d7]/60">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-center">
            <span className="text-[10px] font-bold text-emerald-700 block">🟢 Green Flag</span>
            <span className="text-lg font-black text-emerald-800">{stats.green}</span>
            <span className="text-[9px] text-emerald-600 block">Jawaban Matang</span>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 text-center">
            <span className="text-[10px] font-bold text-rose-700 block">🔴 Red Flag</span>
            <span className="text-lg font-black text-rose-800">{stats.red}</span>
            <span className="text-[9px] text-rose-600 block">Jawaban Red Flag</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-center">
            <span className="text-[10px] font-bold text-slate-600 block">⚪ Belum Dinilai</span>
            <span className="text-lg font-black text-slate-700">{stats.unrated}</span>
            <span className="text-[9px] text-slate-500 block">Perlu Ditanyakan</span>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci pertanyaan, tujuan, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
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

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#d70f64] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <span className="text-slate-400 font-bold flex items-center gap-1 pl-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedStatus === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua (32)
          </button>
          <button
            onClick={() => setSelectedStatus('green')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedStatus === 'green'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            🟢 Green Flag ({stats.green})
          </button>
          <button
            onClick={() => setSelectedStatus('red')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedStatus === 'red'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            🔴 Red Flag ({stats.red})
          </button>
          <button
            onClick={() => setSelectedStatus('unrated')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedStatus === 'unrated'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            ⚪ Belum Dinilai ({stats.unrated})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {filteredQuestions.map((q) => {
          const isCopied = copiedId === q.id;
          const questionItem = (candidate.questionRatings || {})[q.id];
          const currentRating = questionItem?.rating || 'unrated';
          const currentNote = questionItem?.note || '';
          const isNoteOpen = openNotes[q.id] || !!currentNote;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border p-4 shadow-xs transition-all space-y-3 ${
                currentRating === 'green'
                  ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/15'
                  : currentRating === 'red'
                  ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/20'
                  : 'border-[#fcc2d7] hover:border-[#d70f64]/50'
              }`}
            >
              {/* Question Header & Category */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#fff0f5] text-[#d70f64] border border-[#fcc2d7] flex items-center justify-center font-black text-xs">
                    #{q.questionNumber}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {q.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Status Indicator Badge */}
                  {currentRating === 'green' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Green Flag
                    </span>
                  )}
                  {currentRating === 'red' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                      <AlertOctagon className="w-3 h-3 text-rose-600" />
                      Red Flag
                    </span>
                  )}
                  {currentRating === 'unrated' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Belum Dinilai
                    </span>
                  )}

                  {/* Quick Copy Button */}
                  <button
                    onClick={() => handleCopy(q.id, q.question)}
                    className="btn-3d-secondary flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg text-[#d70f64]"
                    title="Salin teks pertanyaan"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Soalan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bold Question Text in Plus Jakarta Sans */}
              <div className="bg-[#fff2f7] p-3 rounded-xl border border-[#fcc2d7]">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  "{q.question}"
                </h3>
              </div>

              {/* 🎯 Tujuan Psikologi & Syarak */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 font-black text-slate-800 mb-0.5">
                  <Target className="w-3.5 h-3.5 text-[#d70f64]" />
                  <span>Tujuan Psikologis & Syar'i:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {q.purpose}
                </p>
              </div>

              {/* Grid: Green Flag Answer vs Red Flag Answer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* 🟢 Tanda Jawapan Matang */}
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-black text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>🟢 Indikator Jawaban Matang:</span>
                  </div>
                  <p className="text-emerald-950 leading-relaxed font-medium">
                    {q.greenFlagAnswer}
                  </p>
                </div>

                {/* 🔴 Tanda Jawapan Manipulatif */}
                <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-black text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>🔴 Indikator Manipulatif / Red Flag:</span>
                  </div>
                  <p className="text-rose-950 leading-relaxed font-medium">
                    {q.redFlagAnswer}
                  </p>
                </div>
              </div>

              {/* 💡 Tips Observasi Bahasa Tubuh (Pro-tip) */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-amber-800 block text-[11px]">
                    Tips Observasi Lapangan (Pro-Tip):
                  </span>
                  <p className="text-amber-900 leading-relaxed font-medium">
                    {q.proTip}
                  </p>
                </div>
              </div>

              {/* 3D Tactile Rating Action Buttons for Candidate's Answer */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Evaluasi Jawaban Calon:</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Pilih berdasarkan jawaban nyata yang ia berikan
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Green Flag Button */}
                  <button
                    onClick={() => onUpdateQuestionRating(q.id, 'green', currentNote)}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 select-none ${
                      currentRating === 'green'
                        ? 'bg-emerald-600 text-white border-b-[3.5px] border-emerald-800 shadow-md ring-2 ring-emerald-400 ring-offset-1 active:translate-y-0.5 active:border-b-[1px]'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 border-b-[3.5px] border-b-emerald-400 active:translate-y-0.5 active:border-b-[1px]'
                    }`}
                  >
                    <span>🟢</span>
                    <span>Green Flag</span>
                  </button>

                  {/* Red Flag Button */}
                  <button
                    onClick={() => onUpdateQuestionRating(q.id, 'red', currentNote)}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 select-none ${
                      currentRating === 'red'
                        ? 'bg-rose-600 text-white border-b-[3.5px] border-rose-800 shadow-md ring-2 ring-rose-400 ring-offset-1 active:translate-y-0.5 active:border-b-[1px]'
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 border-b-[3.5px] border-b-rose-400 active:translate-y-0.5 active:border-b-[1px]'
                    }`}
                  >
                    <span>🔴</span>
                    <span>Red Flag</span>
                  </button>

                  {/* Reset/Unrated Button */}
                  <button
                    onClick={() => onUpdateQuestionRating(q.id, 'unrated', currentNote)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 select-none ${
                      currentRating === 'unrated'
                        ? 'bg-slate-700 text-white border-b-[3.5px] border-slate-900 active:translate-y-0.5 active:border-b-[1px]'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 border-b-[3.5px] border-b-slate-300 active:translate-y-0.5 active:border-b-[1px]'
                    }`}
                  >
                    <span>⚪</span>
                    <span>Reset</span>
                  </button>
                </div>

                {/* Personal Notes for Candidate's Answer */}
                <div className="pt-1">
                  {!isNoteOpen ? (
                    <button
                      onClick={() => toggleNote(q.id)}
                      className="text-[11px] font-bold text-[#d70f64] hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{currentNote ? 'Lihat/Edit Catatan Jawaban Calon' : '+ Catat Respon/Jawaban Nyata Calon'}</span>
                    </button>
                  ) : (
                    <div className="space-y-1 animate-in fade-in duration-150 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Catatan Kata-kata / Respon Calon:</span>
                        <button
                          onClick={() => toggleNote(q.id)}
                          className="text-[#d70f64] font-bold hover:underline"
                        >
                          Tutup
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Saat ditanya nomor ini, dia menjawab jujur dan tenang tanpa bersikap defensif..."
                        value={currentNote}
                        onChange={(e) => onUpdateQuestionRating(q.id, currentRating, e.target.value)}
                        className="w-full bg-slate-50 border border-[#fcc2d7] rounded-xl p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d70f64]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
