import React, { useState } from 'react';
import { Candidate, ActiveTab } from '../types';
import { heroSunsetBase64 } from '../assets/hero_sunset.base64';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  CheckSquare, 
  Calendar, 
  HelpCircle, 
  BookOpen, 
  PieChart, 
  Users, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Info,
  Sparkles,
  Heart,
  Download,
  DownloadCloud,
  Smartphone,
  CheckCircle2,
  Share2,
  PlusSquare,
  X
} from 'lucide-react';

interface HomeViewProps {
  candidate: Candidate;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenCandidateModal: () => void;
  onOpenGuideModal: () => void;
  onOpenExportImportModal?: () => void;
  totalCriteriaRated: number;
  totalDaysCompleted: number;
  compatibilityScore: number;
  redFlagsCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  candidate,
  onNavigateTab,
  onOpenCandidateModal,
  onOpenGuideModal,
  onOpenExportImportModal,
  totalCriteriaRated,
  totalDaysCompleted,
  compatibilityScore,
  redFlagsCount,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // 5 Dedicated Menus requested by user
  const menuCards = [
    {
      id: 'checklist',
      tab: 'checklist' as ActiveTab,
      title: 'Checklist',
      subtitle: '25 Kriteria',
      desc: 'Evaluasi akhlak, komitmen, kesiapan finansial & kedewasaan emosional berbasis fakta.',
      icon: CheckSquare,
      status: `${totalCriteriaRated}/25 Dinilai`,
      badge: 'Langkah 1',
    },
    {
      id: '30hari',
      tab: '30hari' as ActiveTab,
      title: '30 Hari',
      subtitle: 'Kenali Calon',
      desc: 'Misi observasi harian untuk melihat respon karakter asli saat tertekan atau diuji waktu.',
      icon: Calendar,
      status: `Hari ${totalDaysCompleted}/30`,
      badge: 'Langkah 2',
    },
    {
      id: 'analisis',
      tab: 'analisis' as ActiveTab,
      title: 'Analisis',
      subtitle: 'Lihat Hasil',
      desc: 'Rangkuman skor objektif, sinyal bahaya (red flag) & format musyawarah wali.',
      icon: PieChart,
      status: `${compatibilityScore}% Kecocokan`,
      badge: redFlagsCount > 0 ? `${redFlagsCount} Red Flag` : 'Hasil Diagnosis',
    },
    {
      id: 'jurnal',
      tab: 'jurnal' as ActiveTab,
      title: 'Jurnal',
      subtitle: 'Catatan Fakta',
      desc: 'Dokumentasikan bukti tindakan dan pengamatan langsung tanpa ilusi kata-kata.',
      icon: BookOpen,
      status: 'Catatan Pribadi',
      badge: 'Bebas Bias',
    },
    {
      id: 'soalan',
      tab: 'soalan' as ActiveTab,
      title: 'Pertanyaan',
      subtitle: '32 Soalan Ta\'aruf',
      desc: 'Panduan dialog mendalam dengan tolok ukur jawaban jujur vs jawaban love-bombing.',
      icon: HelpCircle,
      status: '32 Soal Kritis',
      badge: 'Panduan Dialog',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 pb-8 animate-fadeIn max-w-xl mx-auto sm:max-w-2xl md:max-w-3xl">
      {/* ============================================================ */}
      {/* EDITORIAL HERO SECTION - PERSIS DENGAN REFERENSI GAMBAR      */}
      {/* Gambar latar sunset menutupi seluruh hero card               */}
      {/* ============================================================ */}
      <section className="relative rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-[0_12px_36px_rgba(66,42,56,0.12)] border border-[#EAD6BF]/80 bg-[#FFF9F5]">
        {/* Background Image: Muslimah sunset menutupi seluruh container */}
        <img
          src={heroSunsetBase64}
          alt="Muslimah menghadap pemandangan kota saat golden hour - Checklist Bakal Suami"
          className="absolute inset-0 w-full h-full object-cover object-[center_32%]"
          loading="eager"
          fetchPriority="high"
        />

        {/* Soft Luminous Warm Overlay: teks sangat jelas & kontras, foto tetap cerah & hangat */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5]/90 via-[#FFF9F5]/50 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#422A38]/30 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content: Bersih, Editorial & Terpusat seperti Gambar Referensi */}
        <div className="relative z-10 flex flex-col items-center justify-between min-h-[460px] sm:min-h-[500px] md:min-h-[530px] px-6 pt-7 pb-8 sm:px-8 sm:pt-9 sm:pb-10 text-center">
          {/* Headline Kecil (Poin 3) */}
          <p className="text-xs sm:text-sm font-semibold text-[#422A38] tracking-wide text-center">
            Pilih yang Siap, Bukan yang Sekadar Pandai Berjanji.
          </p>

          {/* Judul Utama Besar Tipografi Serif Elegan (Poin 4 & 5) */}
          <div className="flex flex-col items-center my-auto pt-2 pb-3">
            <h1 className="font-serif-hero text-center leading-[1.08] mb-2.5">
              <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-[#422A38] tracking-tight">
                Checklist
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl italic font-semibold text-[#d70f64] mt-0.5">
                Bakal Suami
              </span>
            </h1>

            {/* Subtitle (Poin 5) */}
            <p className="text-xs sm:text-sm md:text-base font-medium text-[#422A38]/90 tracking-wide max-w-xs sm:max-w-sm mb-7">
              Kenali Tindakan, Bukan Sekadar Kata-Kata
            </p>

            {/* Tombol Utama Berbentuk Pill - Pink Panda #D70F64 (Poin 6) */}
            <button
              onClick={() => onNavigateTab('checklist')}
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-white font-bold text-sm sm:text-base bg-[#d70f64] hover:bg-[#bf0d58] active:bg-[#a80b4d] active:scale-95 shadow-[0_12px_28px_rgba(215,15,100,0.45)] border border-[#ff2b85]/40 transition-all duration-200 cursor-pointer"
            >
              <span>Mulai Penilaian Saya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Ruang bawah agar proporsi hero seimbang */}
          <div className="h-2" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5 MENU CARD DALAM GRID DUA KOLOM (Persis Referensi Gambar)   */}
      {/* Card putih/ivory, rounded, outline dusty rose, shadow tipis   */}
      {/* ============================================================ */}
      <section className="space-y-2.5">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {menuCards.map((item, idx) => {
            const Icon = item.icon;
            // 5th card spans 2 columns to complete the 2-column grid gracefully
            const isLastSingle = idx === 4;

            return (
              <div
                key={item.id}
                onClick={() => onNavigateTab(item.tab)}
                className={`group cursor-pointer bg-[#FFF9F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#EAD6BF]/80 hover:border-[#d70f64] shadow-[0_2px_12px_rgba(66,42,56,0.04)] hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                  isLastSingle ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Top Bar inside Card: Outline Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#fff0f5] border border-[#fcc2d7] text-[#d70f64] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-[#d70f64] group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    <span className="text-[10px] sm:text-xs font-bold text-[#422A38]/70 bg-[#F8E6E9]/60 px-2 py-0.5 rounded-full border border-[#EAD6BF]/50">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#422A38] group-hover:text-[#d70f64] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#d70f64] mt-0.5">
                      — {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-[#422A38]/75 leading-relaxed mt-1.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Footer inside Card: Status indicator & Arrow */}
                <div className="pt-2.5 mt-2.5 border-t border-[#EAD6BF]/40 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="font-semibold text-[#422A38]/60">
                    {item.status}
                  </span>
                  <div className="inline-flex items-center gap-1 font-bold text-[#d70f64] group-hover:translate-x-1 transition-transform">
                    <span>Buka</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* CALON AKTIF & AKSI KELOLA DATA (Fungsi Lengkap Terpelihara)   */}
      {/* ============================================================ */}
      <section className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#EAD6BF]/80 shadow-[0_2px_12px_rgba(66,42,56,0.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-[#422A38]/70 uppercase tracking-wider">
                Calon Dinilai:
              </span>
              <span className="text-sm font-bold text-[#422A38] bg-[#FFF9F5] px-3 py-1 rounded-full border border-[#EAD6BF]/70 shadow-2xs">
                {candidate.name}
              </span>
              {candidate.age && (
                <span className="text-xs text-[#422A38]/80 bg-[#F8E6E9]/70 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                  {candidate.age} th
                </span>
              )}
              {candidate.occupation && (
                <span className="text-xs text-[#422A38]/80 bg-[#F8E6E9]/70 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                  💼 {candidate.occupation}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#422A38]/70 mt-1">
              Data evaluasi tersimpan otomatis &amp; dapat diekspor kapan saja.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <button
              onClick={onOpenCandidateModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#d70f64] hover:bg-[#bf0d58] active:scale-95 transition-all shadow-sm shadow-[#d70f64]/20 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ganti / Kelola Calon</span>
            </button>

            <button
              onClick={onOpenGuideModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#422A38] bg-[#FFF9F5] hover:bg-[#F8E6E9] border border-[#EAD6BF] active:scale-95 transition-all cursor-pointer"
              title="Panduan Ta'aruf & Penilaian"
            >
              <Info className="w-3.5 h-3.5 text-[#d70f64]" />
              <span>Panduan</span>
            </button>

            {onOpenExportImportModal && (
              <button
                onClick={onOpenExportImportModal}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#422A38] bg-[#FFF9F5] hover:bg-[#F8E6E9] border border-[#EAD6BF] active:scale-95 transition-all cursor-pointer"
                title="Cadangkan atau Pulihkan Data"
              >
                <DownloadCloud className="w-3.5 h-3.5 text-[#d70f64]" />
                <span>Backup</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PWA INSTALL BANNER / PROMPT (Pink Panda Styled)              */}
      {/* ============================================================ */}
      {!isInstalled && (
        <section className="bg-gradient-to-r from-[#fff0f5] via-white to-[#fff0f5] rounded-2xl p-4 sm:p-4.5 border border-[#fcc2d7] shadow-[0_4px_16px_rgba(215,15,100,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#d70f64] to-[#ff2b85] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#d70f64]/25">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Pasang Aplikasi di HP / Desktop
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d70f64] text-white">
                  PWA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Akses cepat dari layar utama, tanpa browser, dan dapat dipakai saat offline.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex-shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-xl bg-[#d70f64] hover:bg-[#bf0d58] active:bg-[#a80b4d] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-[#d70f64]/30 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Aplikasi</span>
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-xl bg-[#d70f64] hover:bg-[#bf0d58] active:bg-[#a80b4d] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-[#d70f64]/30 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pasang di iPhone / iPad</span>
              </button>
            )}

            {!isInstallable && !isIOS && (
              <div className="text-[11px] text-slate-500 font-medium text-center sm:text-right">
                Buka menu browser &gt; pilih &ldquo;Tambahkan ke Layar Utama&rdquo;
              </div>
            )}
          </div>
        </section>
      )}

      {isInstalled && (
        <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#d70f64] bg-[#fff0f5] py-1.5 px-3 rounded-full border border-[#fcc2d7] w-fit mx-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#d70f64]" />
          <span>Aplikasi Terpasang (Mode PWA Aktif)</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* QUICK SUMMARY PROGRESS METRICS (Pelengkap Konsistensi Data)    */}
      {/* ============================================================ */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAD6BF]/70 shadow-[0_2px_10px_rgba(66,42,56,0.03)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#d70f64]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#422A38] uppercase tracking-wider">
              Ringkasan Kemajuan Evaluasi
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#422A38]/60">
            {candidate.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div 
            onClick={() => onNavigateTab('checklist')}
            className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EAD6BF]/60 hover:border-[#d70f64] cursor-pointer transition-colors"
          >
            <div className="text-lg sm:text-xl font-black text-[#422A38]">
              {totalCriteriaRated}<span className="text-xs text-[#422A38]/50 font-normal">/25</span>
            </div>
            <div className="text-[11px] text-[#422A38]/70 font-medium">Kriteria Dinilai</div>
          </div>

          <div 
            onClick={() => onNavigateTab('30hari')}
            className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EAD6BF]/60 hover:border-[#d70f64] cursor-pointer transition-colors"
          >
            <div className="text-lg sm:text-xl font-black text-[#422A38]">
              {totalDaysCompleted}<span className="text-xs text-[#422A38]/50 font-normal">/30</span>
            </div>
            <div className="text-[11px] text-[#422A38]/70 font-medium">Hari Misi</div>
          </div>

          <div 
            onClick={() => onNavigateTab('analisis')}
            className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EAD6BF]/60 hover:border-[#d70f64] cursor-pointer transition-colors"
          >
            <div className="text-lg sm:text-xl font-black text-[#d70f64]">
              {compatibilityScore}%
            </div>
            <div className="text-[11px] text-[#422A38]/70 font-medium">Skor Kecocokan</div>
          </div>

          <div 
            onClick={() => onNavigateTab('analisis')}
            className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EAD6BF]/60 hover:border-[#d70f64] cursor-pointer transition-colors"
          >
            <div className={`text-lg sm:text-xl font-black ${redFlagsCount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {redFlagsCount}
            </div>
            <div className="text-[11px] text-[#422A38]/70 font-medium">
              {redFlagsCount > 0 ? 'Sinyal Waspada' : 'Red Flag'}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3 PRINSIP PENILAIAN OBJEKTIF (Harmonis & Beradab)             */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-[#FFF9F5] via-[#F8E6E9]/40 to-[#FFF9F5] rounded-2xl p-4 sm:p-5 border border-[#EAD6BF]/70 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-[#d70f64]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#422A38] uppercase tracking-wider">
            3 Prinsip Ta&apos;aruf & Penilaian Cerdas
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/80 p-3.5 rounded-xl border border-[#EAD6BF]/50 shadow-2xs">
            <span className="font-bold text-[#d70f64] block mb-1">1. Tindakan Nyata &gt; Janji</span>
            <p className="text-[#422A38]/80 leading-relaxed text-[11px] sm:text-xs">
              Kata manis mudah diucapkan di awal, namun tanggung jawab dan konsistensi adab terlihat saat situasi sulit.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-[#EAD6BF]/50 shadow-2xs">
            <span className="font-bold text-[#d70f64] block mb-1">2. Waspadai Ketergesaan</span>
            <p className="text-[#422A38]/80 leading-relaxed text-[11px] sm:text-xs">
              Pujian berlebih dan desakan tergesa-gesa tanpa melibatkan keluarga sering menutupi karakter asli.
            </p>
          </div>

          <div className="bg-white/80 p-3.5 rounded-xl border border-[#EAD6BF]/50 shadow-2xs">
            <span className="font-bold text-[#d70f64] block mb-1">3. Istikharah & Musyawarah</span>
            <p className="text-[#422A38]/80 leading-relaxed text-[11px] sm:text-xs">
              Gunakan hasil penilaian objektif sebagai bahan pertimbangan bersama wali dan petunjuk dari Allah SWT.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODAL PETUNJUK INSTALASI iOS / SAFARI                        */}
      {/* ============================================================ */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#fcc2d7] relative space-y-4">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#d70f64] text-white flex items-center justify-center shadow-md shadow-[#d70f64]/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Pasang di iPhone / iPad
                </h3>
                <p className="text-[11px] text-slate-500">
                  Melalui browser Safari
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 bg-[#fff0f5] p-3.5 rounded-2xl border border-[#fcc2d7]">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d70f64] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  Ketuk tombol <strong>Bagikan</strong> (ikon kotak dengan panah ke atas <Share2 className="w-3.5 h-3.5 inline text-[#d70f64]" />) di bilah navigasi Safari.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d70f64] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  Gulir ke bawah dan ketuk <strong>Tambahkan ke Layar Utama</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-[#d70f64]" /> <em>Add to Home Screen</em>).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d70f64] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  Ketuk <strong>Tambah</strong> di pojok kanan atas. Aplikasi siap digunakan kapan saja dari layar utama Anda!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#d70f64] hover:bg-[#bf0d58] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-[#d70f64]/20"
            >
              Mengerti &amp; Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
