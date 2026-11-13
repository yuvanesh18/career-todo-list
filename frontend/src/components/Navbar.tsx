import React, { useRef } from 'react';
import {
  Target,
  CalendarCheck,
  Flame,
  CheckCircle2,
  Plus,
  Layers,
  Download,
  Upload,
  User as UserIcon,
  LogOut,
  LogIn,
  Server
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  streakDays: number;
  completedTodayCount: number;
  user: UserProfile | null;
  isServerOnline: boolean;
  onOpenServerModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenNewGoalModal: () => void;
  onExportBackup: () => void;
  onImportBackup: (jsonContent: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  streakDays,
  completedTodayCount,
  user,
  isServerOnline,
  onOpenServerModal,
  onOpenAuthModal,
  onLogout,
  onOpenNewGoalModal,
  onExportBackup,
  onImportBackup
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) onImportBackup(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CareerPulse
              </span>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Multi-Goal & Daily Activity Tracker
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onTabChange('goals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'goals'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Goals & Tasks</span>
            </button>
            <button
              onClick={() => onTabChange('daily-tracker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'daily-tracker'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Daily Activity Log</span>
            </button>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{streakDays}d Streak</span>
            </div>

            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                completedTodayCount > 0
                  ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedTodayCount} Completed Today</span>
            </div>

            <button
              onClick={onOpenNewGoalModal}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-indigo-600/25"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Goal</span>
            </button>

            {/* Permanent DB Backup & Restore */}
            <div className="flex items-center border-l border-slate-800 pl-2 gap-1">
              <button
                onClick={onExportBackup}
                title="Backup Entire Database to File"
                className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition text-xs flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">Backup DB</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                title="Restore Database from Backup File"
                className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition text-xs flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">Restore</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={onOpenServerModal}
                title="Cloud Backend / Render Connection"
                className={`p-1.5 rounded-lg border transition text-xs flex items-center gap-1.5 ${
                  isServerOnline
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40'
                    : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">
                  {isServerOnline ? 'Cloud DB Active' : 'Local / Offline'}
                </span>
              </button>
            </div>

            {/* User Profile / Auth Button */}
            <div className="flex items-center border-l border-slate-800 pl-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <div
                    title={user.email}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-medium max-w-[100px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
