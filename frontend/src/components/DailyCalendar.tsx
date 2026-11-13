import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Flame,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { DailyGroupedActivity, DailyActivityItem } from '../types';

interface DailyCalendarProps {
  activityList: DailyGroupedActivity[];
  streakDays: number;
}

export const DailyCalendar: React.FC<DailyCalendarProps> = ({
  activityList,
  streakDays
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed

  const todayStr = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Map of date string (YYYY-MM-DD) -> DailyGroupedActivity
  const activityMap = new Map<string, DailyGroupedActivity>();
  activityList.forEach(a => activityMap.set(a.date, a));

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(todayStr);
  };

  // Calculate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate month stats
  const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const thisMonthActivities = activityList.filter(a => a.date.startsWith(monthPrefix));
  const activeDaysThisMonth = thisMonthActivities.length;
  const problemsSolvedThisMonth = thisMonthActivities.reduce((acc, a) => acc + a.count, 0);

  // Selected date activity items
  const selectedDayActivity = activityMap.get(selectedDate);

  const selectedDateFormatted = new Date(selectedDate + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Top Month Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Streak
            </span>
            <span className="text-2xl font-black text-orange-400 flex items-center gap-1.5 mt-0.5">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              {streakDays} Days
            </span>
          </div>
          <span className="text-xs text-slate-500">Consecutive days active</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Solved in {monthNames[currentMonth]}
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
              {problemsSolvedThisMonth} Tasks
            </span>
          </div>
          <span className="text-xs text-slate-500">{activeDaysThisMonth} active days</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Total Solved All-Time
            </span>
            <span className="text-2xl font-black text-indigo-400 mt-0.5 block">
              {activityList.reduce((acc, a) => acc + a.count, 0)} Tasks
            </span>
          </div>
          <span className="text-xs text-slate-500">Across all goals</span>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        {/* Calendar Month Navigation Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <p className="text-xs text-slate-400">
                Click any day to see the exact questions & tasks you completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToToday}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Today
            </button>
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              title="Next Month"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty prefix cells */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-20 sm:h-24 rounded-2xl bg-slate-950/20 border border-transparent" />
          ))}

          {/* Month Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const dayActivity = activityMap.get(dateStr);
            const count = dayActivity ? dayActivity.count : 0;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-20 sm:h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : isToday
                    ? 'bg-slate-900 border-indigo-500/50 hover:border-indigo-400'
                    : count > 0
                    ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Day Number and Today Indicator */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday
                        ? 'bg-indigo-600 text-white'
                        : isSelected
                        ? 'text-indigo-400 font-black'
                        : 'text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {isToday && (
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest hidden sm:inline">
                      Today
                    </span>
                  )}
                </div>

                {/* Completed Badge Indicator */}
                {count > 0 ? (
                  <div className="flex items-center gap-1">
                    <span className="w-full py-1 px-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-extrabold flex items-center justify-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{count} solved</span>
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-700 opacity-0 group-hover:opacity-100 transition">
                    No tasks
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Activity Drill-down */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Activity for {selectedDateFormatted}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedDayActivity
                  ? `${selectedDayActivity.count} question(s) completed on this day`
                  : 'No tasks completed on this date'}
              </p>
            </div>
          </div>

          {selectedDate === todayStr && (
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              Today's Log
            </span>
          )}
        </div>

        {/* List of Tasks for this date */}
        {!selectedDayActivity || selectedDayActivity.items.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-950/50 border border-dashed border-slate-800 text-slate-400 text-xs">
            <p className="font-semibold text-slate-300">No activity recorded on {selectedDate}</p>
            <p className="text-slate-500 mt-1">
              Select another day on the calendar or complete tasks under your goals to log activity!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {selectedDayActivity.items.map(item => {
              const timeStr = item.completedAt
                ? new Date(item.completedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : '';

              return (
                <div
                  key={item.taskId}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />

                    <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                        {item.goalTitle}
                      </span>

                      <span className="text-xs font-semibold text-white">
                        {item.taskTitle}
                      </span>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open in LeetCode"
                          className="text-slate-500 hover:text-cyan-400 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
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
        )}
      </div>
    </div>
  );
};
