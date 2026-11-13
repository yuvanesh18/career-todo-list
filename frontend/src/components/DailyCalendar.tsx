import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Flame,
  Award,
  Sparkles,
  Check
} from 'lucide-react';
import { DailyGroupedActivity } from '../types';
import { getLocalDateString } from '../utils/dateUtils';

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

  const todayStr = getLocalDateString(today);
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

  // Calculate calendar days in local month
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
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Active Streak
            </span>
            <span className="text-2xl font-black text-amber-600 flex items-center gap-1.5 mt-1">
              <Flame className="w-5 h-5 text-amber-500" />
              {streakDays} Days
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Local consecutive</span>
        </div>

        {/* Active Days This Month */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Active Days in {monthNames[currentMonth]}
            </span>
            <span className="text-2xl font-black text-indigo-600 flex items-center gap-1.5 mt-1">
              <CalendarIcon className="w-5 h-5 text-indigo-500" />
              {activeDaysThisMonth} Days
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Recorded activity</span>
        </div>

        {/* Total Questions Solved This Month */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Solved in {monthNames[currentMonth]}
            </span>
            <span className="text-2xl font-black text-emerald-600 flex items-center gap-1.5 mt-1">
              <Award className="w-5 h-5 text-emerald-500" />
              {problemsSolvedThisMonth} Solved
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">DSA & Tasks</span>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        {/* Month Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleGoToToday}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              title="Next Month"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mt-4 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {/* Empty padding slots before first day */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="h-20 sm:h-24 rounded-xl bg-slate-50/50 border border-dashed border-slate-200/60"
            />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayMonthStr = String(currentMonth + 1).padStart(2, '0');
            const dayDayStr = String(dayNum).padStart(2, '0');
            const dateStr = `${currentYear}-${dayMonthStr}-${dayDayStr}`;

            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const activity = activityMap.get(dateStr);
            const count = activity ? activity.count : 0;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-20 sm:h-24 p-2 rounded-xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-50/60 border-indigo-600 ring-2 ring-indigo-200 shadow-sm'
                    : isToday
                    ? 'bg-amber-50/40 border-amber-300'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/80'
                }`}
              >
                {/* Day Number and Today Marker */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-bold ${
                      isSelected
                        ? 'text-indigo-700 font-extrabold'
                        : isToday
                        ? 'text-amber-800 font-extrabold'
                        : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md bg-amber-500 text-white uppercase tracking-tight">
                      Today
                    </span>
                  )}
                </div>

                {/* Activity Badge */}
                {count > 0 ? (
                  <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-lg text-emerald-800 text-[10px] font-extrabold self-start shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{count} solved</span>
                  </div>
                ) : (
                  <div className="h-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Drill-down Drawer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {selectedDateFormatted}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedDayActivity ? `${selectedDayActivity.count} questions solved` : 'No solved questions logged'}
              </p>
            </div>
          </div>

          {selectedDayActivity && (
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedDayActivity.count} Completed</span>
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="mt-4">
          {!selectedDayActivity || selectedDayActivity.items.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-semibold text-slate-600">No activity recorded for this day</p>
              <p className="text-xs text-slate-400 mt-1">
                Select another day with a green badge, or mark questions complete in the Goals tab!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {selectedDayActivity.items.map((item, idx) => (
                <div
                  key={`${item.taskId}-${idx}`}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {item.taskTitle}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-medium text-slate-500">
                          {item.goalTitle} • {item.topic}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.difficulty && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
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
                        className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
