import React, { useState } from 'react';
import { CalendarCheck, ExternalLink, Calendar as CalIcon, List, Check } from 'lucide-react';
import { DailyGroupedActivity } from '../types';
import { DailyCalendar } from './DailyCalendar';
import { getLocalDateString } from '../utils/dateUtils';

interface DailyActivityViewProps {
  activityList: DailyGroupedActivity[];
  streakDays: number;
}

export const DailyActivityView: React.FC<DailyActivityViewProps> = ({
  activityList,
  streakDays
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');

  const todayStr = getLocalDateString(new Date());

  return (
    <div className="space-y-6">
      {/* Header and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-600" />
            <span>Daily Activity Tracker</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor questions and goals solved day by day based on your local calendar
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalIcon className="w-3.5 h-3.5" />
            <span>Activity Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'timeline'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
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
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs shadow-xs">
              <p className="font-semibold text-slate-700">No completed tasks recorded yet</p>
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
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={group.date}
                  className={`p-5 rounded-2xl border transition-all shadow-xs ${
                    isToday
                      ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-50'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        {isToday ? `Today (${formattedDate})` : formattedDate}
                      </span>
                      {isToday && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Today
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                      {group.count} {group.count === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.items.map((item, idx) => (
                      <div
                        key={`${item.taskId}-${idx}`}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800 truncate">
                            {item.taskTitle}
                          </span>
                          <span className="text-[11px] text-slate-500 hidden sm:inline">
                            • {item.topic}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {item.difficulty && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                item.difficulty === 'Easy'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : item.difficulty === 'Medium'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              {item.difficulty}
                            </span>
                          )}

                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                            >
                              <span>LeetCode</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
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
