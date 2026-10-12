import React from 'react';
import { Candidate, ActiveTab } from '../types';
import { 
  CheckSquare, 
  Calendar, 
  HelpCircle, 
  BookOpen, 
  PieChart, 
  Users, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Heart
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
  // Navigation modules with explicit steps
  const navFeatures = [
    {
      tab: 'checklist' as ActiveTab,
      badge: 'LANGKAH 1',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: '25 Kriteria Penilaian',
      subtitle: 'Checklist Objektif Tindakan Nyata',
      desc: 'Evaluasi akhlak, tanggung jawab finansial, keluarga & cara menyelesaikan konflik secara rasional tanpa ilusi kata manis.',
      icon: CheckSquare,
      iconBg: 'bg-emerald-500',
      actionText: 'Buka Checklist',
      status: `${totalCriteriaRated}/25 Dinilai`,
      highlight: totalCriteriaRated === 0 ? 'Mulai Sekarang' : `${totalCriteriaRated} Selesai`,
    },
    {
      tab: '30hari' as ActiveTab,
      badge: 'LANGKAH 2',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      title: '30 Hari Perjalanan',
      subtitle: 'Panduan Lapangan & Uji Tindakan Nyata',
      desc: 'Misi harian terarah selama 30 hari untuk mengamati karakter asli calon dalam situasi nyata dan tekanan emosional.',
      icon: Calendar,
      iconBg: 'bg-purple-500',
      actionText: 'Lihat Misi Harian',
      status: `Hari ${totalDaysCompleted}/30`,
      highlight: `${totalDaysCompleted} Hari Selesai`,
    },
    {
      tab: 'soalan' as ActiveTab,
      badge: 'LANGKAH 3',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      title: 'Pertanyaan Ta\'aruf',
      subtitle: '32 Soal Kritis & Psikologi Komunikasi',
      desc: 'Daftar pertanyaan mendalam beserta indikator jawaban matang (green flag) dan jawaban manipulatif/love-bombing.',
      icon: HelpCircle,
      iconBg: 'bg-sky-500',
      actionText: 'Buka 32 Soal',
      status: '32 Soal Syar\'i & Kritis',
      highlight: 'Lengkap Panduan',
    },
    {
      tab: 'jurnal' as ActiveTab,
      badge: 'CATATAN',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      title: 'Jurnal Observasi',
      subtitle: 'Diari Catatan Perilaku & Momen Kunci',
      desc: 'Dokumentasikan fakta lapangan yang Anda lihat langsung—bukan janji manis atau asumsi angan-angan.',
      icon: BookOpen,
      iconBg: 'bg-amber-500',
      actionText: 'Tulis Catatan',
      status: 'Privasi 100% Offline',
      highlight: 'Bebas Bias',
    },
    {
      tab: 'analisis' as ActiveTab,
      badge: 'KESIMPULAN',
      badgeColor: 'bg-[#ffdeeb] text-[#d70f64] border-[#fcc2d7]',
      title: 'Analisis & Diagnosis',
      subtitle: 'Skor Kecocokan & Rekomendasi Siap Kirim ke Wali',
      desc: 'Rangkuman lengkap lampu hijau vs sinyal bahaya (red flags), skor objektif, serta format teks siap salin untuk istikharah dan musyawarah.',
      icon: PieChart,
      iconBg: 'bg-[#d70f64]',
      actionText: 'Lihat Hasil Diagnosis',
      status: `${compatibilityScore}% Kecocokan`,
      highlight: redFlagsCount > 0 ? `⚠️ ${redFlagsCount} Red Flag!` : 'Periksa Sekarang',
    },
  ];

  return (
    <div className="space-y-6 pb-6 animate-fadeIn">
      {/* ============================================================ */}
      {/* HERO POSTER COVER (EXACT REPLICA OF clist.PNG DESIGN)       */}
      {/* ============================================================ */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffb6c1] bg-black">
        {/* Background Image Container with Arch & Woman looking out at Mosque */}
        <div className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] overflow-hidden flex flex-col justify-between">
          <img
            src="/clist_cover.jpg"
            alt="Checklist Calon Suami - Pilihan yang tepat bermula dengan penilaian yang bijak"
            className="absolute inset-0 w-full h-full object-cover object-[center_25%] transform hover:scale-102 transition-transform duration-1000 ease-out"
          />

          {/* Gentle cinematic lighting vignette: soft dark tone on top and bottom so text pops vividly */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* -------------------------------------------------------- */}
          {/* TOP SECTION: Script quote + Heart icon (Exactly like clist.PNG) */}
          {/* -------------------------------------------------------- */}
          <div className="relative z-10 p-5 sm:p-7 md:p-8 flex items-start justify-between">
            <div className="max-w-[75%] sm:max-w-md">
              <p className="font-script text-white text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
                Pilihan yang tepat bermula dengan penilaian yang bijak
              </p>
              
              {/* Hand-drawn style Heart outline matching clist.PNG */}
              <div className="mt-1.5 flex items-center">
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] stroke-[2.2]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
            </div>

            {/* Panduan Quick Button */}
            <button
              onClick={onOpenGuideModal}
              className="bg-white/25 hover:bg-white/40 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/50 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Info className="w-3.5 h-3.5 text-pink-200" />
              <span>Panduan</span>
            </button>
          </div>

          {/* -------------------------------------------------------- */}
          {/* BOTTOM SECTION: Big Title, Subtitle, and Pink Pill Button */}
          {/* -------------------------------------------------------- */}
          <div className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8 text-center flex flex-col items-center">
            {/* Title with distinctive serif font matching clist.PNG */}
            <div className="mb-2">
              <h1 className="font-serif-title font-bold tracking-normal leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                <span className="block text-4xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight">
                  Checklist
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-[#ff529a] font-serif-title italic font-black mt-0.5 drop-shadow-[0_4px_16px_rgba(255,82,154,0.7)]">
                  Calon Suami
                </span>
              </h1>
            </div>

            {/* Subtitle: "Kenali Tindakan, Bukan Kata-Kata" */}
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] tracking-wide mb-5 text-pink-100/95 max-w-md">
              Kenali Tindakan, Bukan Kata-Kata
            </p>

            {/* CTA Button: Solid pink pill with arrow matching clist.PNG "Mula Sekarang" */}
            <button
              onClick={() => onNavigateTab('checklist')}
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-white font-black text-sm sm:text-base bg-[#ff2b85] hover:bg-[#d70f64] shadow-[0_8px_25px_rgba(255,43,133,0.6)] border-2 border-white/40 transform active:scale-95 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Bottom Bar: Active Candidate Information Bar */}
        <div className="bg-[#fff0f5] px-4 sm:px-6 py-3 border-t-2 border-[#fcc2d7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Calon Aktif:</span>
            <span className="text-sm font-black text-[#d70f64] bg-white px-3 py-1 rounded-xl border border-[#fcc2d7] shadow-xs">
              {candidate.name}
            </span>
            {candidate.age && (
              <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {candidate.age} tahun
              </span>
            )}
            {candidate.occupation && (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                💼 {candidate.occupation}
              </span>
            )}
            {candidate.maritalStatus && (
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                💍 {candidate.maritalStatus}
              </span>
            )}
            {candidate.address && (
              <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                📍 {candidate.address}
              </span>
            )}
          </div>

          <button
            onClick={onOpenCandidateModal}
            className="text-xs font-bold text-[#d70f64] hover:text-[#a3084a] flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#fcc2d7] hover:bg-pink-50 transition-colors shadow-xs ml-auto"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Ganti / Kelola Calon</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUICK SUMMARY PROGRESS METRICS                                */}
      {/* ============================================================ */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => onNavigateTab('checklist')}
          className="bg-white rounded-2xl p-4 border border-[#fcc2d7] shadow-xs flex flex-col justify-between hover:border-[#d70f64] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold text-slate-600 group-hover:text-[#d70f64] transition-colors">25 Kriteria</span>
            <CheckSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{totalCriteriaRated}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 25 dinilai</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round((totalCriteriaRated / 25) * 100)}%` }}
            />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('30hari')}
          className="bg-white rounded-2xl p-4 border border-[#fcc2d7] shadow-xs flex flex-col justify-between hover:border-[#d70f64] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold text-slate-600 group-hover:text-[#d70f64] transition-colors">30 Hari Misi</span>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{totalDaysCompleted}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 30 hari</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round((totalDaysCompleted / 30) * 100)}%` }}
            />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('analisis')}
          className="bg-white rounded-2xl p-4 border border-[#fcc2d7] shadow-xs flex flex-col justify-between hover:border-[#d70f64] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold text-slate-600 group-hover:text-[#d70f64] transition-colors">Kecocokan</span>
            <PieChart className="w-4 h-4 text-[#d70f64]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#d70f64]">{compatibilityScore}%</span>
            <span className="text-xs text-slate-400 font-semibold">skor</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-pink-500 to-[#d70f64] h-full rounded-full transition-all duration-300"
              style={{ width: `${compatibilityScore}%` }}
            />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('analisis')}
          className="bg-white rounded-2xl p-4 border border-[#fcc2d7] shadow-xs flex flex-col justify-between hover:border-[#d70f64] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold text-slate-600 group-hover:text-[#d70f64] transition-colors">Sinyal Bahaya</span>
            <AlertTriangle className={`w-4 h-4 ${redFlagsCount > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black ${redFlagsCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {redFlagsCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">red flag</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${redFlagsCount > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}
              style={{ width: redFlagsCount > 0 ? '100%' : '0%' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODUL PENILAIAN LENGKAP                                       */}
      {/* ============================================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Modul Penilaian & Investigasi Karakter
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Ikuti alur terstruktur untuk memastikan keputusan hidup Anda berbasis fakta nyata
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {navFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.tab}
                onClick={() => onNavigateTab(feat.tab)}
                className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-[#fcc2d7] hover:border-[#d70f64] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                      {feat.highlight}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-11 h-11 rounded-2xl ${feat.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-tight group-hover:text-[#d70f64] transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2 mb-3">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">
                    {feat.status}
                  </span>
                  <div className="inline-flex items-center gap-1 font-bold text-[#d70f64] group-hover:translate-x-1.5 transition-transform">
                    <span>{feat.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3 PRINSIP PENILAIAN OBJEKTIF                                  */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-2xl p-4 sm:p-5 border border-[#fcc2d7] shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-[#d70f64]" />
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            3 Prinsip Penilaian Objektif
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-pink-100 shadow-xs">
            <span className="font-black text-[#d70f64] block mb-1">1. Tindakan &gt; Janji</span>
            <p className="text-slate-600 leading-relaxed">
              Kata-kata manis bisa dibuat dalam sekejap, namun konsistensi akhlak saat tertekan butuh karakter asli.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-pink-100 shadow-xs">
            <span className="font-black text-[#d70f64] block mb-1">2. Waspadai Love-Bombing</span>
            <p className="text-slate-600 leading-relaxed">
              Pujian berlebihan dan ketergesaan di awal sering menjadi penutup untuk menyembunyikan sifat asli.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-pink-100 shadow-xs">
            <span className="font-black text-[#d70f64] block mb-1">3. Musyawarah & Syar'i</span>
            <p className="text-slate-600 leading-relaxed">
              Gunakan hasil diagnosis sebagai bahan istikharah dan musyawarah bersama wali/keluarga yang Anda percayai.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
