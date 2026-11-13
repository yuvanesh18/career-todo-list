import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Trash2,
  Code2,
  Cloud,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { Difficulty, Goal, Task } from '../types';

interface GoalDetailViewProps {
  goals: Goal[];
  selectedGoalId: string;
  onSelectGoal: (id: string) => void;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onOpenNewGoalModal: () => void;
}

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({
  goals,
  selectedGoalId,
  onSelectGoal,
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onOpenNewGoalModal
}) => {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Incomplete' | 'Completed'>('All');
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});

  // Quick Add Task state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTopic, setNewTaskTopic] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState<Difficulty>('Medium');
  const [newTaskUrl, setNewTaskUrl] = useState('');

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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
      });
    }
    onToggleTask(task.id);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !currentGoal) return;

    onAddTask({
      goalId: currentGoal.id,
      title: newTaskTitle.trim(),
      topic: newTaskTopic.trim() || (topicsList[0] || 'General'),
      difficulty: newTaskDifficulty,
      url: newTaskUrl.trim() || undefined,
      completed: false
    });

    setNewTaskTitle('');
    setNewTaskUrl('');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Goal Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {goals.map(g => {
          const isSelected = g.id === currentGoal?.id;
          const gTasks = tasks.filter(t => t.goalId === g.id);
          const gCompleted = gTasks.filter(t => t.completed).length;

          return (
            <button
              key={g.id}
              onClick={() => onSelectGoal(g.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 flex-shrink-0 border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {g.title.includes('DSA') ? (
                <Code2 className="w-4 h-4 text-cyan-400" />
              ) : g.title.includes('AWS') ? (
                <Cloud className="w-4 h-4 text-amber-400" />
              ) : (
                <Layers className="w-4 h-4 text-indigo-400" />
              )}
              <span>{g.title}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isSelected ? 'bg-indigo-950/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {gCompleted}/{gTasks.length}
              </span>
            </button>
          );
        })}

        <button
          onClick={onOpenNewGoalModal}
          className="px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-dashed border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Add Another Goal</span>
        </button>
      </div>

      {/* Goal Overview Banner */}
      {currentGoal && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {currentGoal.category}
                </span>
                <span className="text-xs text-slate-500">
                  {goalTasks.length} total questions / tasks
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                {currentGoal.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{currentGoal.description}</p>
            </div>

            {/* Overall Progress Stat */}
            <div className="px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-center flex-shrink-0">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                Progress
              </span>
              <span className="text-2xl font-black text-indigo-400">
                {completedCount} <span className="text-xs text-slate-500">/ {goalTasks.length}</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                {progressPercent}% Complete
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Add Custom Question / Task Input */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-indigo-400" />
          Add Custom Question / Task under {currentGoal?.title}
        </span>

        <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            placeholder="Question / Task name (e.g. Subarray Sum Equals K)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            value={newTaskTopic}
            onChange={e => setNewTaskTopic(e.target.value)}
            placeholder="Topic (e.g. Array, Stack)..."
            className="w-full sm:w-40 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={newTaskDifficulty}
            onChange={e => setNewTaskDifficulty(e.target.value as Difficulty)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            type="url"
            value={newTaskUrl}
            onChange={e => setNewTaskUrl(e.target.value)}
            placeholder="LeetCode / Reference URL (optional)..."
            className="w-full sm:w-48 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30 flex-shrink-0"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Topic */}
          <select
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Topics ({topicsList.length})</option>
            {topicsList.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Incomplete">Incomplete Only</option>
            <option value="Completed">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Questions Grouped by Topic */}
      <div className="space-y-4">
        {Object.keys(groupedByTopic).length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-400 text-xs">
            <p className="font-semibold text-slate-300">No questions match your filter</p>
            <p className="text-slate-500 mt-1">Try resetting the search or difficulty filter.</p>
          </div>
        ) : (
          Object.entries(groupedByTopic).map(([topic, topicQuestions]) => {
            const isCollapsed = collapsedTopics[topic];
            const topicCompletedCount = topicQuestions.filter(q => q.completed).length;
            const topicPercent = Math.round((topicCompletedCount / topicQuestions.length) * 100);

            return (
              <div
                key={topic}
                className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm"
              >
                {/* Topic Header Accordion */}
                <div
                  onClick={() => toggleTopicCollapse(topic)}
                  className="p-3.5 bg-slate-900/80 hover:bg-slate-850 cursor-pointer flex items-center justify-between border-b border-slate-800/80 transition select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-xs text-white uppercase tracking-wider">
                      {topic}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {topicCompletedCount} / {topicQuestions.length} Done ({topicPercent}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-800 rounded-full h-1.5 hidden sm:block overflow-hidden">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${topicPercent}%` }}
                      />
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Questions List inside Topic */}
                {!isCollapsed && (
                  <div className="divide-y divide-slate-800/60">
                    {topicQuestions.map(task => {
                      const isCompletedToday = task.completed && task.completedDate === todayStr;

                      return (
                        <div
                          key={task.id}
                          className={`p-3 sm:px-4 flex items-center justify-between gap-3 transition ${
                            task.completed ? 'bg-slate-950/40 opacity-75' : 'hover:bg-slate-850/50'
                          }`}
                        >
                          {/* Checkbox & Question Title */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button
                              onClick={() => handleToggle(task)}
                              className="text-slate-500 hover:text-emerald-400 transition flex-shrink-0"
                              title={task.completed ? 'Mark Incomplete' : 'Mark Completed'}
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-600 hover:text-indigo-400" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-xs font-semibold ${
                                  task.completed
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-100 hover:text-white'
                                }`}
                              >
                                {task.title}
                              </span>

                              {/* LeetCode link */}
                              {task.url && (
                                <a
                                  href={task.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open in LeetCode"
                                  className="text-slate-500 hover:text-cyan-400 transition p-1"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Metadata: Difficulty & Completion time */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {isCompletedToday && (
                              <span className="hidden md:inline text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                                ✨ Completed Today
                              </span>
                            )}

                            {task.difficulty && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  task.difficulty === 'Easy'
                                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                                    : task.difficulty === 'Medium'
                                    ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                                    : 'bg-red-950/60 text-red-400 border-red-500/30'
                                }`}
                              >
                                {task.difficulty}
                              </span>
                            )}

                            {/* Delete custom task */}
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              title="Delete task"
                              className="p-1 text-slate-600 hover:text-red-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
