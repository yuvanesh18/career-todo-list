import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, Clock, ExternalLink, Flame, Calendar as CalIcon, List } from 'lucide-react';
import { DailyGroupedActivity } from '../types';
import { DailyCalendar } from './DailyCalendar';

interface DailyActivityViewProps {
  activityList: DailyGroupedActivity[];
  streakDays: number;
}

export const DailyActivityView: React.FC<DailyActivityViewProps> = ({
  activityList,
  streakDays
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayGroup = activityList.find(a => a.date === todayStr);

  return (
    <div className="space-y-6">
      {/* View Switcher: Calendar vs Timeline */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-400" />
            Daily Activity Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor questions and tasks completed across all your goals daily
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'calendar'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalIcon className="w-3.5 h-3.5" />
            <span>Activity Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'timeline'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Timeline</span>
          </button>
        </div>
      </div>

      {/* Main View */}
      {viewMode === 'calendar' ? (
        <DailyCalendar activityList={activityList} streakDays={streakDays} />
      ) : (
        <div className="space-y-4">
          {activityList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-400 text-xs">
              <p className="font-semibold text-slate-300">No completed tasks recorded yet</p>
              <p className="text-slate-500 mt-1">
                Check off questions under your goals to build your daily completion history!
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
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                                {item.goalTitle}
                              </span>

                              <span className="text-xs font-semibold text-slate-200">
                                {item.taskTitle}
                              </span>

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
      )}
    </div>
  );
};
