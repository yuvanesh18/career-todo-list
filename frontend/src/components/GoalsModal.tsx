import React, { useState } from 'react';
import { X, Target, Plus, CheckCircle, Calendar, Clock, Award } from 'lucide-react';
import { Goal } from '../types';

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goals: Goal[];
  onSelectActiveGoal: (goalId: string) => void;
  onCreateGoal: (goal: Partial<Goal>) => void;
}

export const GoalsModal: React.FC<GoalsModalProps> = ({
  isOpen,
  onClose,
  goals,
  onSelectActiveGoal,
  onCreateGoal
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMonths, setTargetMonths] = useState(2);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  // Compute default end date based on targetMonths
  const computeEndDate = (start: string, months: number) => {
    const d = new Date(start || Date.now());
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split('T')[0];
  };

  const [targetEndDate, setTargetEndDate] = useState(computeEndDate(startDate, targetMonths));

  const handleMonthsChange = (m: number) => {
    setTargetMonths(m);
    setTargetEndDate(computeEndDate(startDate, m));
  };

  const handleStartDateChange = (s: string) => {
    setStartDate(s);
    setTargetEndDate(computeEndDate(s, targetMonths));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateGoal({
      title: title.trim(),
      description: description.trim(),
      targetMonths,
      startDate,
      targetEndDate,
      status: 'Active',
      category: 'Career Growth'
    });

    setTitle('');
    setDescription('');
    setIsCreating(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Short-Term Goals (in Months)</h2>
              <p className="text-[11px] text-slate-400">
                Define and track milestones for 1 to 6 months
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

        {/* Existing Goals List */}
        {!isCreating && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Your Goals Roadmap
              </span>
              <button
                onClick={() => setIsCreating(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-3.5 h-3.5" /> Create New Goal
              </button>
            </div>

            <div className="space-y-3">
              {goals.map(goal => {
                const isActive = goal.status === 'Active';

                return (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-indigo-950/30 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isActive
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isActive ? '● Active Goal' : 'On Hold'}
                          </span>
                        </div>
                        {goal.description && (
                          <p className="text-xs text-slate-400 mt-1">{goal.description}</p>
                        )}
                      </div>

                      {!isActive && (
                        <button
                          onClick={() => onSelectActiveGoal(goal.id)}
                          className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold transition flex-shrink-0"
                        >
                          Set Active
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        Duration: {goal.targetMonths} {goal.targetMonths === 1 ? 'Month' : 'Months'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        {goal.startDate} to {goal.targetEndDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Create New Goal Form */}
        {isCreating && (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Goal Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Clear AWS Certified Solutions Architect / Land Mid-Senior DevOps Role"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Target Duration in Months */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Target Timeline (in Months)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 6].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMonthsChange(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      targetMonths === m
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Start and Target End Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={e => handleStartDateChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Target End Date
                </label>
                <input
                  type="date"
                  required
                  value={targetEndDate}
                  onChange={e => setTargetEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Description / Key Milestones
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What will you accomplish in these months? (e.g. Month 1: Complete Video Labs, Month 2: Build 2 Projects & Take Practice Exams)"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                Save & Set Active Goal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
