import React from 'react';
import { 
  X, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-[#fcc2d7] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#fcc2d7]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Panduan Penggunaan Aplikasi
              </h3>
              <p className="text-xs text-slate-500">
                Prinsip Objektif Menilai Calon Pasangan Hidup
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

        {/* Content sections */}
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          {/* Section 1: Falsafah */}
          <div className="p-3.5 rounded-2xl bg-[#fff0f5] border border-[#fcc2d7] space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-[#d70f64] text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1. Falsafah: "Kenali Tindakan, Bukan Kata-Kata"</span>
            </div>
            <p className="font-medium text-slate-800">
              Kata-kata manis dan janji masa depan sangat murah untuk diucapkan. Namun karakter sejati seorang pria diuji melalui kebiasaan harian, disiplin waktu, etos kerja, cara mengelola kemarahan, dan rasa takutnya kepada Allah saat sendirian.
            </p>
          </div>

          {/* Section 2: Waspada Love-Bombing */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-rose-800 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>2. Waspadai Taktik Love-Bombing</span>
            </div>
            <p className="font-medium text-rose-950">
              Love-bombing adalah manipulasi psikologis di mana calon menghujani Anda dengan sanjungan berlebihan, hadiah mahal mendadak, dan desakan menikah sangat cepat (dalam 1-2 minggu) sebelum saling mengenal. Tujuannya adalah melumpuhkan logika kritis Anda. Beri jeda waktu minimal 30 hari untuk melihat konsistensi aslinya.
            </p>
          </div>

          {/* Section 3: Khusus Wanita Matang & Single Mom */}
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-purple-800 text-sm">
              <Users className="w-4 h-4 text-purple-600" />
              <span>3. Khusus Wanita Matang & Ibu Tunggal (Single Mom)</span>
            </div>
            <ul className="space-y-1 list-disc pl-4 font-medium text-purple-950">
              <li>
                <strong>Perlindungan Anak:</strong> Pria yang tulus wajib memuliakan dan menerima anak Anda seutuhnya, bukan menganggapnya beban.
              </li>
              <li>
                <strong>Kemandirian Finansial:</strong> Jangan pernah meminjamkan uang atau aset kepada calon selama masa perkenalan.
              </li>
              <li>
                <strong>Verifikasi Dokumen:</strong> Minta bukti sah surat cerai resmi dari pengadilan agama jika calon berstatus duda.
              </li>
            </ul>
          </div>

          {/* Section 4: Cara Penggunaan 5 Tab */}
          <div className="space-y-2">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">
              Cara Menggunakan 5 Fitur Utama:
            </h4>
            <div className="space-y-1.5 pl-1">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">1. Tab Checklist:</span>
                <span>Isi 25 kriteria tindakan harian dengan Green Flag atau Red Flag berdasarkan bukti nyata.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">2. Tab 30 Hari:</span>
                <span>Jalankan panduan 4 fase hari demi hari, amati ujian lapangan, dan salin pertanyaan ta'aruf harian.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">3. Tab Analisis:</span>
                <span>Lihat skor keserasian objektif dan status lampu lalu lintas untuk keputusan final.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">4. Tab Jurnal:</span>
                <span>Catat fakta kejadian di hari kejadian agar tidak dimanipulasi oleh rayuan penenang.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#d70f64]">5. Tab Soalan:</span>
                <span>Gunakan 32 pertanyaan berbobot untuk membedah pola pikir finansial dan emosi calon.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full btn-3d-primary py-2.5 rounded-xl text-xs font-bold text-white text-center"
          >
            Tutup Panduan & Mulai Menilai
          </button>
        </div>
      </div>
    </div>
  );
};
