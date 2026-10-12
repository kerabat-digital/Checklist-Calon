import React, { useState } from 'react';
import { Candidate } from '../types';
import { 
  Users, 
  X, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Check, 
  MapPin, 
  Calendar, 
  Heart, 
  Briefcase,
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export interface CandidateProfileFormData {
  name: string;
  age?: string;
  maritalStatus?: string;
  address?: string;
  occupation?: string;
}

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  activeCandidateId: string;
  onSelectCandidate: (id: string) => void;
  onAddCandidate: (data: CandidateProfileFormData) => void;
  onUpdateCandidate: (id: string, data: Partial<CandidateProfileFormData>) => void;
  onDeleteCandidate: (id: string) => void;
}

const MARITAL_STATUS_OPTIONS = [
  'Lajang',
  'Duda (Tanpa Anak)',
  'Duda (Ada Anak)',
  'Lain-lain',
];

export const CandidateModal: React.FC<CandidateModalProps> = ({
  isOpen,
  onClose,
  candidates,
  activeCandidateId,
  onSelectCandidate,
  onAddCandidate,
  onUpdateCandidate,
  onDeleteCandidate,
}) => {
  // New candidate form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Lajang');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [isAddingOpen, setIsAddingOpen] = useState(false);

  // Edit candidate form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editMaritalStatus, setEditMaritalStatus] = useState('Lajang');
  const [editAddress, setEditAddress] = useState('');
  const [editOccupation, setEditOccupation] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddCandidate({
      name: name.trim(),
      age: age.trim(),
      maritalStatus: maritalStatus.trim(),
      address: address.trim(),
      occupation: occupation.trim(),
    });

    // Reset
    setName('');
    setAge('');
    setMaritalStatus('Lajang');
    setAddress('');
    setOccupation('');
    setIsAddingOpen(false);
  };

  const startEdit = (c: Candidate) => {
    setEditingId(c.id);
    setEditName(c.name || '');
    setEditAge(c.age || '');
    setEditMaritalStatus(c.maritalStatus || 'Lajang');
    setEditAddress(c.address || '');
    setEditOccupation(c.occupation || '');
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;

    onUpdateCandidate(id, {
      name: editName.trim(),
      age: editAge.trim(),
      maritalStatus: editMaritalStatus.trim(),
      address: editAddress.trim(),
      occupation: editOccupation.trim(),
    });

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-[#fcc2d7] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#fcc2d7]/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Profil & Pilihan Calon
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Nama, Usia, Status Pernikahan, Domisili & Pekerjaan
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

        {/* Toggle / Add New Candidate Form */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff2f7] to-[#fff8fa] border-2 border-[#fcc2d7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-xs text-[#d70f64] uppercase tracking-wide">
              <UserPlus className="w-4 h-4" />
              <span>Tambah Calon Baru</span>
            </div>
            {!isAddingOpen && (
              <button
                type="button"
                onClick={() => setIsAddingOpen(true)}
                className="btn-3d-primary px-3 py-1 rounded-xl text-xs font-bold text-white shadow-2xs"
              >
                + Buka Formulir
              </button>
            )}
          </div>

          {isAddingOpen && (
            <form onSubmit={handleAdd} className="space-y-3 pt-1">
              {/* Row 1: Nama & Usia */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Nama Calon: <span className="text-[#d70f64]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Mas Fulan / Ahmad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#fcc2d7] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Usia (Tahun):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 32"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white border border-[#fcc2d7] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
                  />
                </div>
              </div>

              {/* Row 2: Status Pernikahan */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Status Pernikahan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {MARITAL_STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMaritalStatus(opt)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition text-center border ${
                        maritalStatus === opt
                          ? 'bg-[#d70f64] text-white border-[#d70f64] shadow-xs'
                          : 'bg-white text-slate-700 border-[#fcc2d7] hover:bg-[#fff0f5]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Alamat / Domisili & Pekerjaan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Alamat / Kota Domisili:
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta Selatan / Bandung"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Pekerjaan / Profesi:
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Contoh: Pegawai BUMN / Pengusaha"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full bg-white border border-[#fcc2d7] rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d70f64]"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="btn-3d-primary px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50 text-white shadow-xs"
                >
                  Simpan Calon
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Saved Candidates List */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Daftar Calon Tersimpan ({candidates.length})</span>
            <span className="text-[10px] text-slate-400 font-semibold lowercase">
              klik untuk pilih calon aktif
            </span>
          </h4>

          {candidates.map((c) => {
            const isActive = c.id === activeCandidateId;
            const isEditing = editingId === c.id;

            // Rating tallies
            const criteriaCount = Object.keys(c.checklist || {}).length;
            const daysCount = Object.keys(c.dayRatings || {}).length;

            return (
              <div
                key={c.id}
                className={`p-3.5 rounded-2xl border-2 transition-all ${
                  isActive
                    ? 'border-[#d70f64] bg-gradient-to-br from-[#fff2f7] to-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-[#fcc2d7]'
                }`}
              >
                {isEditing ? (
                  /* Edit Form */
                  <div className="space-y-2.5 py-1">
                    <div className="flex items-center justify-between text-xs font-black text-[#d70f64]">
                      <span>Edit Profil Calon:</span>
                      <button
                        onClick={cancelEdit}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-600 block">Nama Calon:</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-slate-50 border border-[#fcc2d7] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block">Usia:</label>
                        <input
                          type="text"
                          placeholder="Cth: 32"
                          value={editAge}
                          onChange={(e) => setEditAge(e.target.value)}
                          className="w-full bg-slate-50 border border-[#fcc2d7] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 block mb-1">Status Pernikahan:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                        {MARITAL_STATUS_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setEditMaritalStatus(opt)}
                            className={`py-1 px-1.5 rounded-lg text-[10px] font-bold border ${
                              editMaritalStatus === opt
                                ? 'bg-[#d70f64] text-white border-[#d70f64]'
                                : 'bg-white text-slate-700 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block">Alamat / Domisili:</label>
                        <input
                          type="text"
                          placeholder="Cth: Jakarta Selatan"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          className="w-full bg-slate-50 border border-[#fcc2d7] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block">Pekerjaan / Profesi:</label>
                        <input
                          type="text"
                          placeholder="Cth: Dokter / Software Engineer"
                          value={editOccupation}
                          onChange={(e) => setEditOccupation(e.target.value)}
                          className="w-full bg-slate-50 border border-[#fcc2d7] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      <button
                        onClick={cancelEdit}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleSaveEdit(c.id)}
                        className="btn-3d-primary px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Simpan Perubahan</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Candidate Summary Card */
                  <div className="flex items-start justify-between gap-2">
                    <div
                      onClick={() => onSelectCandidate(c.id)}
                      className="flex-1 cursor-pointer min-w-0 space-y-1.5"
                    >
                      {/* Name & Active Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-slate-900 text-sm truncate">
                          {c.name}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-black text-white bg-[#d70f64] px-2 py-0.2 rounded-full shadow-2xs">
                            Aktif Dinilai
                          </span>
                        )}
                      </div>

                      {/* Profile details pills (Usia, Status, Alamat) */}
                      <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                        {/* Status Pernikahan Pill */}
                        {c.maritalStatus && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold bg-[#fff0f5] text-[#d70f64] border border-[#fcc2d7]">
                            <Heart className="w-3 h-3 text-[#d70f64]" />
                            <span>{c.maritalStatus}</span>
                          </span>
                        )}

                        {/* Usia Pill */}
                        {c.age && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span>{c.age} Tahun</span>
                          </span>
                        )}

                        {/* Pekerjaan Pill */}
                        {c.occupation && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold bg-amber-50 text-amber-900 border border-amber-200 max-w-[170px] truncate">
                            <Briefcase className="w-3 h-3 text-amber-700 flex-shrink-0" />
                            <span className="truncate">{c.occupation}</span>
                          </span>
                        )}

                        {/* Alamat Pill */}
                        {c.address && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-700 border border-slate-200 max-w-[180px] truncate">
                            <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{c.address}</span>
                          </span>
                        )}
                      </div>

                      {/* Rating Progress */}
                      <span className="text-[10px] text-slate-500 font-medium block">
                        {criteriaCount}/25 Kriteria • {daysCount}/30 Hari dinilai
                      </span>
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => startEdit(c)}
                        className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                        title="Edit profil calon"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {candidates.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus seluruh profil dan penilaian untuk "${c.name}"?`)) {
                              onDeleteCandidate(c.id);
                            }
                          }}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Hapus calon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
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
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
