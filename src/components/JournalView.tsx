import React, { useState, useMemo } from 'react';
import { Candidate, JournalEntry, JournalFlagType } from '../types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit2, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  ShieldAlert,
  Save,
  X
} from 'lucide-react';

interface JournalViewProps {
  candidate: Candidate;
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'candidateId'>) => void;
  onUpdateEntry: (id: string, entry: Partial<JournalEntry>) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  candidate,
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<JournalFlagType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formDate, setFormDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formFlagType, setFormFlagType] = useState<JournalFlagType>('neutral');

  // Filter entries belonging to active candidate
  const candidateEntries = useMemo(() => {
    return entries.filter(e => e.candidateId === candidate.id);
  }, [entries, candidate.id]);

  const filteredEntries = useMemo(() => {
    return candidateEntries.filter(e => {
      if (filterType !== 'all' && e.flagType !== filterType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q);
      }
      return true;
    });
  }, [candidateEntries, filterType, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    if (editingId) {
      onUpdateEntry(editingId, {
        date: formDate,
        title: formTitle.trim(),
        content: formContent.trim(),
        flagType: formFlagType,
      });
      setEditingId(null);
    } else {
      onAddEntry({
        date: formDate,
        title: formTitle.trim(),
        content: formContent.trim(),
        flagType: formFlagType,
      });
    }

    // Reset
    setFormTitle('');
    setFormContent('');
    setFormFlagType('neutral');
    setShowAddForm(false);
  };

  const startEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setFormDate(entry.date);
    setFormTitle(entry.title);
    setFormContent(entry.content);
    setFormFlagType(entry.flagType);
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
    setFormFlagType('neutral');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Anti-Gaslighting Protection Banner */}
      <div className="bg-gradient-to-br from-white to-[#fff0f5] border border-[#fcc2d7] rounded-2xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#d70f64] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              Diari Lapangan & Perlindungan dari Manipulasi
            </h2>
            {/* Candidate quick profile info */}
            <div className="flex items-center gap-1.5 flex-wrap mt-1 text-[11px] font-bold">
              <span className="text-[#d70f64] font-black">{candidate.name}</span>
              {candidate.age && <span className="bg-white px-2 py-0.5 rounded-md border border-[#fcc2d7] text-slate-700">🎂 {candidate.age} Thn</span>}
              {candidate.maritalStatus && <span className="bg-white px-2 py-0.5 rounded-md border border-[#fcc2d7] text-[#d70f64]">💍 {candidate.maritalStatus}</span>}
              {candidate.occupation && <span className="bg-white px-2 py-0.5 rounded-md border border-[#fcc2d7] text-amber-800 max-w-[180px] truncate">💼 {candidate.occupation}</span>}
              {candidate.address && <span className="bg-white px-2 py-0.5 rounded-md border border-[#fcc2d7] text-slate-600 max-w-[180px] truncate">📍 {candidate.address}</span>}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Catat kejadian, ucapan, dan tindakan nyata calon saat memori masih segar. Rekaman fakta tertulis adalah perisai terkuat Anda dari manipulasi (gaslighting) atau rayuan yang memutarbalikkan kenyataan.
            </p>
          </div>
        </div>

        {/* Action Button: Add Note */}
        <div className="mt-3 pt-3 border-t border-[#fcc2d7]/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            Total Catatan untuk {candidate.name}: {candidateEntries.length}
          </span>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-3d-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Catat Kejadian Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Form: Add or Edit Entry */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-[#d70f64] p-4 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#d70f64]" />
              <span>{editingId ? 'Edit Catatan Observasi' : 'Tambah Catatan Fakta Baru'}</span>
            </h3>
            <button
              type="button"
              onClick={cancelForm}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Tanggal Kejadian:
              </label>
              <input
                type="date"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full bg-slate-50 border border-[#fcc2d7] rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Klasifikasi Indikator:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFormFlagType('green')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 border ${
                    formFlagType === 'green'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  🟢 Green Flag
                </button>
                <button
                  type="button"
                  onClick={() => setFormFlagType('red')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 border ${
                    formFlagType === 'red'
                      ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  🔴 Red Flag
                </button>
                <button
                  type="button"
                  onClick={() => setFormFlagType('neutral')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 border ${
                    formFlagType === 'neutral'
                      ? 'bg-slate-700 text-white border-slate-800 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ⚪ Netral
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Judul Insiden / Peristiwa:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Reaksi saat pesanan makanan salah di kafe..."
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full bg-slate-50 border border-[#fcc2d7] rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Fakta Apa yang Terjadi (Objektif):
            </label>
            <textarea
              required
              rows={3}
              placeholder="Catat fakta apa yang dia katakan, bagaimana nada suaranya, bagaimana gestur tubuhnya, dan apa tindakan konkret yang diambil..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full bg-slate-50 border border-[#fcc2d7] rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={cancelForm}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-3d-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 text-white shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingId ? 'Simpan Perubahan' : 'Simpan Catatan'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari catatan jurnal atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua ({candidateEntries.length})
          </button>
          <button
            onClick={() => setFilterType('green')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'green'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            🟢 Green Flag
          </button>
          <button
            onClick={() => setFilterType('red')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'red'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            🔴 Red Flag
          </button>
          <button
            onClick={() => setFilterType('neutral')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'neutral'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            ⚪ Netral
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#fcc2d7] p-8 text-center">
            <BookOpen className="w-8 h-8 text-[#d70f64] mx-auto mb-2 opacity-50" />
            <h3 className="text-sm font-bold text-slate-800">Belum ada catatan jurnal observasi</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Mulailah merekam interaksi harian Anda bersama {candidate.name}. Hal-hal kecil adalah kunci karakter aslinya.
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-3 btn-3d-primary px-3 py-1.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Catatan Pertama</span>
              </button>
            )}
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className={`bg-white rounded-2xl border p-4 shadow-xs transition-all ${
                entry.flagType === 'green'
                  ? 'border-emerald-300 ring-1 ring-emerald-200'
                  : entry.flagType === 'red'
                  ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/15'
                  : 'border-[#fcc2d7]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    entry.flagType === 'green'
                      ? 'bg-emerald-100 text-emerald-800'
                      : entry.flagType === 'red'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {entry.flagType === 'green' && '🟢 Green Flag'}
                    {entry.flagType === 'red' && '🔴 Red Flag'}
                    {entry.flagType === 'neutral' && '⚪ Netral'}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </span>
                </div>

                {/* Edit & Delete actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(entry)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                    title="Edit catatan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Hapus catatan jurnal ini?')) {
                        onDeleteEntry(entry.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Hapus catatan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {entry.title}
              </h4>

              <p className="text-xs text-slate-700 mt-1.5 leading-relaxed whitespace-pre-wrap font-medium">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
