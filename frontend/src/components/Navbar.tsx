import React from 'react';
import { Sparkles, Flame, Clock, CheckCircle2, ListTodo, BookOpen, Target } from 'lucide-react';
import { ViewTab } from '../types';

interface NavbarProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  streakDays: number;
  totalHours: number;
  todayLogged: boolean;
  onOpenStatusModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  streakDays,
  totalHours,
  todayLogged,
  onOpenStatusModal
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CareerPulse
              </span>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Short-Term Goals & Daily Progress Tracker
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onTabChange('tasks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'tasks'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span>Daily To-Do</span>
            </button>
            <button
              onClick={() => onTabChange('journal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentTab === 'journal'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Status Journal</span>
            </button>
          </div>

          {/* Quick Stats & Action */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{streakDays}d Streak</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{totalHours}h Logged</span>
            </div>

            <button
              onClick={onOpenStatusModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                todayLogged
                  ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              {todayLogged ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Today Logged</span>
                </>
              ) : (
                <>
                  <span>+ Log Status</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
