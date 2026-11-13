import React from 'react';
import { Calendar, Clock, Flame, BookOpen, Plus, Sparkles } from 'lucide-react';
import { DailyLog } from '../types';

interface DailyStatusTimelineProps {
  logs: DailyLog[];
  onOpenStatusModal: () => void;
}

export const DailyStatusTimeline: React.FC<DailyStatusTimelineProps> = ({
  logs,
  onOpenStatusModal
}) => {
  const totalHours = logs.reduce((acc, l) => acc + (l.hoursSpent || 0), 0);

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Daily Progress Journal & History
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {logs.length} check-ins logged • {totalHours.toFixed(1)} total study & build hours
          </p>
        </div>

        <button
          onClick={onOpenStatusModal}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
        >
          <Plus className="w-3.5 h-3.5" /> Log Today's Status
        </button>
      </div>

      {/* Timeline List */}
      {logs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-400 text-xs">
          <p className="font-semibold text-slate-300">No daily logs recorded yet</p>
          <p className="text-slate-500 mt-1">
            Log your daily progress above to start keeping track of your journey!
          </p>
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {logs.map((log, index) => {
            const dateObj = new Date(log.date);
            const dateFormatted = dateObj.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            });

            return (
              <div key={log.id} className="relative pl-8 group">
                {/* Dot on timeline */}
                <div className="absolute left-2 top-3 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 ring-2 ring-indigo-500/20 group-hover:scale-125 transition-all" />

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition shadow-sm">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {dateFormatted}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        ({log.date})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.hoursSpent}h
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                          log.energyLevel === 'High'
                            ? 'bg-orange-950/60 text-orange-400 border-orange-500/30'
                            : log.energyLevel === 'Medium'
                            ? 'bg-blue-950/60 text-blue-400 border-blue-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {log.energyLevel === 'High' ? '🔥 High' : log.energyLevel === 'Medium' ? '👍 Steady' : '⏳ Low'}
                      </span>
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                    {log.statusSummary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
