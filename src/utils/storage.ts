import { Candidate, JournalEntry } from '../types';

const STORAGE_KEYS = {
  CANDIDATES: 'calon_suami_candidates_v1',
  ACTIVE_ID: 'calon_suami_active_id_v1',
  JOURNAL: 'calon_suami_journal_v1',
};

export function createDefaultCandidate(
  name: string = 'Calon A',
  age: string = '',
  maritalStatus: string = 'Lajang',
  address: string = '',
  occupation: string = ''
): Candidate {
  return {
    id: 'cand-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name,
    age,
    maritalStatus,
    address,
    occupation,
    createdAt: new Date().toISOString(),
    notes: '',
    checklist: {},
    dayRatings: {},
    questionRatings: {},
  };
}

export function loadCandidates(): Candidate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    if (!raw) {
      const defaultCand = createDefaultCandidate('Calon Pilihan 1');
      saveCandidates([defaultCand]);
      return [defaultCand];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const defaultCand = createDefaultCandidate('Calon Pilihan 1');
      saveCandidates([defaultCand]);
      return [defaultCand];
    }
    return parsed.map((c: Candidate) => ({
      ...c,
      age: c.age || '',
      maritalStatus: c.maritalStatus || 'Lajang',
      address: c.address || '',
      occupation: c.occupation || '',
      checklist: c.checklist || {},
      dayRatings: c.dayRatings || {},
      questionRatings: c.questionRatings || {},
    }));
  } catch (err) {
    console.error('Gagal memuat kandidat:', err);
    const defaultCand = createDefaultCandidate('Calon Pilihan 1');
    return [defaultCand];
  }
}

export function saveCandidates(candidates: Candidate[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
  } catch (err) {
    console.error('Gagal menyimpan kandidat:', err);
  }
}

export function loadActiveCandidateId(): string {
  try {
    const active = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
    if (active) return active;
  } catch (err) {
    console.error('Gagal memuat active id:', err);
  }
  const all = loadCandidates();
  return all[0]?.id || '';
}

export function saveActiveCandidateId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
  } catch (err) {
    console.error('Gagal menyimpan active id:', err);
  }
}

export function loadJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Gagal memuat jurnal:', err);
    return [];
  }
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  } catch (err) {
    console.error('Gagal menyimpan jurnal:', err);
  }
}

export interface BackupData {
  version: string;
  exportedAt: string;
  candidates: Candidate[];
  activeCandidateId: string;
  journalEntries: JournalEntry[];
}

export function exportBackupData(): void {
  const data: BackupData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    candidates: loadCandidates(),
    activeCandidateId: loadActiveCandidateId(),
    journalEntries: loadJournalEntries(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `backup-checklist-calon-suami-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackupData(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString) as Partial<BackupData>;
    if (!parsed.candidates || !Array.isArray(parsed.candidates) || parsed.candidates.length === 0) {
      return { success: false, message: 'Format data tidak valid: Data calon tidak ditemukan.' };
    }
    saveCandidates(parsed.candidates);
    if (parsed.activeCandidateId) {
      saveActiveCandidateId(parsed.activeCandidateId);
    } else {
      saveActiveCandidateId(parsed.candidates[0].id);
    }
    if (parsed.journalEntries && Array.isArray(parsed.journalEntries)) {
      saveJournalEntries(parsed.journalEntries);
    }
    return { success: true, message: 'Data cadangan berhasil dipulihkan!' };
  } catch (err) {
    return { success: false, message: 'Gagal membaca berkas JSON: ' + (err as Error).message };
  }
}
