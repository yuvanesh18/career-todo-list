import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Plus,
  Trash2,
  AlertCircle,
  Flame,
  Check
} from 'lucide-react';
import { Goal, Task } from '../types';

interface DailyTodoListProps {
  tasks: Task[];
  activeGoal: Goal | null;
  onAddTask: (task: Partial<Task>) => void;
  onToggleTask: (id: string, currentCompleted: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export const DailyTodoList: React.FC<DailyTodoListProps> = ({
  tasks,
  activeGoal,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'all' | 'completed'>('today');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      goalId: activeGoal?.id || null,
      title: title.trim(),
      dueDate: dueDate || todayStr,
      estimatedHours: Number(estimatedHours) || 1,
      priority,
      completed: false
    });

    setTitle('');
  };

  const handleToggle = (task: Task) => {
    if (!task.completed) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onToggleTask(task.id, task.completed);
  };

  // Filter tasks based on tab
  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'today') {
      return t.dueDate === todayStr;
    }
    if (activeTab === 'completed') {
      return t.completed;
    }
    return true; // 'all'
  });

  return (
    <div className="space-y-4">
      {/* Quick Add Task Box */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-indigo-400" />
            Quick Add Daily Task
          </span>
          {activeGoal && (
            <span className="text-[11px] text-indigo-400 font-medium">
              Linked to: {activeGoal.title}
            </span>
          )}
        </div>

        <form onSubmit={handleAddSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Solve 2 LeetCode sliding window problems / Build Docker multi-stage image..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
          />

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              title="Target Due Date"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
            />

            <input
              type="number"
              min="0.25"
              step="0.25"
              value={estimatedHours}
              onChange={e => setEstimatedHours(parseFloat(e.target.value) || 1)}
              title="Estimated Hours"
              className="w-16 px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs text-center focus:outline-none focus:border-indigo-500"
            />

            <select
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-indigo-600/30 flex-shrink-0"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'today'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Today's To-Do ({tasks.filter(t => t.dueDate === todayStr && !t.completed).length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Roadmap Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'completed'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:block">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} listed
        </span>
      </div>

      {/* Task List Items */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-400 text-xs">
            <p className="font-semibold text-slate-300">No tasks in this view</p>
            <p className="text-slate-500 mt-1">
              {activeTab === 'today'
                ? "You haven't scheduled any tasks for today yet. Add one above!"
                : 'Tasks will appear here once added.'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isDueToday = task.dueDate === todayStr;
            const isOverdue =
              task.dueDate &&
              !task.completed &&
              new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  task.completed
                    ? 'bg-slate-950/40 border-slate-900/80 opacity-70'
                    : 'bg-slate-900 border-slate-800/90 hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Left: Checkbox & Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggle(task)}
                    className="flex-shrink-0 text-slate-500 hover:text-emerald-400 transition"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-xs font-semibold block truncate ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </span>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      {task.dueDate && (
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            isOverdue
                              ? 'text-red-400 font-bold'
                              : isDueToday
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {isDueToday ? 'Today' : task.dueDate}
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        {task.estimatedHours}h est.
                      </span>

                      <span
                        className={`px-1.5 py-0.2 rounded font-bold ${
                          task.priority === 'High'
                            ? 'bg-orange-950/60 text-orange-400 border border-orange-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    title="Delete task"
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
