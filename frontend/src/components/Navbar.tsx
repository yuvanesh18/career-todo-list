import React from 'react';
import {
  Target,
  CalendarCheck,
  Flame,
  CheckCircle2,
  Layers,
  LogOut,
  LogIn
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  streakDays: number;
  completedTodayCount: number;
  user: UserProfile | null;
  isServerOnline: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  streakDays,
  completedTodayCount,
  user,
  isServerOnline,
  onOpenAuthModal,
  onLogout
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                CareerPulse
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                169 DSA Grind & Career Roadmap
              </p>
            </div>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onTabChange('goals')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'goals'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Goals & Roadmap</span>
            </button>
            <button
              onClick={() => onTabChange('daily-tracker')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'daily-tracker'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Activity Calendar</span>
            </button>
          </div>

          {/* Right Metrics & Session Actions */}
          <div className="flex items-center gap-2">
            {/* Live Server Indicator */}
            <div
              title={isServerOnline ? 'Live Render Backend & Supabase Connected' : 'Connecting to Render Backend...'}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-600"
            >
              <span className={`w-2 h-2 rounded-full ${isServerOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isServerOnline ? 'Cloud DB Active' : 'Connecting...'}</span>
            </div>

            {/* Streak Counter */}
            <div
              title={`${streakDays} consecutive active days`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-xs"
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Completed Today Counter */}
            <div
              title={`${completedTodayCount} questions solved today`}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors shadow-xs ${
                completedTodayCount > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${completedTodayCount > 0 ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{completedTodayCount} Done Today</span>
            </div>

            {/* User Session / Account */}
            <div className="flex items-center border-l border-slate-200 pl-2">
              {user ? (
                <div className="flex items-center gap-1.5">
                  <div
                    title={`Logged in as ${user.name} (${user.email})`}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold text-[11px] flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[110px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out of Session"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
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
