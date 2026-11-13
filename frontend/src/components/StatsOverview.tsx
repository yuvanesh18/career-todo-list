import React from 'react';
import { Flame, CheckCircle2, Clock, Zap, Target } from 'lucide-react';
import { AnalyticsSummary } from '../types';

interface StatsOverviewProps {
  analytics: AnalyticsSummary;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Streak Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-orange-500/40 transition-all">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Daily Streak
          </span>
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {analytics.currentStreakDays}
          </span>
          <span className="text-xs font-medium text-orange-400">
            {analytics.currentStreakDays === 1 ? 'day active' : 'days active'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400">
          Consistency is what lands senior offers 🚀
        </div>
      </div>

      {/* Completion Rate Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-emerald-500/40 transition-all">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Completion Rate
          </span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {analytics.completionRate}%
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({analytics.completedTasks}/{analytics.totalTasks} Done)
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-700"
            style={{ width: `${analytics.completionRate}%` }}
          />
        </div>
      </div>

      {/* Hours Invested Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-indigo-500/40 transition-all">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hours Invested
          </span>
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {analytics.totalActualHours}h
          </span>
          <span className="text-xs text-slate-400">
            / {analytics.totalEstimatedHours}h est.
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400">
          Total focused study & building time
        </div>
      </div>

      {/* Pomodoro Focus Sessions Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 shadow-md relative overflow-hidden group hover:border-pink-500/40 transition-all">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Focus Sessions
          </span>
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {analytics.totalPomodoros}
          </span>
          <span className="text-xs text-pink-400 font-medium">
            pomodoros
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400">
          {(analytics.totalPomodoros * 25 / 60).toFixed(1)} hours in deep work flow state
        </div>
      </div>
    </div>
  );
};

