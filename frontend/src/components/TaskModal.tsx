import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckSquare, Square, Tag, Calendar, Clock, BookOpen } from 'lucide-react';
import { Subtask, Task, TaskCategory, TaskPriority, TaskStatus } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  initialTask?: Task | null;
}

const CATEGORIES: TaskCategory[] = [
  'System Design',
  'DSA & Algorithms',
  'Cloud & DevOps',
  'Full Stack Projects',
  'Interview Prep',
  'Certifications',
  'Soft Skills & Leadership',
  'Daily Habit'
];

const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('System Design');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [actualHours, setActualHours] = useState(0);
  const [dueDate, setDueDate] = useState<string>('');
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setEstimatedHours(initialTask.estimatedHours || 1);
      setActualHours(initialTask.actualHours || 0);
      setDueDate(initialTask.dueDate || '');
      setReflectionNotes(initialTask.reflectionNotes || '');
      setTags(initialTask.tags || []);
      setSubtasks(initialTask.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setCategory('System Design');
      setPriority('Medium');
      setStatus('To Do');
      setEstimatedHours(2);
      setActualHours(0);
      setDueDate(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
      setReflectionNotes('');
      setTags(['career']);
      setSubtasks([]);
    }
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const clean = tagInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSub: Subtask = {
      id: `sub-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false
    };
    setSubtasks([...subtasks, newSub]);
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map(s => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDeleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: initialTask?.id,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      estimatedHours: Number(estimatedHours) || 1,
      actualHours: Number(actualHours) || 0,
      dueDate: dueDate || null,
      reflectionNotes: reflectionNotes.trim(),
      tags,
      subtasks
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div>
            <h2 className="text-lg font-bold text-white">
              {initialTask ? 'Edit Career Goal / Task' : 'Create New Career Goal'}
            </h2>
            <p className="text-xs text-slate-400">
              Set clear objectives, milestones, and reflection notes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Goal / Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Master Kubernetes Pod Lifecycle & Deployments"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Description / Objective
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What specifically needs to be accomplished and why does it matter for your career?"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time & Due Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Est. Hours
              </label>
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={estimatedHours}
                onChange={e => setEstimatedHours(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Actual Hours
              </label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={actualHours}
                onChange={e => setActualHours(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Target Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Subtasks / Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                Subtasks / Checklist ({subtasks.filter(s => s.completed).length}/{subtasks.length})
              </label>
            </div>

            {/* Subtask list */}
            <div className="space-y-2 mb-2 max-h-40 overflow-y-auto">
              {subtasks.map(s => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 group"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleSubtask(s.id)}
                    className="flex items-center gap-2 text-left flex-1"
                  >
                    {s.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs ${
                        s.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubtask(s.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subtask Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={e => setNewSubtaskTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                placeholder="Add actionable subtask..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Skills & Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 ml-1"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag (e.g. docker, aws, dsa) and press enter"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Reflection Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              Daily Reflection / Learnings Notes (Interview Talking Points)
            </label>
            <textarea
              rows={3}
              value={reflectionNotes}
              onChange={e => setReflectionNotes(e.target.value)}
              placeholder="What did you learn? What bottlenecks or edge-cases did you encounter? How would you explain this in a tech interview?"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono text-xs"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              {initialTask ? 'Update Goal' : 'Save Career Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

