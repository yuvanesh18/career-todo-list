import { db } from '../db.js';
import {
  DailyActivityItem,
  DailyGroupedActivity,
  Goal,
  GoalStats,
  OverallSummary,
  Task
} from '../types.js';

export class TaskService {
  // --- GOALS ---
  public getGoals(): Goal[] {
    return db.getState().goals;
  }

  public getGoalById(id: string): Goal | null {
    return db.getState().goals.find(g => g.id === id) || null;
  }

  public createGoal(data: Omit<Goal, 'id' | 'createdAt'>): Goal {
    const state = db.getState();
    const newGoal: Goal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: data.title.trim(),
      description: data.description || '',
      category: data.category || 'Career',
      icon: data.icon || 'Target',
      createdAt: new Date().toISOString()
    };
    state.goals.push(newGoal);
    db.setState(state);
    return newGoal;
  }

  public updateGoal(id: string, updates: Partial<Goal>): Goal | null {
    const state = db.getState();
    const idx = state.goals.findIndex(g => g.id === id);
    if (idx === -1) return null;

    state.goals[idx] = { ...state.goals[idx], ...updates };
    db.setState(state);
    return state.goals[idx];
  }

  public deleteGoal(id: string): boolean {
    const state = db.getState();
    const initLen = state.goals.length;
    state.goals = state.goals.filter(g => g.id !== id);
    if (state.goals.length === initLen) return false;

    // Remove associated tasks
    state.tasks = state.tasks.filter(t => t.goalId !== id);
    db.setState(state);
    return true;
  }

  // --- TASKS ---
  public getTasks(filters: {
    goalId?: string;
    topic?: string;
    completed?: boolean;
    search?: string;
  } = {}): Task[] {
    let tasks = db.getState().tasks;

    if (filters.goalId) {
      tasks = tasks.filter(t => t.goalId === filters.goalId);
    }

    if (filters.topic) {
      tasks = tasks.filter(t => t.topic.toLowerCase() === filters.topic!.toLowerCase());
    }

    if (filters.completed !== undefined) {
      tasks = tasks.filter(t => t.completed === filters.completed);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.topic.toLowerCase().includes(q)
      );
    }

    return tasks;
  }

  public createTask(data: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'completedDate'> & { id?: string }): Task {
    const state = db.getState();
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const newTask: Task = {
      id: data.id || `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      goalId: data.goalId,
      title: data.title.trim(),
      topic: data.topic?.trim() || 'General',
      difficulty: data.difficulty,
      url: data.url || undefined,
      duration: data.duration,
      completed: Boolean(data.completed),
      completedAt: data.completed ? now.toISOString() : null,
      completedDate: data.completed ? todayStr : null,
      createdAt: now.toISOString()
    };

    state.tasks.unshift(newTask);
    db.setState(state);
    return newTask;
  }

  public toggleTask(id: string): Task | null {
    const state = db.getState();
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const task = state.tasks[idx];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (!task.completed) {
      task.completed = true;
      task.completedAt = now.toISOString();
      task.completedDate = todayStr;
    } else {
      task.completed = false;
      task.completedAt = null;
      task.completedDate = null;
    }

    db.setState(state);
    return task;
  }

  public updateTask(id: string, updates: Partial<Task>): Task | null {
    const state = db.getState();
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const task = state.tasks[idx];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    let completedAt = task.completedAt;
    let completedDate = task.completedDate;

    if (updates.completed !== undefined) {
      if (updates.completed && !task.completed) {
        completedAt = now.toISOString();
        completedDate = todayStr;
      } else if (!updates.completed) {
        completedAt = null;
        completedDate = null;
      }
    }

    state.tasks[idx] = {
      ...task,
      ...updates,
      completedAt,
      completedDate
    };

    db.setState(state);
    return state.tasks[idx];
  }

  public deleteTask(id: string): boolean {
    const state = db.getState();
    const initLen = state.tasks.length;
    state.tasks = state.tasks.filter(t => t.id !== id);
    if (state.tasks.length === initLen) return false;
    db.setState(state);
    return true;
  }

  // --- DAILY TRACKING & ANALYTICS ---
  public getDailyActivity(): DailyGroupedActivity[] {
    const state = db.getState();
    const goalMap = new Map<string, string>();
    state.goals.forEach(g => goalMap.set(g.id, g.title));

    // Filter only completed tasks that have a completedDate
    const completedTasks = state.tasks.filter(t => t.completed && t.completedDate);

    // Group by date
    const groups = new Map<string, DailyActivityItem[]>();

    completedTasks.forEach(t => {
      const date = t.completedDate!;
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)!.push({
        taskId: t.id,
        taskTitle: t.title,
        goalId: t.goalId,
        goalTitle: goalMap.get(t.goalId) || 'Unknown Goal',
        topic: t.topic,
        difficulty: t.difficulty,
        url: t.url,
        completedAt: t.completedAt || date
      });
    });

    const result: DailyGroupedActivity[] = [];
    Array.from(groups.keys()).sort().reverse().forEach(date => {
      const items = groups.get(date)!;
      result.push({
        date,
        count: items.length,
        items
      });
    });

    return result;
  }

  public getSummary(): OverallSummary {
    const state = db.getState();
    const todayStr = new Date().toISOString().split('T')[0];
    const goalMap = new Map<string, string>();
    state.goals.forEach(g => goalMap.set(g.id, g.title));

    const totalTasks = state.tasks.length;
    const completedTasksTotal = state.tasks.filter(t => t.completed).length;

    // Today's completed tasks
    const todayTasks = state.tasks.filter(t => t.completed && t.completedDate === todayStr);
    const todayCompletedItems: DailyActivityItem[] = todayTasks.map(t => ({
      taskId: t.id,
      taskTitle: t.title,
      goalId: t.goalId,
      goalTitle: goalMap.get(t.goalId) || 'Goal',
      topic: t.topic,
      difficulty: t.difficulty,
      url: t.url,
      completedAt: t.completedAt || todayStr
    }));

    // Goal stats breakdown
    const goalStats: GoalStats[] = state.goals.map(g => {
      const tasks = state.tasks.filter(t => t.goalId === g.id);
      const completed = tasks.filter(t => t.completed).length;
      const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

      const byTopic: Record<string, { total: number; completed: number }> = {};
      tasks.forEach(t => {
        if (!byTopic[t.topic]) {
          byTopic[t.topic] = { total: 0, completed: 0 };
        }
        byTopic[t.topic].total += 1;
        if (t.completed) {
          byTopic[t.topic].completed += 1;
        }
      });

      return {
        goalId: g.id,
        goalTitle: g.title,
        totalTasks: tasks.length,
        completedTasks: completed,
        percent,
        byTopic
      };
    });

    // Consecutive streak days with at least 1 completed task
    const completedDates = Array.from(new Set(state.tasks.filter(t => t.completed && t.completedDate).map(t => t.completedDate!))).sort().reverse();
    let streakDays = 0;
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (completedDates.includes(todayStr) || completedDates.includes(yesterdayStr)) {
      let checkDate = completedDates.includes(todayStr) ? new Date() : new Date(Date.now() - 86400000);
      while (true) {
        const dKey = checkDate.toISOString().split('T')[0];
        if (completedDates.includes(dKey)) {
          streakDays++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    }

    return {
      totalGoals: state.goals.length,
      totalTasks,
      completedTasksTotal,
      completedTodayCount: todayTasks.length,
      todayCompletedItems,
      recentDailyActivity: this.getDailyActivity().slice(0, 7),
      streakDays,
      goalStats
    };
  }

  public resetSeed() {
    return db.resetSeed();
  }
}

export const taskService = new TaskService();
