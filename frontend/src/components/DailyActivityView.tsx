import React from 'react';
import { CalendarCheck, CheckCircle2, Clock, ExternalLink, Flame, Target, Sparkles } from 'lucide-react';
import { DailyGroupedActivity, DailyActivityItem } from '../types';

interface DailyActivityViewProps {
  activityList: DailyGroupedActivity[];
  streakDays: number;
}

export const DailyActivityView: React.FC<DailyActivityViewProps> = ({
  activityList,
  streakDays
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayGroup = activityList.find(a => a.date === todayStr);
  const totalCompletedAllTime = activityList.reduce((acc, g) => acc + g.count, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/40 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CalendarCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Daily Accomplishments Tracker
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              {todayGroup ? `${todayGroup.count} Tasks Completed Today!` : "No Tasks Completed Today Yet"}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Track your daily consistency across all goals. Every question solved and milestone
              completed is recorded here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Active Streak
              </span>
              <span className="text-2xl font-black text-orange-400 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-500" />
                {streakDays}d
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Solved
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {totalCompletedAllTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Activity Groups */}
      <div className="space-y-6">
        {activityList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-400 text-xs">
            <p className="font-semibold text-slate-300">No completed tasks recorded yet</p>
            <p className="text-slate-500 mt-1">
              Check off tasks under your goals (e.g. Two Sum under Master DSA) to see your daily
              history here!
            </p>
          </div>
        ) : (
          activityList.map(group => {
            const isToday = group.date === todayStr;
            const dateObj = new Date(group.date + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={group.date}
                className={`p-5 rounded-3xl border transition shadow-sm ${
                  isToday
                    ? 'bg-slate-900 border-indigo-500/40 shadow-indigo-500/5'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {/* Date Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">
                      {isToday ? `Today (${formattedDate})` : formattedDate}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Active Today
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300">
                    {group.count} {group.count === 1 ? 'task completed' : 'tasks completed'}
                  </span>
                </div>

                {/* List of Tasks completed that day */}
                <div className="space-y-2">
                  {group.items.map(item => {
                    const timeStr = item.completedAt
                      ? new Date(item.completedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '';

                    return (
                      <div
                        key={item.taskId}
                        className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />

                          <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                            {/* Goal Badge */}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                              {item.goalTitle}
                            </span>

                            {/* Task Title */}
                            <span className="text-xs font-semibold text-slate-200">
                              {item.taskTitle}
                            </span>

                            {/* LeetCode Link */}
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-cyan-400 transition"
                                title="Open LeetCode problem"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Topic & Difficulty */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {item.topic}
                          </span>

                          {item.difficulty && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                item.difficulty === 'Easy'
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                                  : item.difficulty === 'Medium'
                                  ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                                  : 'bg-red-950/60 text-red-400 border-red-500/30'
                              }`}
                            >
                              {item.difficulty}
                            </span>
                          )}

                          {timeStr && (
                            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                              {timeStr}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
