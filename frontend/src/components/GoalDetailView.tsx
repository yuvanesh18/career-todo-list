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
  Filter,
  BrainCircuit,
  BookOpen,
  Lightbulb,
  Award,
  Info,
  StickyNote
} from 'lucide-react';
import { Goal, Task } from '../types';
import { getLocalDateString } from '../utils/dateUtils';
import { StudyNotepadDrawer } from './StudyNotepadDrawer';

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
  const [onlyImportant, setOnlyImportant] = useState(false);
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [notepadTask, setNotepadTask] = useState<Task | null>(null);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [awsViewMode, setAwsViewMode] = useState<'skills' | 'services'>('skills');

  const openNotepad = (task: Task) => {
    setNotepadTask(task);
    setIsNotepadOpen(true);
  };

  const currentGoal = goals.find(g => g.id === selectedGoalId) || goals[0];
  const goalTasks = tasks.filter(t => t.goalId === currentGoal?.id);

  const isDsa = currentGoal?.title.toLowerCase().includes('dsa');
  const isAws = currentGoal?.title.toLowerCase().includes('aws') || currentGoal?.title.toLowerCase().includes('machine learning');

  // Segregate AWS skills (mla-) vs AWS services (svc-)
  const skillsTasks = isAws ? goalTasks.filter(t => t.id.startsWith('mla-')) : goalTasks;
  const serviceTasks = isAws ? goalTasks.filter(t => t.id.startsWith('svc-')) : [];

  const skillsCompleted = skillsTasks.filter(t => t.completed).length;
  const skillsTotal = skillsTasks.length;
  const skillsPercent = skillsTotal > 0 ? Math.round((skillsCompleted / skillsTotal) * 100) : 0;

  const servicesCompleted = serviceTasks.filter(t => t.completed).length;
  const servicesTotal = serviceTasks.length;
  const servicesPercent = servicesTotal > 0 ? Math.round((servicesCompleted / servicesTotal) * 100) : 0;

  // Active tasks for current view
  const activeTasks = isAws
    ? (awsViewMode === 'skills' ? skillsTasks : serviceTasks)
    : goalTasks;

  const activeCompleted = activeTasks.filter(t => t.completed).length;
  const activePercent = activeTasks.length > 0 ? Math.round((activeCompleted / activeTasks.length) * 100) : 0;

  const completedCount = goalTasks.filter(t => t.completed).length;
  const progressPercent = goalTasks.length > 0
    ? Math.round((completedCount / goalTasks.length) * 100)
    : 0;

  const importantCount = activeTasks.filter(t => t.isImportant).length;

  // Extract unique topics for this goal
  const topicsList = Array.from(new Set(activeTasks.map(t => t.topic))).sort();

  // Filter tasks
  const filteredTasks = activeTasks.filter(t => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchTopic = t.topic.toLowerCase().includes(q);
      const matchSubtopic = t.subtopic ? t.subtopic.toLowerCase().includes(q) : false;
      const matchNotes = t.notes ? t.notes.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchTopic && !matchSubtopic && !matchNotes) return false;
    }
    if (onlyImportant && !t.isImportant) {
      return false;
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

  const toggleNote = (taskId: string) => {
    setExpandedNotes(prev => ({ ...prev, [taskId]: !prev[taskId] }));
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
      {/* 1. Goal Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map(goal => {
          const isSelected = goal.id === selectedGoalId;
          const gTasks = tasks.filter(t => t.goalId === goal.id);
          const gCompleted = gTasks.filter(t => t.completed).length;
          const gPercent = gTasks.length > 0 ? Math.round((gCompleted / gTasks.length) * 100) : 0;
          const isGoalDsa = goal.title.toLowerCase().includes('dsa');

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
                    {isGoalDsa ? <Code2 className="w-6 h-6" /> : <BrainCircuit className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 tracking-tight line-clamp-1">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {goal.description || 'Career milestone & structured practice'}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {gTasks.length} {gTasks.length === 1 ? 'task' : 'topics'}
                </span>
              </div>

              {/* Progress bar inside card */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Progress</span>
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
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                  {isAws ? 'AWS Certification Roadmap' : 'Coding Interview Roadmap'}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {goalTasks.length} Structured Items
                </span>
                {isAws && (
                  <>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Target Score: 1000/1000
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentGoal.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {currentGoal.description || 'Master every exam topic, domain skill, and architecture pattern.'}
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 px-5 rounded-2xl border border-slate-200 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900">{completedCount}</span>
                <span className="text-xs text-slate-500 block font-medium">Completed</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-2xl font-black text-indigo-600">{progressPercent}%</span>
                <span className="text-xs text-slate-500 block font-medium">Mastery Rate</span>
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

      {/* AWS Mode Switcher: 107 Exam Skills vs 81 In-Scope Services */}
      {isAws && (
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setAwsViewMode('skills');
              setSelectedTopic('All');
            }}
            className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              awsViewMode === 'skills'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>107 Exam Skills Roadmap</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                awsViewMode === 'skills'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {skillsCompleted} / {skillsTotal} ({skillsPercent}%)
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAwsViewMode('services');
              setSelectedTopic('All');
            }}
            className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              awsViewMode === 'services'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>In-Scope AWS Services (81)</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                awsViewMode === 'services'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {servicesCompleted} / {servicesTotal} ({servicesPercent}%)
            </span>
          </button>
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
                placeholder={
                  isDsa
                    ? "Search questions by name, topic (e.g. Two Sum, Array, Dynamic Programming)..."
                    : awsViewMode === 'services'
                    ? "Search AWS services by name or category (e.g. SageMaker, Bedrock, S3, Glue, Kinesis, KMS)..."
                    : "Search exam skills, topics, services (e.g. Bedrock, SageMaker, RAG, Spot Training)..."
                }
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
            <div className="flex items-center gap-2 flex-wrap">
              {importantCount > 0 && (
                <button
                  type="button"
                  onClick={() => setOnlyImportant(!onlyImportant)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                    onlyImportant
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 border-amber-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High-Yield ({importantCount})</span>
                </button>
              )}

              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 transition"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
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
                <span>Filter by Domain / Topic ({topicsList.length} groups)</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
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
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 mb-4 shadow-xs">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {currentGoal?.title} Goal Ready
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1.5">
            This goal is currently initializing roadmap topics.
          </p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-700">No items match your current filters</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedTopic('All');
              setSelectedDifficulty('All');
              setSelectedStatus('All');
              setOnlyImportant(false);
            }}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
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

                {/* Questions / Tasks in Topic */}
                {!isCollapsed && (
                  <div className="divide-y divide-slate-100">
                    {topicTasks.map(task => {
                      const isToday = task.completed && task.completedDate === todayStr;
                      const isNoteOpen = Boolean(expandedNotes[task.id]);

                      return (
                        <div
                          key={task.id}
                          className={`p-4 transition-colors ${
                            task.completed ? 'bg-slate-50/40' : 'hover:bg-slate-50/60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
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
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    onClick={() => openNotepad(task)}
                                    className={`text-sm font-semibold block cursor-pointer hover:text-indigo-600 transition-colors ${
                                      task.completed
                                        ? 'text-slate-400 line-through'
                                        : 'text-slate-900'
                                    }`}
                                    title="Click to open full Study Notepad"
                                  >
                                    {task.title}
                                  </span>

                                  {task.isImportant && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                                      <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                                      HIGH YIELD
                                    </span>
                                  )}

                                  {task.subtopic && (
                                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                      {task.subtopic}
                                    </span>
                                  )}
                                </div>

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
                                  {task.duration && (
                                    <span className="text-[10px] text-slate-400">
                                      ⏱️ ~{task.duration} mins
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions & Badges */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => openNotepad(task)}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg border transition flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/90 text-amber-900 border-amber-200/90 shadow-2xs"
                                title="Open Study Notepad on right side screen"
                              >
                                <StickyNote className="w-3.5 h-3.5 text-amber-600" />
                                <span className="hidden sm:inline">Study Notepad</span>
                              </button>

                              {(task.notes || task.description) && (
                                <button
                                  type="button"
                                  onClick={() => toggleNote(task.id)}
                                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition flex items-center gap-1.5 ${
                                    isNoteOpen
                                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                      : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-700 border-indigo-200/80'
                                  }`}
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">{isNoteOpen ? 'Hide Notes' : 'Revision Notes'}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isNoteOpen ? 'rotate-180' : ''}`} />
                                </button>
                              )}

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
                                  title={isDsa ? 'Open on LeetCode' : 'Open AWS Official Documentation'}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <span>{isDsa ? 'LeetCode' : 'AWS Docs'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Quick Revision Notes & Exam Tips Drawer */}
                          {isNoteOpen && (task.notes || task.description) && (
                            <div className="mt-3.5 pt-3.5 border-t border-slate-100 pl-9 space-y-2.5 text-xs">
                              {task.description && (
                                <div className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                                    <span>Topic Overview & Exam Objective</span>
                                  </div>
                                  <p>{task.description}</p>
                                </div>
                              )}

                              {task.notes && (
                                <div className="bg-gradient-to-r from-amber-50/90 to-amber-100/60 p-3.5 rounded-xl border border-amber-200/80 text-amber-950 leading-relaxed shadow-xs">
                                  <div className="flex items-center gap-1.5 font-extrabold text-amber-900 mb-1">
                                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                                    <span>🎯 1000/1000 Revision Tip & Exam Trap</span>
                                  </div>
                                  <p className="font-medium">{task.notes}</p>
                                </div>
                              )}
                            </div>
                          )}
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

      {/* Right Side Study Notepad Drawer */}
      <StudyNotepadDrawer
        task={notepadTask}
        isOpen={isNotepadOpen}
        onClose={() => setIsNotepadOpen(false)}
        onToggleTask={onToggleTask}
      />
    </div>
  );
};
