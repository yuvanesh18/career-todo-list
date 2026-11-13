import React from 'react';
import confetti from 'canvas-confetti';
import {
  MoreVertical,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Tag,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Trash2,
  Timer
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateStatus: (id: string, newStatus: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStartPomodoroForTask: (task: Task) => void;
}

const COLUMNS: { id: TaskStatus; label: string; color: string; badge: string }[] = [
  { id: 'Backlog', label: 'Backlog', color: 'border-slate-800 bg-slate-900/40', badge: 'bg-slate-800 text-slate-300' },
  { id: 'To Do', label: 'To Do', color: 'border-blue-900/40 bg-blue-950/20', badge: 'bg-blue-900/50 text-blue-300' },
  { id: 'In Progress', label: 'In Progress', color: 'border-amber-900/40 bg-amber-950/20', badge: 'bg-amber-900/50 text-amber-300' },
  { id: 'In Review', label: 'In Review / Testing', color: 'border-purple-900/40 bg-purple-950/20', badge: 'bg-purple-900/50 text-purple-300' },
  { id: 'Done', label: 'Completed', color: 'border-emerald-900/40 bg-emerald-950/20', badge: 'bg-emerald-900/50 text-emerald-300' }
];

const STATUS_ORDER: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];

const getPriorityBadge = (priority: TaskPriority) => {
  switch (priority) {
    case 'Urgent':
      return 'bg-red-950/60 text-red-400 border-red-500/40';
    case 'High':
      return 'bg-orange-950/60 text-orange-400 border-orange-500/40';
    case 'Medium':
      return 'bg-indigo-950/60 text-indigo-400 border-indigo-500/40';
    case 'Low':
      return 'bg-slate-800/60 text-slate-400 border-slate-700/40';
  }
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onUpdateStatus,
  onEditTask,
  onDeleteTask,
  onStartPomodoroForTask
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
    });
  };

  const handleMove = (task: Task, direction: 'next' | 'prev') => {
    const currentIndex = STATUS_ORDER.indexOf(task.status);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < STATUS_ORDER.length) {
      const nextStatus = STATUS_ORDER[newIndex];
      if (nextStatus === 'Done') {
        triggerConfetti();
      }
      onUpdateStatus(task.id, nextStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
      {COLUMNS.map(col => {
        const columnTasks = tasks.filter(t => t.status === col.id);

        return (
          <div
            key={col.id}
            className={`flex flex-col rounded-2xl border p-3 min-w-[270px] ${col.color}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  {col.label}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${col.badge}`}>
                  {columnTasks.length}
                </span>
              </div>
            </div>

            {/* Task Cards */}
            <div className="flex-1 space-y-3 min-h-[300px]">
              {columnTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                  No tasks in {col.label.toLowerCase()}
                </div>
              ) : (
                columnTasks.map(task => {
                  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
                  const totalSubtasks = task.subtasks.length;
                  const isOverdue =
                    task.dueDate &&
                    task.status !== 'Done' &&
                    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 shadow-md transition group hover:shadow-lg relative"
                    >
                      {/* Category & Priority Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                          {task.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onEditTask(task)}
                        className={`text-xs font-semibold text-white group-hover:text-indigo-400 transition cursor-pointer mb-1.5 leading-snug ${
                          task.status === 'Done' ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Description preview */}
                      {task.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 mb-2.5">
                          {task.description}
                        </p>
                      )}

                      {/* Subtasks Progress Bar if subtasks exist */}
                      {totalSubtasks > 0 && (
                        <div className="mb-2.5">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span>Checklist</span>
                            <span>
                              {completedSubtasks}/{totalSubtasks}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                            <div
                              className="bg-indigo-500 h-1 rounded-full transition-all"
                              style={{
                                width: `${Math.round((completedSubtasks / totalSubtasks) * 100)}%`
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Skill Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {task.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                          {task.tags.length > 3 && (
                            <span className="text-[9px] text-slate-500">
                              +{task.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metadata Footer: Due Date & Hours */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                        <div className="flex items-center gap-2">
                          {task.dueDate && (
                            <span
                              className={`flex items-center gap-1 font-medium ${
                                isOverdue ? 'text-red-400' : 'text-slate-400'
                              }`}
                              title={isOverdue ? 'Overdue!' : 'Due date'}
                            >
                              <Calendar className="w-3 h-3" />
                              {task.dueDate}
                            </span>
                          )}
                          <span className="flex items-center gap-1" title="Actual vs Est Hours">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            {task.actualHours}h/{task.estimatedHours}h
                          </span>
                        </div>

                        {/* Quick Actions (Pomodoro, Edit, Delete) */}
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={() => onStartPomodoroForTask(task)}
                            title="Focus on this task with Pomodoro"
                            className="p-1 hover:text-indigo-400 transition"
                          >
                            <Timer className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onEditTask(task)}
                            title="Edit task"
                            className="p-1 hover:text-white transition"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            title="Delete task"
                            className="p-1 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Column Move Controls */}
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/60">
                        <button
                          disabled={task.status === 'Backlog'}
                          onClick={() => handleMove(task, 'prev')}
                          className="text-[10px] text-slate-400 hover:text-white disabled:opacity-20 disabled:hover:text-slate-400 flex items-center transition"
                          title="Move left"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <button
                          disabled={task.status === 'Done'}
                          onClick={() => handleMove(task, 'next')}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 disabled:opacity-20 disabled:hover:text-indigo-400 flex items-center font-semibold transition"
                          title="Move right"
                        >
                          Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
