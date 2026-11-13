import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Code2,
  Cloud,
  Layers,
  Sparkles,
  Check,
  CheckCircle,
  Filter
} from 'lucide-react';
import { Goal, Task } from '../types';
import { getLocalDateString } from '../utils/dateUtils';

interface GoalDetailViewProps {
  goals: Goal[];
  selectedGoalId: string;
  onSelectGoal: (id: string) => void;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({
  goals,
  selectedGoalId,
  onSelectGoal,
  tasks,
  onToggleTask
}) => {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Incomplete' | 'Completed'>('All');
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});

  const currentGoal = goals.find(g => g.id === selectedGoalId) || goals[0];
  const goalTasks = tasks.filter(t => t.goalId === currentGoal?.id);

  const completedCount = goalTasks.filter(t => t.completed).length;
  const progressPercent = goalTasks.length > 0
    ? Math.round((completedCount / goalTasks.length) * 100)
    : 0;

  // Extract unique topics for this goal
  const topicsList = Array.from(new Set(goalTasks.map(t => t.topic))).sort();

  // Filter tasks
  const filteredTasks = goalTasks.filter(t => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchTopic = t.topic.toLowerCase().includes(q);
      if (!matchTitle && !matchTopic) return false;
    }
    if (selectedTopic !== 'All' && t.topic !== selectedTopic) {
      return false;
    }
    if (selectedDifficulty !== 'All' && t.difficulty !== selectedDifficulty) {
      return false;
    }
    if (selectedStatus === 'Incomplete' && t.completed) return false;
    if (selectedStatus === 'Completed' && !t.completed) return false;
    return true;
  });

  // Group filtered tasks by topic
  const groupedByTopic: Record<string, Task[]> = {};
  filteredTasks.forEach(t => {
    if (!groupedByTopic[t.topic]) {
      groupedByTopic[t.topic] = [];
    }
    groupedByTopic[t.topic].push(t);
  });

  const toggleTopicCollapse = (topic: string) => {
    setCollapsedTopics(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleToggle = (task: Task) => {
    if (!task.completed) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899']
      });
    }
    onToggleTask(task.id);
  };

  const todayStr = getLocalDateString(new Date());

  return (
    <div className="space-y-6">
      {/* 1. Goal Selector Cards (Fixed Goals - No Add Button) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map(goal => {
          const isSelected = goal.id === selectedGoalId;
          const gTasks = tasks.filter(t => t.goalId === goal.id);
          const gCompleted = gTasks.filter(t => t.completed).length;
          const gPercent = gTasks.length > 0 ? Math.round((gCompleted / gTasks.length) * 100) : 0;
          const isDsa = goal.title.toLowerCase().includes('dsa');

          return (
            <button
              key={goal.id}
              onClick={() => onSelectGoal(goal.id)}
              className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-50'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              {/* Active Indicator Bar */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shadow-xs ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isDsa ? <Code2 className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {goal.description || 'Career milestone & structured practice'}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {gTasks.length} {gTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>

              {/* Progress bar inside card */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Completion Progress</span>
                  <span className="font-bold text-slate-900">{gCompleted} / {gTasks.length} ({gPercent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${gPercent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Main Goal Header & Progress Summary */}
      {currentGoal && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Active Career Goal
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {goalTasks.length} Curated Tasks
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentGoal.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {currentGoal.description || 'Track your daily problem solving and topic mastery.'}
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 px-5 rounded-2xl border border-slate-200">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900">{completedCount}</span>
                <span className="text-xs text-slate-500 block font-medium">Completed</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-2xl font-black text-indigo-600">{progressPercent}%</span>
                <span className="text-xs text-slate-500 block font-medium">Overall Rate</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-4">
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Search and Topic Filters */}
      {goalTasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions by name, topic (e.g. Two Sum, Array, Dynamic Programming)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2">
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 transition"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Hard">Hard Only</option>
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 transition"
              >
                <option value="All">All Status</option>
                <option value="Incomplete">Incomplete Only</option>
                <option value="Completed">Completed Only</option>
              </select>
            </div>
          </div>

          {/* Topic Pills */}
          {topicsList.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter by Topic ({topicsList.length} topics)</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedTopic('All')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedTopic === 'All'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({goalTasks.length})
                </button>
                {topicsList.map(topic => {
                  const count = goalTasks.filter(t => t.topic === topic).length;
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {topic} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Task / Question List Grouped by Topic */}
      {goalTasks.length === 0 ? (
        /* Empty State for AWS Certification (or new empty goals) */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 mb-4 shadow-xs">
            <Cloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {currentGoal?.title} Goal Ready
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1.5">
            This goal is currently configured without starter questions. You can provide your custom task list later to track certifications and exams.
          </p>
        </div>
      ) : filteredTasks.length === 0 ? (
        /* No Match Filter State */
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-700">No questions match your current filters</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedTopic('All');
              setSelectedDifficulty('All');
              setSelectedStatus('All');
            }}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        /* Grouped Questions */
        <div className="space-y-4">
          {Object.entries(groupedByTopic).map(([topic, topicTasks]) => {
            const isCollapsed = Boolean(collapsedTopics[topic]);
            const topicCompleted = topicTasks.filter(t => t.completed).length;
            const topicAllDone = topicCompleted === topicTasks.length;

            return (
              <div
                key={topic}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
              >
                {/* Topic Header Accordion */}
                <button
                  type="button"
                  onClick={() => toggleTopicCollapse(topic)}
                  className="w-full px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900">
                      {topic}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        topicAllDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {topicCompleted} / {topicTasks.length} Completed
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs hidden sm:inline text-slate-500 font-medium">
                      {isCollapsed ? 'Expand' : 'Collapse'}
                    </span>
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </button>

                {/* Questions in Topic */}
                {!isCollapsed && (
                  <div className="divide-y divide-slate-100">
                    {topicTasks.map(task => {
                      const isToday = task.completed && task.completedDate === todayStr;

                      return (
                        <div
                          key={task.id}
                          className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                            task.completed ? 'bg-slate-50/40' : 'hover:bg-slate-50/60'
                          }`}
                        >
                          {/* Checkbox and Task Title */}
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <button
                              type="button"
                              onClick={() => handleToggle(task)}
                              title={task.completed ? 'Mark incomplete' : 'Mark completed'}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                                task.completed
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'border-2 border-slate-300 hover:border-indigo-600 bg-white'
                              }`}
                            >
                              {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                            </button>

                            <div className="min-w-0">
                              <span
                                className={`text-sm font-semibold block truncate ${
                                  task.completed
                                    ? 'text-slate-400 line-through'
                                    : 'text-slate-900'
                                }`}
                              >
                                {task.title}
                              </span>

                              <div className="flex items-center gap-2 mt-0.5">
                                {isToday && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" /> Completed Today
                                  </span>
                                )}
                                {task.completed && !isToday && task.completedDate && (
                                  <span className="text-[10px] text-slate-400">
                                    Completed on {task.completedDate}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Difficulty Tag & LeetCode Link */}
                          <div className="flex items-center gap-2 shrink-0">
                            {task.difficulty && (
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                                  task.difficulty === 'Easy'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : task.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                {task.difficulty}
                              </span>
                            )}

                            {task.url && (
                              <a
                                href={task.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open on LeetCode"
                                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                              >
                                <span>LeetCode</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
