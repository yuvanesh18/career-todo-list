import { db } from '../db.js';
import { AnalyticsSummary, CategoryStats, FilterOptions, Task, TaskStatus } from '../types.js';

export class TaskService {
  public getAll(filters: FilterOptions = {}): Task[] {
    let tasks = db.getTasks();

    if (filters.status) {
      tasks = tasks.filter(t => t.status === filters.status);
    }

    if (filters.category) {
      tasks = tasks.filter(t => t.category === filters.category);
    }

    if (filters.priority) {
      tasks = tasks.filter(t => t.priority === filters.priority);
    }

    if (filters.tag) {
      const searchTag = filters.tag.toLowerCase();
      tasks = tasks.filter(t => t.tags.some(tag => tag.toLowerCase() === searchTag));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.reflectionNotes.toLowerCase().includes(q)
      );
    }

    // Sorting
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    tasks.sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate) * sortOrder;
      }
      if (sortBy === 'priority') {
        const pOrder: Record<string, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
        return ((pOrder[a.priority] || 0) - (pOrder[b.priority] || 0)) * sortOrder;
      }
      if (sortBy === 'estimatedHours') {
        return (a.estimatedHours - b.estimatedHours) * sortOrder;
      }
      // default createdAt
      return a.createdAt.localeCompare(b.createdAt) * sortOrder;
    });

    return tasks;
  }

  public getById(id: string): Task | null {
    const tasks = db.getTasks();
    return tasks.find(t => t.id === id) || null;
  }

  public create(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'> & { id?: string }): Task {
    const tasks = db.getTasks();
    const now = new Date().toISOString();
    const newTask: Task = {
      id: data.id || `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title.trim(),
      description: data.description || '',
      category: data.category,
      priority: data.priority,
      status: data.status,
      tags: data.tags || [],
      subtasks: data.subtasks || [],
      estimatedHours: Number(data.estimatedHours) || 0,
      actualHours: Number(data.actualHours) || 0,
      pomodoroSessions: Number(data.pomodoroSessions) || 0,
      dueDate: data.dueDate || null,
      reflectionNotes: data.reflectionNotes || '',
      createdAt: now,
      updatedAt: now,
      completedAt: data.status === 'Done' ? now : null
    };

    tasks.unshift(newTask);
    db.setTasks(tasks);
    return newTask;
  }

  public update(id: string, updates: Partial<Task>): Task | null {
    const tasks = db.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const existing = tasks[index];
    const now = new Date().toISOString();

    let completedAt = existing.completedAt;
    if (updates.status) {
      if (updates.status === 'Done' && existing.status !== 'Done') {
        completedAt = now;
      } else if (updates.status !== 'Done') {
        completedAt = null;
      }
    }

    const updatedTask: Task = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: now,
      completedAt
    };

    tasks[index] = updatedTask;
    db.setTasks(tasks);
    return updatedTask;
  }

  public delete(id: string): boolean {
    const tasks = db.getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    if (filtered.length === tasks.length) return false;
    db.setTasks(filtered);
    return true;
  }

  public logPomodoro(id: string, durationMinutes = 25): Task | null {
    const task = this.getById(id);
    if (!task) return null;

    const addedHours = Number((durationMinutes / 60).toFixed(2));
    const newActualHours = Number((task.actualHours + addedHours).toFixed(2));
    const newSessions = task.pomodoroSessions + 1;

    return this.update(id, {
      actualHours: newActualHours,
      pomodoroSessions: newSessions
    });
  }

  public getAnalytics(): AnalyticsSummary {
    const tasks = db.getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Done').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const totalEstimatedHours = Number(tasks.reduce((acc, t) => acc + (t.estimatedHours || 0), 0).toFixed(1));
    const totalActualHours = Number(tasks.reduce((acc, t) => acc + (t.actualHours || 0), 0).toFixed(1));
    const totalPomodoros = tasks.reduce((acc, t) => acc + (t.pomodoroSessions || 0), 0);

    // Category breakdown
    const categoryBreakdown: Record<string, CategoryStats> = {};
    for (const t of tasks) {
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = { total: 0, completed: 0, hours: 0 };
      }
      categoryBreakdown[t.category].total += 1;
      categoryBreakdown[t.category].hours = Number((categoryBreakdown[t.category].hours + (t.actualHours || 0)).toFixed(1));
      if (t.status === 'Done') {
        categoryBreakdown[t.category].completed += 1;
      }
    }

    // Priority breakdown
    const priorityBreakdown: Record<string, number> = {
      Urgent: 0,
      High: 0,
      Medium: 0,
      Low: 0
    };
    for (const t of tasks) {
      priorityBreakdown[t.priority] = (priorityBreakdown[t.priority] || 0) + 1;
    }

    // Streak calculation (consecutive days with completed activity)
    const completedWithDates = tasks
      .filter(t => t.status === 'Done' && t.completedAt)
      .map(t => t.completedAt!.split('T')[0]);

    const uniqueCompletedDates = Array.from(new Set(completedWithDates)).sort().reverse();
    let currentStreakDays = 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (uniqueCompletedDates.includes(todayStr) || uniqueCompletedDates.includes(yesterday)) {
      let checkDate = uniqueCompletedDates.includes(todayStr)
        ? new Date()
        : new Date(Date.now() - 86400000);

      while (true) {
        const dateKey = checkDate.toISOString().split('T')[0];
        if (uniqueCompletedDates.includes(dateKey)) {
          currentStreakDays++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    }

    // Past 7 days activity
    const weeklyCompleted: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const count = tasks.filter(t => t.completedAt && t.completedAt.startsWith(d)).length;
      weeklyCompleted.push({ date: d, count });
    }

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      completionRate,
      totalEstimatedHours,
      totalActualHours,
      totalPomodoros,
      currentStreakDays,
      categoryBreakdown,
      priorityBreakdown,
      weeklyCompleted
    };
  }

  public resetSeed(): Task[] {
    return db.resetToDefault();
  }

  public exportAll(): { tasks: Task[]; exportedAt: string } {
    return {
      tasks: db.getTasks(),
      exportedAt: new Date().toISOString()
    };
  }

  public importAll(importedTasks: Task[]): { importedCount: number } {
    if (!Array.isArray(importedTasks)) {
      throw new Error('Import data must contain an array of tasks');
    }
    db.setTasks(importedTasks);
    return { importedCount: importedTasks.length };
  }
}

export const taskService = new TaskService();
