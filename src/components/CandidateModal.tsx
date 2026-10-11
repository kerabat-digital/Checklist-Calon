import React, { useState } from 'react';
import { Candidate } from '../types';
import { 
  Users, 
  X, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Check, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  activeCandidateId: string;
  onSelectCandidate: (id: string) => void;
  onAddCandidate: (name: string) => void;
  onRenameCandidate: (id: string, newName: string) => void;
  onDeleteCandidate: (id: string) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  isOpen,
  onClose,
  candidates,
  activeCandidateId,
  onSelectCandidate,
  onAddCandidate,
  onRenameCandidate,
  onDeleteCandidate,
}) => {
  const [newCandidateName, setNewCandidateName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidateName.trim()) return;
    onAddCandidate(newCandidateName.trim());
    setNewCandidateName('');
  };

  const startRename = (candidate: Candidate) => {
    setEditingId(candidate.id);
    setEditingName(candidate.name);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      onRenameCandidate(id, editingName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl border border-[#fcc2d7] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#fcc2d7]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Kelola Calon Pasangan
              </h3>
              <p className="text-xs text-slate-500">
                Daftar & Penilaian Berbagai Calon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Add New Candidate */}
        <form onSubmit={handleAdd} className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Tambah Profil Calon Baru:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Contoh: Calon B / Mas Fulan..."
              value={newCandidateName}
              onChange={(e) => setNewCandidateName(e.target.value)}
              className="flex-1 bg-slate-50 border border-[#fcc2d7] rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
            />
            <button
              type="submit"
              disabled={!newCandidateName.trim()}
              className="btn-3d-primary px-3.5 py-2 rounded-xl text-xs font-bold disabled:opacity-50 flex items-center gap-1 text-white shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </form>

        {/* Candidates List */}
        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Daftar Calon Tersimpan ({candidates.length})
          </h4>

          {candidates.map((c) => {
            const isActive = c.id === activeCandidateId;
            const isEditing = editingId === c.id;

            // count ratings
            const criteriaCount = Object.keys(c.checklist || {}).length;
            const daysCount = Object.keys(c.dayRatings || {}).length;

            return (
              <div
                key={c.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                  isActive
                    ? 'border-[#d70f64] bg-[#fff0f5] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-[#fcc2d7]'
                }`}
              >
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 bg-white border border-[#d70f64] rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveRename(c.id)}
                      className="p-1 rounded-lg bg-emerald-600 text-white"
                      title="Simpan nama"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onSelectCandidate(c.id);
                    }}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs truncate">
                        {c.name}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-black text-[#d70f64] bg-white px-1.5 py-0.2 rounded-md border border-[#fcc2d7]">
                          Aktif
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      {criteriaCount}/25 Kriteria • {daysCount}/30 Hari dinilai
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {!isEditing && (
                    <button
                      onClick={() => startRename(c)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      title="Ubah nama calon"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {candidates.length > 1 && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Yakin ingin menghapus seluruh data penilaian untuk "${c.name}"?`)) {
                          onDeleteCandidate(c.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Hapus calon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full btn-3d-secondary py-2.5 rounded-xl text-xs font-bold text-slate-700 text-center"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
