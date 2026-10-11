export type RatingType = 'green' | 'red' | 'unrated';

export type CriterionCategory = 'sahsiah' | 'kewangan' | 'keluarga' | 'komunikasi';

export interface Criterion {
  id: string;
  category: CriterionCategory;
  categoryTitle: string;
  title: string;
  description: string;
  actionEvidencePrompt: string; // Ujian Bukti Tindakan Nyata
}

export interface DayGuide {
  day: number;
  phase: 1 | 2 | 3 | 4;
  phaseTitle: string;
  title: string;
  mission: string;
  fieldTest: string;
  taarufQuestion: string;
  redFlagWarning: string;
  wiseQuote: string;
}

export type JournalFlagType = 'green' | 'red' | 'neutral';

export interface JournalEntry {
  id: string;
  candidateId: string;
  date: string;
  title: string;
  content: string;
  flagType: JournalFlagType;
}

export interface CandidateChecklistItem {
  rating: RatingType;
  note: string;
  updatedAt?: string;
}

export interface CandidateDayItem {
  rating: RatingType;
  completed: boolean;
  note?: string;
}

export interface CandidateQuestionItem {
  rating: RatingType;
  note?: string;
  updatedAt?: string;
}

export interface Candidate {
  id: string;
  name: string;
  createdAt: string;
  notes?: string;
  checklist: Record<string, CandidateChecklistItem>;
  dayRatings: Record<number, CandidateDayItem>;
  questionRatings?: Record<string, CandidateQuestionItem>;
}

export interface TaarufQuestionItem {
  id: string;
  questionNumber: number;
  category: string;
  categoryLabel: string;
  question: string;
  purpose: string; // 🎯 Tujuan Psikologis & Syar'i
  greenFlagAnswer: string; // 🟢 Tanda Jawaban Matang
  redFlagAnswer: string; // 🔴 Tanda Jawaban Manipulatif
  proTip: string; // 💡 Tips Observasi Bahasa Tubuh
}

export type ActiveTab = 'checklist' | '30hari' | 'analisis' | 'jurnal' | 'soalan';
