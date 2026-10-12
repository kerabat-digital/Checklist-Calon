import React from 'react';
import { ActiveTab } from '../types';
import { 
  CheckSquare, 
  Calendar, 
  PieChart, 
  BookOpen, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  redFlagsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  redFlagsCount,
}) => {
  const tabs = [
    {
      id: 'checklist' as ActiveTab,
      label: 'Checklist',
      sublabel: '25 Kriteria',
      icon: CheckSquare,
    },
    {
      id: '30hari' as ActiveTab,
      label: '30 Hari',
      sublabel: 'Perjalanan',
      icon: Calendar,
    },
    {
      id: 'analisis' as ActiveTab,
      label: 'Analisis',
      sublabel: 'Diagnosis',
      icon: PieChart,
      hasAlert: redFlagsCount > 0,
    },
    {
      id: 'jurnal' as ActiveTab,
      label: 'Jurnal',
      sublabel: 'Observasi',
      icon: BookOpen,
    },
    {
      id: 'soalan' as ActiveTab,
      label: 'Pertanyaan',
      sublabel: '32 Soal',
      icon: HelpCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#fcc2d7] px-2 py-2 shadow-[0_-4px_20px_rgba(215,15,100,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-100 select-none ${
                isActive
                  ? 'bg-gradient-to-b from-[#d70f64] to-[#c20c58] text-white border-b-[4px] border-[#8a073d] shadow-md shadow-[#d70f64]/25 active:translate-y-0.5 active:border-b-[1px]'
                  : 'bg-white text-slate-700 hover:bg-[#fff0f5] border border-[#fcc2d7] border-b-[3.5px] border-b-[#f497be] active:translate-y-0.5 active:border-b-[1px]'
              }`}
            >
              {/* Alert dot if analysis has red flags */}
              {tab.hasAlert && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
              )}

              <IconComponent 
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 text-white' : 'text-slate-600'
                }`} 
              />
              <span className={`text-[10px] sm:text-[11px] font-black tracking-tight mt-0.5 leading-tight ${
                isActive ? 'text-white' : 'text-slate-800'
              }`}>
                {tab.label}
              </span>
              <span className={`text-[8px] sm:text-[9px] font-medium leading-none hidden xs:inline ${
                isActive ? 'text-white/80' : 'text-slate-400'
              }`}>
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
