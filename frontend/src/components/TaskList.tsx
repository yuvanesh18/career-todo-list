import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Tag,
  Edit2,
  Trash2,
  Timer,
  Search,
  Filter,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { FilterState, Task, TaskCategory, TaskPriority, TaskStatus } from '../types';

interface TaskListProps {
  tasks: Task[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onUpdateStatus: (id: string, newStatus: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStartPomodoroForTask: (task: Task) => void;
}

const CATEGORIES: string[] = [
  'All Categories',
  'System Design',
  'DSA & Algorithms',
  'Cloud & DevOps',
  'Full Stack Projects',
  'Interview Prep',
  'Certifications',
  'Soft Skills & Leadership',
  'Daily Habit'
];

const PRIORITIES: string[] = ['All Priorities', 'Urgent', 'High', 'Medium', 'Low'];
const STATUSES: string[] = ['All Statuses', 'Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filters,
  onFilterChange,
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onStartPomodoroForTask
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleToggleComplete = (task: Task) => {
    const nextStatus: TaskStatus = task.status === 'Done' ? 'To Do' : 'Done';
    if (nextStatus === 'Done') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onUpdateStatus(task.id, nextStatus);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={e => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search goals, tags, learnings..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={e => onFilterChange({ ...filters, category: e.target.value })}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c === 'All Categories' ? '' : c}>
                {c}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filters.priority}
            onChange={e => onFilterChange({ ...filters, priority: e.target.value })}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {PRIORITIES.map(p => (
              <option key={p} value={p === 'All Priorities' ? '' : p}>
                {p}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={e => onFilterChange({ ...filters, status: e.target.value })}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {STATUSES.map(s => (
              <option key={s} value={s === 'All Statuses' ? '' : s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={e => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="createdAt">Sort: Created Date</option>
            <option value="dueDate">Sort: Target Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="estimatedHours">Sort: Est. Hours</option>
          </select>
        </div>
      </div>

      {/* Task List Table / Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        {tasks.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm font-semibold">No career goals match your filters</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or create a new goal.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {tasks.map(task => {
              const isExpanded = expandedTaskId === task.id;
              const isDone = task.status === 'Done';
              const completedSubs = task.subtasks.filter(s => s.completed).length;

              return (
                <div
                  key={task.id}
                  className={`transition-colors ${
                    isExpanded ? 'bg-slate-800/30' : 'hover:bg-slate-800/20'
                  }`}
                >
                  {/* Main Row */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    {/* Checkbox & Title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggleComplete(task)}
                        className="text-slate-500 hover:text-emerald-400 transition flex-shrink-0"
                        title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 hover:text-indigo-400" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`text-xs font-semibold ${
                              isDone ? 'line-through text-slate-500' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {task.category}
                          </span>
                        </div>

                        {/* Sub-meta tags */}
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          {task.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {task.dueDate}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            {task.actualHours}h / {task.estimatedHours}h
                          </span>
                          {task.subtasks.length > 0 && (
                            <span className="text-[10px] text-slate-400">
                              Checklist: {completedSubs}/{task.subtasks.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Priority */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          task.priority === 'Urgent'
                            ? 'bg-red-950/60 text-red-400 border-red-500/30'
                            : task.priority === 'High'
                            ? 'bg-orange-950/60 text-orange-400 border-orange-500/30'
                            : task.priority === 'Medium'
                            ? 'bg-indigo-950/60 text-indigo-400 border-indigo-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {task.priority}
                      </span>

                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {task.status}
                      </span>

                      {/* Quick Action Buttons */}
                      <button
                        onClick={() => onStartPomodoroForTask(task)}
                        title="Start Pomodoro Timer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition"
                      >
                        <Timer className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEditTask(task)}
                        title="Edit Task"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteTask(task.id)}
                        title="Delete Task"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleExpand(task.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title={isExpanded ? 'Collapse' : 'Expand Details'}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Pane */}
                  {isExpanded && (
                    <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 space-y-3 text-xs">
                      {task.description && (
                        <div>
                          <span className="font-semibold text-slate-400 block mb-1">
                            Objective:
                          </span>
                          <p className="text-slate-300">{task.description}</p>
                        </div>
                      )}

                      {/* Subtasks */}
                      {task.subtasks.length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-400 block mb-1.5">
                            Milestones & Subtasks:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {task.subtasks.map(s => (
                              <div
                                key={s.id}
                                className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800"
                              >
                                {s.completed ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                )}
                                <span
                                  className={
                                    s.completed ? 'line-through text-slate-500' : 'text-slate-300'
                                  }
                                >
                                  {s.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reflection Notes */}
                      {task.reflectionNotes && (
                        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
                          <span className="font-semibold text-purple-300 flex items-center gap-1.5 mb-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            Learnings & Interview Talking Points:
                          </span>
                          <p className="text-slate-300 font-mono text-[11px] whitespace-pre-line">
                            {task.reflectionNotes}
                          </p>
                        </div>
                      )}

                      {/* Tags */}
                      {task.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-slate-400 font-medium">Tags:</span>
                          {task.tags.map(t => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]"
                            >
                              #{t}
                            </span>
                          ))}
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
    </div>
  );
};
