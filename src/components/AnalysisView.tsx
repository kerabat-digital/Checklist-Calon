import React, { useMemo, useState } from 'react';
import { Candidate, CriterionCategory } from '../types';
import { CRITERIA_DATA } from '../data/criteriaData';
import { DAY_GUIDE_DATA } from '../data/dayGuideData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { 
  ShieldCheck, 
  Wallet, 
  Users2, 
  MessageSquare, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  Copy, 
  Printer, 
  Compass, 
  HeartHandshake, 
  Sparkles,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface AnalysisViewProps {
  candidate: Candidate;
  onNavigateTab?: (tab: 'checklist' | '30hari' | 'soalan') => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ candidate, onNavigateTab }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Deep calculation of candidate metrics
  const analysis = useMemo(() => {
    let checklistGreen = 0;
    let checklistRed = 0;
    let checklistTotalRated = 0;

    const categoryBreakdown: Record<CriterionCategory, { green: number; red: number; total: number; title: string }> = {
      sahsiah: { green: 0, red: 0, total: 7, title: 'Sahsiah & Agama' },
      kewangan: { green: 0, red: 0, total: 6, title: 'Pengurusan Finansial' },
      keluarga: { green: 0, red: 0, total: 6, title: 'Hubungan Keluarga' },
      komunikasi: { green: 0, red: 0, total: 6, title: 'Komunikasi & Emosi' },
    };

    const redFlagsList: { id: string; source: 'checklist' | 'day' | 'question'; title: string; prompt: string; note?: string }[] = [];

    // Analyze 25 checklist criteria
    CRITERIA_DATA.forEach((c) => {
      const item = candidate.checklist[c.id];
      const r = item?.rating || 'unrated';
      if (r === 'green') {
        checklistGreen++;
        checklistTotalRated++;
        categoryBreakdown[c.category].green++;
      } else if (r === 'red') {
        checklistRed++;
        checklistTotalRated++;
        categoryBreakdown[c.category].red++;
        redFlagsList.push({
          id: c.id,
          source: 'checklist',
          title: c.title,
          prompt: c.actionEvidencePrompt,
          note: item?.note,
        });
      }
    });

    // Analyze 30-day guide items
    let dayGreen = 0;
    let dayRed = 0;
    let dayCompleted = 0;

    DAY_GUIDE_DATA.forEach((d) => {
      const item = candidate.dayRatings[d.day];
      if (item?.completed) {
        dayCompleted++;
      }
      if (item?.rating === 'green') {
        dayGreen++;
      } else if (item?.rating === 'red') {
        dayRed++;
        redFlagsList.push({
          id: `day-${d.day}`,
          source: 'day',
          title: `Hari ${d.day}: ${d.title}`,
          prompt: d.redFlagWarning,
          note: item?.note,
        });
      }
    });

    // Analyze 32 Ta'aruf question ratings
    let questionGreen = 0;
    let questionRed = 0;
    let questionsRated = 0;
    const questionRatings = candidate.questionRatings || {};

    QUESTIONS_DATA.forEach((q) => {
      const qItem = questionRatings[q.id];
      if (qItem?.rating === 'green') {
        questionGreen++;
        questionsRated++;
      } else if (qItem?.rating === 'red') {
        questionRed++;
        questionsRated++;
        redFlagsList.push({
          id: q.id,
          source: 'question',
          title: `Soalan #${q.questionNumber}: ${q.categoryLabel}`,
          prompt: `Jawapan Bermasalah pada: "${q.question}"`,
          note: qItem?.note,
        });
      }
    });

    const totalGreen = checklistGreen + dayGreen + questionGreen;
    const totalRed = checklistRed + dayRed + questionRed;
    const totalRated = checklistTotalRated + (dayGreen + dayRed) + questionsRated;

    // Objective compatibility score formula
    // Red flags have high penalty in marital psychology
    let score = 0;
    if (totalRated > 0) {
      const denominator = totalGreen + (totalRed * 2);
      if (denominator > 0) {
        score = Math.round((totalGreen / denominator) * 100);
      }
    }

    // Determine traffic light status
    // 🟢 Lampu Hijau: 80% ke atas AND 0 Red Flags
    // 🟡 Lampu Kuning: 50% - 79% (or 1 Red Flag non-kritis)
    // 🔴 Lampu Merah: Bawah 50% OR >= 2 Red Flags / severe
    let verdict: 'green' | 'yellow' | 'red' = 'yellow';
    let verdictTitle = '';
    let verdictDesc = '';

    if (totalRated === 0) {
      verdict = 'yellow';
      verdictTitle = 'Data Belum Cukup untuk Diagnosis';
      verdictDesc = 'Silakan isi kriteria pada Tab Checklist, Tab 30 Hari, atau nilai jawaban pada Tab Soalan untuk mendapatkan analisis objektif.';
    } else if (totalRed >= 2 || score < 50) {
      verdict = 'red';
      verdictTitle = 'LAMPU MERAH: Risiko Bahaya Tinggi (High Risk)';
      verdictDesc = 'Terdeteksi tanda bahaya serius (Red Flag) atau skor keserasian rendah. Jangan kompromi! Sangat disarankan untuk berpikir ulang secara rasional dan menghentikan proses sebelum terlambat.';
    } else if (score >= 80 && totalRed === 0) {
      verdict = 'green';
      verdictTitle = 'LAMPU HIJAU: Potensi Pasangan Matang & Bertanggung Jawab';
      verdictDesc = 'Karakter terbukti positif melalui tindakan nyata harian tanpa ada red flag membahayakan. Layak untuk dilanjutkan ke tahap khitbah resmi dengan melibatkan wali nasab.';
    } else {
      verdict = 'yellow';
      verdictTitle = 'LAMPU KUNING: Perlu Pengamatan Lanjut (Proceed with Caution)';
      verdictDesc = 'Terdapat beberapa ketidaksesuaian atau indikator yang belum jelas. Lanjutkan pengamatan lapangan, tetapkan batasan tegas, dan konsultasikan secara mendalam dengan wali.';
    }

    return {
      totalGreen,
      totalRed,
      totalRated,
      checklistTotalRated,
      dayCompleted,
      questionsRated,
      questionGreen,
      questionRed,
      score,
      verdict,
      verdictTitle,
      verdictDesc,
      categoryBreakdown,
      redFlagsList,
    };
  }, [candidate.checklist, candidate.dayRatings, candidate.questionRatings]);

  const handleCopySummary = () => {
    const summaryText = `[RINGKASAN DIAGNOSIS CALON SUAMI]
Nama Calon: ${candidate.name}
Usia: ${candidate.age ? `${candidate.age} Tahun` : 'Tidak dicantumkan'}
Status Pernikahan: ${candidate.maritalStatus || 'Lajang'}
Pekerjaan / Profesi: ${candidate.occupation || 'Tidak dicantumkan'}
Alamat / Domisili: ${candidate.address || 'Tidak dicantumkan'}
Tanggal Penilaian: ${new Date().toLocaleDateString('id-ID')}
Skor Keserasian Objektif: ${analysis.score}%
Status Lampu Lalu Lintas: ${analysis.verdictTitle}

Total Indikator Positif (Green Flag): ${analysis.totalGreen}
Total Tanda Bahaya (Red Flag): ${analysis.totalRed}
Kriteria Checklist Dinilai: ${analysis.checklistTotalRated}/25
Hari Modul Diselesaikan: ${analysis.dayCompleted}/30
Pertanyaan Ta'aruf Dinilai: ${analysis.questionsRated}/32

Daftar Red Flag Terdeteksi:
${analysis.redFlagsList.length === 0 ? '- Tidak ada Red Flag yang terdeteksi.' : analysis.redFlagsList.map((r, i) => `${i + 1}. ${r.title} (${r.prompt})`).join('\n')}

Catatan Kesimpulan:
${analysis.verdictDesc}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Verdict Lampu Lalu Lintas Card */}
      <div className={`rounded-3xl p-5 border-2 shadow-sm transition-all ${
        analysis.verdict === 'green'
          ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-emerald-400'
          : analysis.verdict === 'red'
          ? 'bg-gradient-to-br from-rose-50 to-rose-100/60 border-rose-400'
          : 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-400'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              analysis.verdict === 'green'
                ? 'bg-emerald-600 text-white'
                : analysis.verdict === 'red'
                ? 'bg-rose-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              {analysis.verdict === 'green' && '🟢 Rekomendasi Teruskan'}
              {analysis.verdict === 'red' && '🔴 Rekomendasi Waspada & Stop'}
              {analysis.verdict === 'yellow' && '🟡 Pengamatan Ekstra'}
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight pt-1">
              {analysis.verdictTitle}
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-xs font-bold text-slate-800">
              <span className="font-black text-slate-900">{candidate.name}</span>
              {candidate.age && <span className="bg-white/80 px-2 py-0.5 rounded-md border border-black/10 text-[11px] font-bold">🎂 {candidate.age} Thn</span>}
              {candidate.maritalStatus && <span className="bg-white/80 px-2 py-0.5 rounded-md border border-black/10 text-[11px] font-bold">💍 {candidate.maritalStatus}</span>}
              {candidate.occupation && <span className="bg-white/80 px-2 py-0.5 rounded-md border border-black/10 text-[11px] font-bold text-amber-900">💼 {candidate.occupation}</span>}
              {candidate.address && <span className="bg-white/80 px-2 py-0.5 rounded-md border border-black/10 text-[11px] font-medium text-slate-700">📍 {candidate.address}</span>}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
              {analysis.verdictDesc}
            </p>
          </div>

          {/* Big Score Circle */}
          <div className="flex-shrink-0 text-center">
            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-b-[4px] shadow-md ${
              analysis.verdict === 'green'
                ? 'bg-emerald-600 text-white border-emerald-800'
                : analysis.verdict === 'red'
                ? 'bg-rose-600 text-white border-rose-800'
                : 'bg-amber-500 text-white border-amber-700'
            }`}>
              <span className="text-2xl font-black leading-none">{analysis.score}%</span>
              <span className="text-[10px] font-bold tracking-tight opacity-90 mt-0.5">Keserasian</span>
            </div>
          </div>
        </div>

        {/* Quick Tally Cards inside Verdict */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-black/10">
          <div className="bg-white/80 rounded-xl p-2.5 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 block">Total Green Flag</span>
            <span className="text-base font-black text-emerald-700">🟢 {analysis.totalGreen}</span>
          </div>

          <div className="bg-white/80 rounded-xl p-2.5 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 block">Total Red Flag</span>
            <span className="text-base font-black text-rose-700">🔴 {analysis.totalRed}</span>
          </div>

          <div className="bg-white/80 rounded-xl p-2.5 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 block">Pertanyaan Dinilai</span>
            <span className="text-base font-black text-slate-800">
              {analysis.questionsRated}/32
            </span>
          </div>
        </div>

        {/* Action button to copy/print summary */}
        <div className="mt-3.5 flex items-center justify-end gap-2">
          <button
            onClick={handleCopySummary}
            className="btn-3d-secondary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 text-slate-800"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Ringkasan Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Ringkasan untuk Wali</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Red Flags Alert Section (Critical Warning List) */}
      <div className="bg-white rounded-2xl border border-[#fcc2d7] p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Daftar Peringatan Red Flag Terdeteksi ({analysis.redFlagsList.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Poin kritis yang tidak boleh diabaikan atau ditoleransi tanpa pertanggungjawaban.
              </p>
            </div>
          </div>
        </div>

        {analysis.redFlagsList.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-emerald-800">
              Alhamdulillah! Belum ada Red Flag yang ditandai untuk {candidate.name}.
            </p>
            <p className="text-[11px] text-emerald-600 mt-0.5">
              Tetap lakukan observasi secara teliti di sisa hari dan kriteria yang belum selesai.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {analysis.redFlagsList.map((item, index) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-black text-rose-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-md">
                    {item.source === 'checklist' ? 'Checklist' : item.source === 'question' ? 'Pertanyaan Ta’aruf' : 'Panduan 30 Hari'}
                  </span>
                </div>
                <p className="text-rose-800 font-medium pl-6">
                  {item.prompt}
                </p>
                {item.note && (
                  <p className="text-slate-600 bg-white p-2 rounded-lg border border-rose-200 font-semibold italic text-[11px] ml-6 mt-1">
                    Catatan Anda: "{item.note}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Breakdown Progress */}
      <div className="bg-white rounded-2xl border border-[#fcc2d7] p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d70f64]" />
          <span>Rincian 4 Dimensi Kesiapan Pasangan</span>
        </h3>

        <div className="space-y-3">
          {Object.entries(analysis.categoryBreakdown).map(([key, cat]) => {
            const rated = cat.green + cat.red;
            const pct = cat.total > 0 ? Math.round((cat.green / cat.total) * 100) : 0;

            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    {key === 'sahsiah' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    {key === 'kewangan' && <Wallet className="w-3.5 h-3.5 text-blue-600" />}
                    {key === 'keluarga' && <Users2 className="w-3.5 h-3.5 text-purple-600" />}
                    {key === 'komunikasi' && <MessageSquare className="w-3.5 h-3.5 text-[#d70f64]" />}
                    {cat.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    🟢 {cat.green} | 🔴 {cat.red} ({rated}/{cat.total} dinilai)
                  </span>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${(cat.green / cat.total) * 100}%` }}
                    title={`Green Flag: ${cat.green}`}
                  />
                  <div 
                    className="bg-rose-500 h-full transition-all"
                    style={{ width: `${(cat.red / cat.total) * 100}%` }}
                    title={`Red Flag: ${cat.red}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rekomendasi Langkah Selanjutnya (Actionable Next Steps) */}
      <div className="bg-gradient-to-br from-white to-[#fff0f5] rounded-2xl border border-[#fcc2d7] p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#d70f64]" />
          <span>Rekomendasi Langkah Praktis Selanjutnya</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#fcc2d7] space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>1.</span>
              <span>Lakukan Salat Istikharah Khusyuk</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
              Mohon ketetapan hati kepada Allah SWT. Jika ada keraguan kuat di dada setelah melihat fakta, jangan ragu untuk mengambil jeda.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#fcc2d7] space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>2.</span>
              <span>Libatkan Wali Sah & Pihak Bijak</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
              Tunjukkan ringkasan checklist ini kepada wali nasab atau keluarga terpercaya agar mereka dapat menguji calon dari sudut pandang pria.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#fcc2d7] space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>3.</span>
              <span>Kunci Batasan Finansial</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
              Jangan pernah meminjamkan uang, menjadi penjamin hutang, atau membiayai gaya hidup calon sebelum akad nikah resmi berlangsung.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#fcc2d7] space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>4.</span>
              <span>Pelajari 32 Pertanyaan Ta'aruf</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
              Gunakan koleksi pertanyaan mendalam pada Tab Soalan untuk membedah pola pikirnya tentang finansial, emosi, dan anak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
