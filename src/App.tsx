import React, { useState, useEffect, useMemo } from 'react';
import { 
  Candidate, 
  ActiveTab, 
  RatingType, 
  JournalEntry 
} from './types';
import { 
  loadCandidates, 
  saveCandidates, 
  loadActiveCandidateId, 
  saveActiveCandidateId, 
  loadJournalEntries, 
  saveJournalEntries, 
  createDefaultCandidate 
} from './utils/storage';
import { CRITERIA_DATA } from './data/criteriaData';
import { DAY_GUIDE_DATA } from './data/dayGuideData';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ChecklistView } from './components/ChecklistView';
import { ThirtyDaysView } from './components/ThirtyDaysView';
import { AnalysisView } from './components/AnalysisView';
import { JournalView } from './components/JournalView';
import { QuestionsView } from './components/QuestionsView';
import { GuideModal } from './components/GuideModal';
import { CandidateModal } from './components/CandidateModal';
import { ExportImportModal } from './components/ExportImportModal';

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>(() => loadCandidates());
  const [activeCandidateId, setActiveCandidateId] = useState<string>(() => loadActiveCandidateId());
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => loadJournalEntries());
  const [activeTab, setActiveTab] = useState<ActiveTab>('checklist');

  // Modals state
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [exportImportModalOpen, setExportImportModalOpen] = useState(false);

  // Active candidate object
  const activeCandidate = useMemo(() => {
    const found = candidates.find((c) => c.id === activeCandidateId);
    if (found) return found;
    return candidates[0] || createDefaultCandidate('Calon Pilihan 1');
  }, [candidates, activeCandidateId]);

  // Sync candidate changes to LocalStorage
  useEffect(() => {
    saveCandidates(candidates);
  }, [candidates]);

  // Sync active id to LocalStorage
  useEffect(() => {
    saveActiveCandidateId(activeCandidateId);
  }, [activeCandidateId]);

  // Sync journal entries to LocalStorage
  useEffect(() => {
    saveJournalEntries(journalEntries);
  }, [journalEntries]);

  // Update criterion rating for active candidate
  const handleUpdateRating = (criterionId: string, rating: RatingType, note?: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== activeCandidate.id) return c;
        const currentChecklist = { ...c.checklist };

        if (rating === 'unrated' && !note) {
          delete currentChecklist[criterionId];
        } else {
          currentChecklist[criterionId] = {
            rating,
            note: note ?? currentChecklist[criterionId]?.note ?? '',
            updatedAt: new Date().toISOString(),
          };
        }

        return {
          ...c,
          checklist: currentChecklist,
        };
      })
    );
  };

  // Update day guide rating for active candidate
  const handleUpdateDayRating = (day: number, rating: RatingType, completed: boolean, note?: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== activeCandidate.id) return c;
        const currentDays = { ...c.dayRatings };

        currentDays[day] = {
          rating,
          completed,
          note: note ?? currentDays[day]?.note ?? '',
        };

        return {
          ...c,
          dayRatings: currentDays,
        };
      })
    );
  };

  // Update question rating for active candidate
  const handleUpdateQuestionRating = (questionId: string, rating: RatingType, note?: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== activeCandidate.id) return c;
        const currentQuestions = { ...(c.questionRatings || {}) };

        if (rating === 'unrated' && !note) {
          delete currentQuestions[questionId];
        } else {
          currentQuestions[questionId] = {
            rating,
            note: note ?? currentQuestions[questionId]?.note ?? '',
            updatedAt: new Date().toISOString(),
          };
        }

        return {
          ...c,
          questionRatings: currentQuestions,
        };
      })
    );
  };

  // Candidate management handlers
  const handleSelectCandidate = (id: string) => {
    setActiveCandidateId(id);
  };

  const handleAddCandidate = (name: string) => {
    const newCand = createDefaultCandidate(name);
    setCandidates((prev) => [...prev, newCand]);
    setActiveCandidateId(newCand.id);
  };

  const handleRenameCandidate = (id: string, newName: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const fallback = createDefaultCandidate('Calon Pilihan 1');
        setActiveCandidateId(fallback.id);
        return [fallback];
      }
      if (activeCandidateId === id) {
        setActiveCandidateId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Journal entries handlers
  const handleAddJournalEntry = (entryData: Omit<JournalEntry, 'id' | 'candidateId'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: 'journal-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      candidateId: activeCandidate.id,
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const handleUpdateJournalEntry = (id: string, partial: Partial<JournalEntry>) => {
    setJournalEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...partial } : e))
    );
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Restore data callback from import
  const handleDataRestored = () => {
    const freshCandidates = loadCandidates();
    const freshActiveId = loadActiveCandidateId();
    const freshJournal = loadJournalEntries();
    setCandidates(freshCandidates);
    setActiveCandidateId(freshActiveId);
    setJournalEntries(freshJournal);
  };

  // Global metrics calculation
  const metrics = useMemo(() => {
    let greenCount = 0;
    let redCount = 0;
    let totalCriteriaRated = 0;

    CRITERIA_DATA.forEach((c) => {
      const r = activeCandidate.checklist[c.id]?.rating || 'unrated';
      if (r === 'green') {
        greenCount++;
        totalCriteriaRated++;
      } else if (r === 'red') {
        redCount++;
        totalCriteriaRated++;
      }
    });

    let totalDaysCompleted = 0;
    DAY_GUIDE_DATA.forEach((d) => {
      const dayData = activeCandidate.dayRatings[d.day];
      if (dayData?.completed) totalDaysCompleted++;
      if (dayData?.rating === 'green') greenCount++;
      if (dayData?.rating === 'red') redCount++;
    });

    // Also include question answers evaluations
    const questionRatings = activeCandidate.questionRatings || {};
    Object.values(questionRatings).forEach((q) => {
      if (q.rating === 'green') greenCount++;
      if (q.rating === 'red') redCount++;
    });

    const totalRated = greenCount + redCount;
    let compatibilityScore = 0;
    if (totalRated > 0) {
      const denominator = greenCount + redCount * 2;
      if (denominator > 0) {
        compatibilityScore = Math.round((greenCount / denominator) * 100);
      }
    }

    return {
      totalCriteriaRated,
      totalDaysCompleted,
      compatibilityScore,
      redFlagsCount: redCount,
    };
  }, [activeCandidate.checklist, activeCandidate.dayRatings, activeCandidate.questionRatings]);

  return (
    <div className="min-h-screen bg-[#fff0f5] text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <Header
        candidates={candidates}
        activeCandidate={activeCandidate}
        onSelectCandidate={handleSelectCandidate}
        onOpenCandidateModal={() => setCandidateModalOpen(true)}
        onOpenGuideModal={() => setGuideModalOpen(true)}
        onOpenExportImportModal={() => setExportImportModalOpen(true)}
        totalCriteriaRated={metrics.totalCriteriaRated}
        totalDaysCompleted={metrics.totalDaysCompleted}
        compatibilityScore={metrics.compatibilityScore}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-3.5 pb-24">
        {activeTab === 'checklist' && (
          <ChecklistView
            candidate={activeCandidate}
            onUpdateRating={handleUpdateRating}
          />
        )}

        {activeTab === '30hari' && (
          <ThirtyDaysView
            candidate={activeCandidate}
            onUpdateDayRating={handleUpdateDayRating}
          />
        )}

        {activeTab === 'analisis' && (
          <AnalysisView
            candidate={activeCandidate}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'jurnal' && (
          <JournalView
            candidate={activeCandidate}
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onUpdateEntry={handleUpdateJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        )}

        {activeTab === 'soalan' && (
          <QuestionsView
            candidate={activeCandidate}
            onUpdateQuestionRating={handleUpdateQuestionRating}
          />
        )}
      </main>

      {/* Bottom 3D Tactile Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        redFlagsCount={metrics.redFlagsCount}
      />

      {/* Modals */}
      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      <CandidateModal
        isOpen={candidateModalOpen}
        onClose={() => setCandidateModalOpen(false)}
        candidates={candidates}
        activeCandidateId={activeCandidate.id}
        onSelectCandidate={handleSelectCandidate}
        onAddCandidate={handleAddCandidate}
        onRenameCandidate={handleRenameCandidate}
        onDeleteCandidate={handleDeleteCandidate}
      />

      <ExportImportModal
        isOpen={exportImportModalOpen}
        onClose={() => setExportImportModalOpen(false)}
        onDataRestored={handleDataRestored}
      />
    </div>
  );
}
