import React, { useState } from 'react';
import { exportBackupData, importBackupData } from '../utils/storage';
import { 
  DownloadCloud, 
  UploadCloud, 
  X, 
  ShieldCheck, 
  FileJson, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  onDataRestored,
}) => {
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    exportBackupData();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setImportStatus(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackupData(content);
      setIsProcessing(false);
      setImportStatus(res);
      if (res.success) {
        setTimeout(() => {
          onDataRestored();
          onClose();
        }, 1200);
      }
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setImportStatus({ success: false, message: 'Gagal membaca berkas berkas.' });
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-[#fcc2d7] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#fcc2d7]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Cadangkan & Pulihkan Data
              </h3>
              <p className="text-xs text-slate-500">
                Penyimpanan Aman Berkas JSON Lokal
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

        {/* Privacy Note */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">
            Data pribadi penilaian Anda 100% tersimpan di perangkat ini. Tidak ada server eksternal yang membaca isi catatan Anda.
          </p>
        </div>

        {/* Section 1: Export Data */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
            <FileJson className="w-4 h-4 text-[#d70f64]" />
            <span>Ekspor / Unduh Cadangan</span>
          </h4>
          <p className="text-xs text-slate-600">
            Simpan seluruh data calon, kriteria checklist, progres 30 hari, dan jurnal ke dalam berkas JSON di HP/komputer Anda.
          </p>
          <button
            onClick={handleExport}
            className="btn-3d-primary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white shadow-xs"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Unduh Berkas Cadangan (.json)</span>
          </button>
        </div>

        {/* Section 2: Import Data */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
            <UploadCloud className="w-4 h-4 text-blue-600" />
            <span>Pulihkan Data dari Berkas</span>
          </h4>
          <p className="text-xs text-slate-600">
            Pilih berkas cadangan JSON yang pernah Anda unduh sebelumnya untuk mengembalikan seluruh catatan evaluasi.
          </p>

          <label className="btn-3d-secondary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-slate-800 cursor-pointer text-center">
            <UploadCloud className="w-4 h-4 text-slate-600" />
            <span>{isProcessing ? 'Memproses Berkas...' : 'Pilih Berkas Cadangan (.json)'}</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Status Message */}
        {importStatus && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            importStatus.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
          }`}>
            {importStatus.success ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
