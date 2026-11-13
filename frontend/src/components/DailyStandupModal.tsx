import React, { useState } from 'react';
import { X, Copy, Check, FileText, Sparkles, Share2 } from 'lucide-react';
import { Task } from '../types';

interface DailyStandupModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  streakDays: number;
  totalHours: number;
}

export const DailyStandupModal: React.FC<DailyStandupModalProps> = ({
  isOpen,
  onClose,
  tasks,
  streakDays,
  totalHours
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const completedToday = tasks.filter(t => t.status === 'Done');
  const inProgress = tasks.filter(t => t.status === 'In Progress');
  const upcoming = tasks.filter(t => t.status === 'To Do').slice(0, 3);

  // Build markdown summary
  let summary = `🚀 **Daily Engineering Progress & Career Log** (${todayStr})\n`;
  summary += `🔥 **Current Streak:** ${streakDays} days | ⏳ **Total Hours Invested:** ${totalHours}h\n\n`;

  summary += `✅ **Completed Goals & Milestones:**\n`;
  if (completedToday.length === 0) {
    summary += `  - No tasks finalized yet today (focusing on in-progress items)\n`;
  } else {
    completedToday.forEach(t => {
      summary += `  - [${t.category}] **${t.title}** (${t.actualHours}h logged)\n`;
      if (t.reflectionNotes) {
        summary += `    💡 *Learning:* ${t.reflectionNotes}\n`;
      }
    });
  }

  summary += `\n🚧 **Currently In Progress:**\n`;
  if (inProgress.length === 0) {
    summary += `  - Ready to pick up next backlog sprint items\n`;
  } else {
    inProgress.forEach(t => {
      const subs = t.subtasks.length > 0
        ? ` (${t.subtasks.filter(s => s.completed).length}/${t.subtasks.length} subtasks)`
        : '';
      summary += `  - [${t.category}] **${t.title}**${subs}\n`;
    });
  }

  summary += `\n🎯 **Top Next Priorities:**\n`;
  upcoming.forEach(t => {
    summary += `  - ${t.title} (${t.priority} Priority)\n`;
  });

  summary += `\n---\n*Logged via CareerPulse CI/CD Tracker*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5 text-cyan-400" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Daily Standup & Progress Report</h2>
              <p className="text-[11px] text-slate-400">
                1-click formatted summary for standups, Discord study groups, or career notes
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

        {/* Content Box */}
        <div className="relative my-4">
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
            {summary}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            {completedToday.length} completed, {inProgress.length} active
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

