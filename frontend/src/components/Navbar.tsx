import React, { useRef } from 'react';
import {
  Flame,
  Clock,
  Plus,
  Timer,
  FileText,
  Download,
  Upload,
  RotateCcw,
  LayoutGrid,
  ListTodo,
  BarChart3,
  Sparkles,
  Server,
  CloudOff
} from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  streakDays: number;
  totalActualHours: number;
  isServerConnected: boolean;
  onOpenNewTaskModal: () => void;
  onOpenPomodoroModal: () => void;
  onOpenStandupModal: () => void;
  onResetSeed: () => void;
  onExport: () => void;
  onImport: (jsonData: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  streakDays,
  totalActualHours,
  isServerConnected,
  onOpenNewTaskModal,
  onOpenPomodoroModal,
  onOpenStandupModal,
  onResetSeed,
  onExport,
  onImport
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) onImport(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  CareerPulse
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v1.0 Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Daily Engineering Progress & Goal Tracker
              </p>
            </div>
          </div>

          {/* Quick Metrics (Streak & Hours) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs font-semibold shadow-inner">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>{streakDays} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{totalActualHours}h Invested</span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
                isServerConnected
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
              }`}
              title={
                isServerConnected
                  ? 'Connected to local REST backend & SQLite database'
                  : 'Running in offline / static mode with LocalStorage persistence'
              }
            >
              {isServerConnected ? (
                <>
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden lg:inline">Backend API</span>
                </>
              ) : (
                <>
                  <CloudOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline">Local Sync</span>
                </>
              )}
            </div>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewChange('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'list'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => onViewChange('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Insights</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPomodoroModal}
              title="Open Focus Pomodoro Timer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-indigo-500/50 transition-all text-xs font-medium flex items-center gap-1.5"
            >
              <Timer className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline">Focus Timer</span>
            </button>

            <button
              onClick={onOpenStandupModal}
              title="Generate Daily Standup & Career Log"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-indigo-500/50 transition-all text-xs font-medium flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Daily Standup</span>
            </button>

            <button
              onClick={onOpenNewTaskModal}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Goal</span>
            </button>

            {/* Overflow utility dropdown / buttons */}
            <div className="flex items-center border-l border-slate-800 pl-2 ml-1 gap-1">
              <button
                onClick={onExport}
                title="Export Career Data (JSON)"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Import Career Data (JSON)"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={onResetSeed}
                title="Restore Sample Career Roadmap"
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
