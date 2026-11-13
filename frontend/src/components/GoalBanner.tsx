import React from 'react';
import { Target, Calendar, Clock, Sparkles, CheckCircle2, PlusCircle, Edit3 } from 'lucide-react';
import { DashboardSummary } from '../types';

interface GoalBannerProps {
  summary: DashboardSummary;
  onOpenStatusModal: () => void;
  onOpenGoalsModal: () => void;
}

export const GoalBanner: React.FC<GoalBannerProps> = ({
  summary,
  onOpenStatusModal,
  onOpenGoalsModal
}) => {
  const goal = summary.activeGoal;

  if (!goal) {
    return (
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">No Active Short-Term Goal</h2>
          <p className="text-xs text-slate-400 mt-1">
            Set a target goal for 1 to 6 months to start tracking your daily tasks and progress.
          </p>
        </div>
        <button
          onClick={onOpenGoalsModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
        >
          + Create Goal
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl mb-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase tracking-wider border border-indigo-500/30">
              {goal.targetMonths} Month Short-Term Goal
            </span>
            <span className="text-xs text-slate-400">
              {goal.startDate} ➔ {goal.targetEndDate}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            {goal.title}
          </h1>
          {goal.description && (
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {goal.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={onOpenStatusModal}
            className={`flex-1 md:flex-initial px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
              summary.todayLoggedStatus
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 text-white shadow-indigo-600/30 animate-pulse'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            {summary.todayLoggedStatus ? "Update Today's Status" : "Log Today's Status"}
          </button>

          <button
            onClick={onOpenGoalsModal}
            title="Manage Goals"
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <Target className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Countdown Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs relative z-10">
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Goal Countdown
          </span>
          <span className="text-lg font-extrabold text-amber-400">
            {summary.daysRemaining} days left
          </span>
          <span className="text-[10px] text-slate-500 block">
            Day {summary.currentDayInGoal} of {summary.totalDays}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Task Progress
          </span>
          <span className="text-lg font-extrabold text-indigo-400">
            {summary.goalProgressPercent}% Done
          </span>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${summary.goalProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Today's To-Do
          </span>
          <span className="text-lg font-extrabold text-emerald-400">
            {summary.todayTasksCompleted}/{summary.todayTasksTotal} Tasks
          </span>
          <span className="text-[10px] text-slate-500 block">
            {summary.todayTasksTotal === 0 ? 'No tasks scheduled' : 'For today'}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Today's Check-in
          </span>
          <span
            className={`text-sm font-bold flex items-center gap-1 mt-1 ${
              summary.todayLoggedStatus ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {summary.todayLoggedStatus ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Logged!
              </>
            ) : (
              'Pending Status'
            )}
          </span>
          <span className="text-[10px] text-slate-500 block">
            {summary.totalHoursSpent}h total recorded
          </span>
        </div>
      </div>
    </div>
  );
};
