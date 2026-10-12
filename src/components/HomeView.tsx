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
    <div className="space-y-5 pb-8 animate-fadeIn max-w-xl mx-auto sm:max-w-2xl md:max-w-3xl">
      {/* ============================================================ */}
      {/* EDITORIAL HERO SECTION                                       */}
      {/* Palet: Ivory #FFF9F5, Blush #F8E6E9, Pink Panda #D70F64,     */}
      {/*        Deep Plum #422A38, Champagne #EAD6BF                 */}
      {/* ============================================================ */}
      <section className="relative rounded-[32px] overflow-hidden shadow-xl border border-[#EAD6BF]/80 bg-[#FFF9F5]">
        {/* Background Image Container */}
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[590px] overflow-hidden flex flex-col justify-between">
          <img
            src={heroSunsetBase64}
            alt="Muslimah menghadap pemandangan kota saat golden hour - Checklist Bakal Suami"
            className="absolute inset-0 w-full h-full object-cover object-[center_32%] transform scale-102 transition-transform duration-1000 ease-out"
            loading="eager"
            fetchPriority="high"
          />

          {/* Editorial Soft Overlay Gradients */}
          {/* Top subtle vignette for small headline readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#422A38]/70 via-[#422A38]/15 to-transparent h-40 pointer-events-none" />
          
          {/* Bottom rich smooth gradient into soft ivory/champagne backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F5] via-[#FFF9F5]/90 via-55% to-transparent pointer-events-none" />

          {/* -------------------------------------------------------- */}
          {/* TOP HEADER: Headline Kecil & Tombol Panduan              */}
          {/* -------------------------------------------------------- */}
          <div className="relative z-10 px-5 pt-5 sm:px-7 sm:pt-6 flex items-start justify-between gap-3">
            <div className="max-w-[78%] sm:max-w-md">
              {/* Headline kecil seperti arahan nomor 3 */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm mb-1">
                <Sparkles className="w-3 h-3 text-[#F8E6E9]" />
                <span className="text-[11px] sm:text-xs font-medium tracking-wide">
                  Prinsip Muslimah Cerdas
                </span>
              </div>
              <p className="text-white text-xs sm:text-sm md:text-base font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-wide">
                &ldquo;Pilih yang Siap, Bukan yang Sekadar Pandai Berjanji.&rdquo;
              </p>
            </div>

            {/* Tombol Panduan Cepat */}
            <button
              onClick={onOpenGuideModal}
              className="bg-white/80 hover:bg-white text-[#422A38] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#fcc2d7] shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Buka panduan penilaian"
            >
              <Info className="w-3.5 h-3.5 text-[#d70f64]" />
              <span className="hidden xs:inline">Panduan</span>
            </button>
          </div>

          {/* -------------------------------------------------------- */}
          {/* BOTTOM HERO CONTENT: Judul Serif, Subtitle, & Tombol Pill */}
          {/* -------------------------------------------------------- */}
          <div className="relative z-10 px-5 pb-7 sm:px-8 sm:pb-9 text-center flex flex-col items-center">
            {/* Judul Utama Besar dengan Tipografi Serif Elegan */}
            <div className="mb-2">
              <h1 className="font-serif-hero font-bold tracking-tight leading-[1.08]">
                <span className="block text-4xl sm:text-5xl md:text-6xl text-[#422A38] font-bold tracking-tight drop-shadow-xs">
                  Checklist
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-[#C77C8D] font-serif-hero italic font-semibold mt-0.5">
                  Bakal Suami
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-[#422A38]/90 text-xs sm:text-sm md:text-base font-medium tracking-wide mb-6 max-w-sm sm:max-w-md">
              Kenali Tindakan, Bukan Sekadar Kata-Kata
            </p>

            {/* Tombol Utama Berbentuk Pill (Warna Pink Panda #D70F64) */}
            <button
              onClick={() => onNavigateTab('checklist')}
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-white font-bold text-sm sm:text-base bg-[#d70f64] hover:bg-[#bf0d58] active:bg-[#a80b4d] active:scale-95 shadow-[0_10px_25px_rgba(215,15,100,0.45)] border border-[#ff2b85]/40 transition-all duration-200 cursor-pointer"
            >
              <span>Mulai Penilaian Saya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* HERO BOTTOM BAR: Profil Calon Aktif                         */}
        {/* ---------------------------------------------------------- */}
        <div className="bg-[#F8E6E9]/60 px-4 sm:px-6 py-3 border-t border-[#EAD6BF]/60 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#422A38]/70 font-bold uppercase tracking-wider">
              Calon Dinilai:
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#422A38] bg-white px-3 py-1 rounded-full border border-[#EAD6BF]/70 shadow-2xs">
              {candidate.name}
            </span>
            {candidate.age && (
              <span className="text-xs font-medium text-[#422A38]/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                {candidate.age} th
              </span>
            )}
            {candidate.occupation && (
              <span className="text-xs font-medium text-[#422A38]/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                💼 {candidate.occupation}
              </span>
            )}
            {candidate.maritalStatus && (
              <span className="text-xs font-medium text-[#422A38]/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                💍 {candidate.maritalStatus}
              </span>
            )}
            {candidate.address && (
              <span className="text-xs font-medium text-[#422A38]/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAD6BF]/50">
                📍 {candidate.address}
              </span>
            )}
          </div>

          <button
            onClick={onOpenCandidateModal}
            className="text-xs font-bold text-[#d70f64] hover:text-[#a80b4d] flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#fcc2d7] hover:bg-[#fff0f5] transition-all shadow-2xs ml-auto cursor-pointer active:scale-95"
          >
            <Users className="w-3.5 h-3.5 text-[#d70f64]" />
            <span>Kelola Calon</span>
            <ChevronRight className="w-3 h-3 text-[#d70f64]" />
          </button>
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
      {/* 5 MENU CARD DALAM GRID DUA KOLOM                             */}
      {/* Card putih/ivory, rounded, outline dusty rose, shadow tipis   */}
      {/* ============================================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base sm:text-lg font-serif-hero font-bold text-[#422A38] tracking-tight">
              Modul Penilaian Karakter
            </h2>
            <p className="text-xs text-[#422A38]/70">
              Pilih modul evaluasi untuk memverifikasi kesiapan dan kepribadian calon
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {menuCards.map((item, idx) => {
            const Icon = item.icon;
            // 5th card spans 2 columns to complete the 2-column grid gracefully
            const isLastSingle = idx === 4;

            return (
              <div
                key={item.id}
                onClick={() => onNavigateTab(item.tab)}
                className={`group cursor-pointer bg-[#FFF9F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#EAD6BF]/70 hover:border-[#d70f64] shadow-[0_2px_10px_rgba(66,42,56,0.04)] hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                  isLastSingle ? 'col-span-2 sm:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Top Bar inside Card: Outline Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#fff0f5] border border-[#fcc2d7] text-[#d70f64] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-[#d70f64] group-hover:text-white transition-all">
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
                  <p className="text-[11px] sm:text-xs text-[#422A38]/75 leading-relaxed mt-2 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Footer inside Card: Status indicator & Arrow */}
                <div className="pt-3 mt-3 border-t border-[#EAD6BF]/40 flex items-center justify-between text-[11px] sm:text-xs">
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
