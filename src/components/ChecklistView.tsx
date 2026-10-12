import React, { useState, useMemo } from 'react';
import { Criterion, Candidate, RatingType, CriterionCategory } from '../types';
import { CRITERIA_DATA } from '../data/criteriaData';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Wallet, 
  Users2, 
  MessageSquare, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Edit3,
  Eye,
  Info
} from 'lucide-react';

interface ChecklistViewProps {
  candidate: Candidate;
  onUpdateRating: (criterionId: string, rating: RatingType, note?: string) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  candidate,
  onUpdateRating,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CriterionCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<RatingType | 'all'>('all');
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setOpenNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter criteria
  const filteredCriteria = useMemo(() => {
    return CRITERIA_DATA.filter(item => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Status match
      const currentRating = candidate.checklist[item.id]?.rating || 'unrated';
      if (selectedStatus !== 'all' && currentRating !== selectedStatus) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchAction = item.actionEvidencePrompt.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchAction;
      }

      return true;
    });
  }, [selectedCategory, selectedStatus, searchQuery, candidate.checklist]);

  // Statistics
  const stats = useMemo(() => {
    let green = 0;
    let red = 0;
    let unrated = 0;

    CRITERIA_DATA.forEach(c => {
      const r = candidate.checklist[c.id]?.rating || 'unrated';
      if (r === 'green') green++;
      else if (r === 'red') red++;
      else unrated++;
    });

    return { green, red, unrated, total: CRITERIA_DATA.length };
  }, [candidate.checklist]);

  const getCategoryIcon = (category: CriterionCategory) => {
    switch (category) {
      case 'sahsiah':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'kewangan':
        return <Wallet className="w-4 h-4 text-blue-600" />;
      case 'keluarga':
        return <Users2 className="w-4 h-4 text-purple-600" />;
      case 'komunikasi':
        return <MessageSquare className="w-4 h-4 text-[#d70f64]" />;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Intro Hero Card in Pink Panda Theme */}
      <div className="bg-gradient-to-br from-[#d70f64] via-[#e2136e] to-[#ff2b85] text-white rounded-3xl p-5 shadow-lg shadow-[#d70f64]/25">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center flex-shrink-0 shadow-inner border border-white/30">
            <Eye className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                25 Kriteria Penilaian Tindakan Nyata
              </h2>
            </div>
            {/* Candidate quick profile info */}
            <div className="flex items-center gap-1.5 flex-wrap mt-1 text-[11px] font-bold">
              <span className="bg-white/90 text-[#d70f64] px-2 py-0.5 rounded-md font-black shadow-2xs">
                👤 {candidate.name}
              </span>
              {candidate.age && (
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-md border border-white/30">
                  🎂 {candidate.age} Tahun
                </span>
              )}
              {candidate.maritalStatus && (
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-md border border-white/30">
                  💍 {candidate.maritalStatus}
                </span>
              )}
              {candidate.occupation && (
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-md border border-white/30 max-w-[200px] truncate">
                  💼 {candidate.occupation}
                </span>
              )}
              {candidate.address && (
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-md border border-white/30 max-w-[200px] truncate">
                  📍 {candidate.address}
                </span>
              )}
            </div>
            <p className="text-xs text-white/90 mt-1 leading-relaxed font-medium">
              Nilai calon berdasarkan bukti perbuatan harian yang Anda saksikan langsung di lapangan. Jangan terbuai oleh janji manis atau ayat rayuan di WhatsApp.
            </p>
          </div>
        </div>

        {/* Real-time Tally Counters */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-white/20">
          <div className="bg-white/95 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[10px] font-black text-emerald-700 block">🟢 Green Flag</span>
            <span className="text-lg font-black text-emerald-800">{stats.green}</span>
            <span className="text-[9px] text-emerald-600 block font-bold">Tindakan Matang</span>
          </div>

          <div className="bg-white/95 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[10px] font-black text-rose-700 block">🔴 Red Flag</span>
            <span className="text-lg font-black text-rose-800">{stats.red}</span>
            <span className="text-[9px] text-rose-600 block font-bold">Tanda Bahaya</span>
          </div>

          <div className="bg-white/95 rounded-2xl p-2.5 text-center shadow-sm">
            <span className="text-[10px] font-black text-slate-600 block">⚪ Belum Dinilai</span>
            <span className="text-lg font-black text-slate-800">{stats.unrated}</span>
            <span className="text-[9px] text-slate-500 block font-bold">Perlu Observasi</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kriteria, kata kunci, atau situasi ujian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64] focus:border-transparent transition shadow-xs"
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#d70f64] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
            }`}
          >
            Semua Dimensi (25)
          </button>
          <button
            onClick={() => setSelectedCategory('sahsiah')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'sahsiah'
                ? 'bg-[#d70f64] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
            }`}
          >
            Sahsiah & Agama (7)
          </button>
          <button
            onClick={() => setSelectedCategory('kewangan')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'kewangan'
                ? 'bg-[#d70f64] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
            }`}
          >
            Finansial & Nafkah (6)
          </button>
          <button
            onClick={() => setSelectedCategory('keluarga')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'keluarga'
                ? 'bg-[#d70f64] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
            }`}
          >
            Keluarga & Anak (6)
          </button>
          <button
            onClick={() => setSelectedCategory('komunikasi')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'komunikasi'
                ? 'bg-[#d70f64] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-[#fcc2d7] hover:bg-[#fff0f5]'
            }`}
          >
            Komunikasi & Emosi (6)
          </button>
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
            Semua
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

      {/* Criteria Cards List */}
      <div className="space-y-3">
        {filteredCriteria.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#fcc2d7] p-8 text-center">
            <Info className="w-8 h-8 text-[#d70f64] mx-auto mb-2 opacity-50" />
            <h3 className="text-sm font-bold text-slate-800">Tidak ada kriteria yang sesuai filter</h3>
            <p className="text-xs text-slate-500 mt-1">
              Coba ganti kata kunci pencarian atau reset filter dimensi dan status.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-3 btn-3d-secondary px-3 py-1.5 rounded-lg text-xs font-bold text-[#d70f64]"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          filteredCriteria.map((item) => {
            const currentRating = candidate.checklist[item.id]?.rating || 'unrated';
            const currentNote = candidate.checklist[item.id]?.note || '';
            const isNoteOpen = openNotes[item.id] || !!currentNote;
            const criterionNumber = CRITERIA_DATA.findIndex(c => c.id === item.id) + 1;

            return (
              <div
                key={item.id}
                className={`rounded-3xl border-2 transition-all duration-200 p-4 sm:p-5 shadow-sm ${
                  currentRating === 'green'
                    ? 'bg-gradient-to-br from-[#fff2f7] via-[#f0fdf4] to-white border-emerald-400 ring-2 ring-emerald-200 shadow-emerald-50'
                    : currentRating === 'red'
                    ? 'bg-gradient-to-br from-[#fff2f7] via-[#fff1f2] to-white border-rose-400 ring-2 ring-rose-200 shadow-rose-50'
                    : 'bg-gradient-to-br from-[#fff2f7] via-[#fff8fa] to-white border-[#fcc2d7] hover:border-[#d70f64] shadow-[#d70f64]/5'
                }`}
              >
                {/* Header: Number Badge, Category Badge & Status Indicator */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                      #{criterionNumber}
                    </span>
                    <span className="p-1 rounded-lg bg-[#fff0f5] border border-[#fcc2d7] text-[#d70f64]">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-[11px] font-black text-[#d70f64] bg-[#ffe6f1] border border-[#fcc2d7] px-2 py-0.5 rounded-lg uppercase tracking-wider">
                      {item.categoryTitle}
                    </span>
                  </div>

                  {/* Rating Status Badge */}
                  {currentRating === 'green' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Green Flag
                    </span>
                  )}
                  {currentRating === 'red' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse shadow-2xs">
                      <AlertOctagon className="w-3 h-3 text-rose-600" />
                      Red Flag
                    </span>
                  )}
                  {currentRating === 'unrated' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-500 border border-[#fcc2d7]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Belum Dinilai
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Ujian Bukti Tindakan Nyata in Pink Panda Styling */}
                <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#ffeef5] to-[#fff5f9] border-2 border-[#fcc2d7] shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-[#d70f64] uppercase tracking-wide">
                    <Eye className="w-3.5 h-3.5 text-[#d70f64]" />
                    <span>Ujian Bukti Tindakan Nyata (Lapangan):</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-relaxed italic">
                    "{item.actionEvidencePrompt}"
                  </p>
                </div>

                {/* 3D Tactile Rating Action Buttons */}
                <div className="mt-3.5 pt-3 border-t border-[#fcc2d7]/50">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Green Flag Button */}
                    <button
                      onClick={() => onUpdateRating(item.id, 'green', currentNote)}
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
                      onClick={() => onUpdateRating(item.id, 'red', currentNote)}
                      className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 select-none ${
                        currentRating === 'red'
                          ? 'bg-rose-600 text-white border-b-[3.5px] border-rose-800 shadow-md ring-2 ring-rose-400 ring-offset-1 active:translate-y-0.5 active:border-b-[1px]'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 border-b-[3.5px] border-b-rose-400 active:translate-y-0.5 active:border-b-[1px]'
                      }`}
                    >
                      <span>🔴</span>
                      <span>Red Flag</span>
                    </button>

                    {/* Unrated Button */}
                    <button
                      onClick={() => onUpdateRating(item.id, 'unrated', currentNote)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 select-none ${
                        currentRating === 'unrated'
                          ? 'bg-slate-700 text-white border-b-[3.5px] border-slate-900 active:translate-y-0.5 active:border-b-[1px]'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-[#fcc2d7] border-b-[3.5px] border-b-[#f497be] active:translate-y-0.5 active:border-b-[1px]'
                      }`}
                    >
                      <span>⚪</span>
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Personal Evidence Notes (Expandable) */}
                <div className="mt-2.5">
                  {!isNoteOpen ? (
                    <button
                      onClick={() => toggleNote(item.id)}
                      className="text-[11px] font-black text-[#d70f64] hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{currentNote ? 'Lihat/Edit Catatan Bukti' : '+ Tambah Catatan Bukti Lapangan'}</span>
                    </button>
                  ) : (
                    <div className="space-y-1 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Catatan Fakta Kejadian Sebenarnya:</span>
                        <button
                          onClick={() => toggleNote(item.id)}
                          className="text-[#d70f64] font-black hover:underline"
                        >
                          Tutup
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Tanggal 14 Okt, saat di restoran dia membentak pelayan karena es teh telat 5 menit..."
                        value={currentNote}
                        onChange={(e) => onUpdateRating(item.id, currentRating, e.target.value)}
                        className="w-full bg-white border-2 border-[#fcc2d7] rounded-xl p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
