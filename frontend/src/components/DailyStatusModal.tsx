import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Clock, Flame, Calendar, Sparkles } from 'lucide-react';
import { DailyLog, Goal } from '../types';

interface DailyStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeGoal: Goal | null;
  onSaveStatus: (log: Partial<DailyLog>) => void;
  existingTodayLog?: DailyLog | null;
}

export const DailyStatusModal: React.FC<DailyStatusModalProps> = ({
  isOpen,
  onClose,
  activeGoal,
  onSaveStatus,
  existingTodayLog
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(existingTodayLog?.date || todayStr);
  const [statusSummary, setStatusSummary] = useState(existingTodayLog?.statusSummary || '');
  const [hoursSpent, setHoursSpent] = useState(existingTodayLog?.hoursSpent || 2);
  const [energyLevel, setEnergyLevel] = useState<'High' | 'Medium' | 'Low'>(
    existingTodayLog?.energyLevel || 'High'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusSummary.trim()) return;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    onSaveStatus({
      date,
      goalId: activeGoal?.id || null,
      statusSummary: statusSummary.trim(),
      hoursSpent: Number(hoursSpent) || 1,
      energyLevel
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Daily Progress Check-in</h2>
              <p className="text-[11px] text-slate-400">
                Log what you achieved today towards: {activeGoal?.title || 'your goal'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date & Hours row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Hours Invested Today
              </label>
              <input
                type="number"
                min="0.25"
                step="0.25"
                required
                value={hoursSpent}
                onChange={e => setHoursSpent(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Energy & Focus */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Focus & Energy Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['High', 'Medium', 'Low'] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setEnergyLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    energyLevel === lvl
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl === 'High' ? '🔥 High Focus' : lvl === 'Medium' ? '👍 Steady' : '⏳ Low Energy'}
                </button>
              ))}
            </div>
          </div>

          {/* Status / What was done */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Today's Status Update <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={statusSummary}
              onChange={e => setStatusSummary(e.target.value)}
              placeholder="What specifically did you work on today? e.g.:
• Solved 2 LeetCode questions on Binary Search
• Designed Redis rate limiter architecture
• Read Docker documentation on multi-stage layers"
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Daily Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
