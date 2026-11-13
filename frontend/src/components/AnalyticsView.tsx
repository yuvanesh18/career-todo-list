import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Target,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { AnalyticsSummary, Task } from '../types';

interface AnalyticsViewProps {
  analytics: AnalyticsSummary;
  tasks: Task[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, tasks }) => {
  // Compute all unique tags and occurrences
  const tagCounts: Record<string, number> = {};
  tasks.forEach(t => {
    t.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const maxWeeklyCount = Math.max(...analytics.weeklyCompleted.map(w => w.count), 1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white">Career Velocity & Growth Insights</h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Track your daily investment in key engineering pillars. High consistency correlates
              directly with interview confidence and successful career milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Completion Rate
              </span>
              <span className="text-2xl font-black text-indigo-400">
                {analytics.completionRate}%
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Active Goals
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {analytics.totalTasks - analytics.completedTasks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 7-Day Velocity & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Activity Trend Bar Chart */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                7-Day Completion Velocity
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Tasks finished per day</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
            {analytics.weeklyCompleted.map(item => {
              const heightPercent = Math.max((item.count / maxWeeklyCount) * 100, 8);
              const dayLabel = new Date(item.date).toLocaleDateString(undefined, {
                weekday: 'short'
              });

              return (
                <div key={item.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                    {item.count}
                  </span>
                  <div className="w-full max-w-[36px] bg-slate-800 rounded-t-lg h-32 flex items-end p-0.5">
                    <div
                      className={`w-full rounded-t-md transition-all duration-700 ${
                        item.count > 0
                          ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 shadow-lg shadow-indigo-500/30'
                          : 'bg-slate-700/50'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Priority Balance
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Triage health</span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(analytics.priorityBreakdown).map(([priority, count]) => {
              const percent = analytics.totalTasks > 0
                ? Math.round((count / analytics.totalTasks) * 100)
                : 0;

              const color =
                priority === 'Urgent'
                  ? 'bg-red-500'
                  : priority === 'High'
                  ? 'bg-orange-500'
                  : priority === 'Medium'
                  ? 'bg-indigo-500'
                  : 'bg-slate-500';

              return (
                <div key={priority}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-300">{priority}</span>
                    <span className="text-slate-400">
                      {count} goals ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${color} h-2 rounded-full transition-all duration-700`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Pillar Breakdown & Time Invested
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">By Career Category</span>
          </div>

          <div className="space-y-4">
            {Object.entries(analytics.categoryBreakdown).map(([cat, stats]) => {
              const compPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

              return (
                <div key={cat} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{cat}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-indigo-400 font-semibold">{stats.hours}h spent</span>
                      <span className="text-slate-400">
                        {stats.completed}/{stats.total} Done ({compPercent}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${compPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Skills Cloud (1 Col) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Target Tech Skills
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Skills tagged in your learning roadmap & tasks:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {sortedTags.map(([tag, count]) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
                >
                  #{tag}
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-800 text-white font-bold">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200">
            💡 <strong>Career Tip:</strong> Align your highest-hour tags with the requirements of
            your target job descriptions (e.g. Senior Backend / DevOps / Cloud Engineer).
          </div>
        </div>
      </div>
    </div>
  );
};

