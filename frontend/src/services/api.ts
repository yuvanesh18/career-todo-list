import { DailyGroupedActivity, Goal, OverallSummary, Task } from '../types';
import seedData from '../data/seed_data.json';

const STORAGE_KEY = 'career_pulse_goals_v3';

let serverAvailable: boolean | null = null;

const getLocalState = (): { goals: Goal[]; tasks: Task[] } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return JSON.parse(JSON.stringify(seedData));
    }
    const parsed = JSON.parse(raw);
    if (!parsed.goals || !parsed.tasks || parsed.tasks.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return JSON.parse(JSON.stringify(seedData));
    }
    return parsed;
  } catch {
    return JSON.parse(JSON.stringify(seedData));
  }
};

const saveLocalState = (state: { goals: Goal[]; tasks: Task[] }) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
};

export const api = {
  async checkServer(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000);
      const res = await fetch('/api/summary', { signal: controller.signal });
      clearTimeout(timeout);
      serverAvailable = res.ok;
      return res.ok;
    } catch {
      serverAvailable = false;
      return false;
    }
  },

  async getSummary(): Promise<OverallSummary> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/summary');
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    // Local calculation
    const state = getLocalState();
    const todayStr = new Date().toISOString().split('T')[0];
    const goalMap = new Map<string, string>();
    state.goals.forEach(g => goalMap.set(g.id, g.title));

    const totalTasks = state.tasks.length;
    const completedTasksTotal = state.tasks.filter(t => t.completed).length;

    const todayTasks = state.tasks.filter(t => t.completed && t.completedDate === todayStr);
    const todayCompletedItems = todayTasks.map(t => ({
      taskId: t.id,
      taskTitle: t.title,
      goalId: t.goalId,
      goalTitle: goalMap.get(t.goalId) || 'Goal',
      topic: t.topic,
      difficulty: t.difficulty,
      url: t.url,
      completedAt: t.completedAt || todayStr
    }));

    const goalStats = state.goals.map(g => {
      const tasks = state.tasks.filter(t => t.goalId === g.id);
      const completed = tasks.filter(t => t.completed).length;
      const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
      const byTopic: Record<string, { total: number; completed: number }> = {};
      tasks.forEach(t => {
        if (!byTopic[t.topic]) byTopic[t.topic] = { total: 0, completed: 0 };
        byTopic[t.topic].total += 1;
        if (t.completed) byTopic[t.topic].completed += 1;
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

    const recentDailyActivity = await this.getDailyActivity();

    return {
      totalGoals: state.goals.length,
      totalTasks,
      completedTasksTotal,
      completedTodayCount: todayTasks.length,
      todayCompletedItems,
      recentDailyActivity,
      streakDays: 3,
      goalStats
    };
  },

  async getGoals(): Promise<Goal[]> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/goals');
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }
    return getLocalState().goals;
  },

  async createGoal(data: Partial<Goal>): Promise<Goal> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: data.title || 'Custom Goal',
      description: data.description || '',
      category: data.category || 'General',
      icon: data.icon || 'Target',
      createdAt: new Date().toISOString()
    };
    state.goals.push(newGoal);
    saveLocalState(state);
    return newGoal;
  },

  async getTasks(goalId?: string): Promise<Task[]> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const url = goalId ? `/api/tasks?goalId=${encodeURIComponent(goalId)}` : '/api/tasks';
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    if (goalId) {
      return state.tasks.filter(t => t.goalId === goalId);
    }
    return state.tasks;
  },

  async toggleTask(id: string): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(`/api/tasks/${id}/toggle`, { method: 'POST' });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Task not found');
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

    saveLocalState(state);
    return task;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      goalId: data.goalId || 'goal-dsa',
      title: data.title || 'New Task',
      topic: data.topic || 'General',
      difficulty: data.difficulty,
      url: data.url,
      duration: data.duration,
      completed: false,
      completedAt: null,
      completedDate: null,
      createdAt: new Date().toISOString()
    };
    state.tasks.unshift(newTask);
    saveLocalState(state);
    return newTask;
  },

  async deleteTask(id: string): Promise<void> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        if (res.ok) return;
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveLocalState(state);
  },

  async getDailyActivity(): Promise<DailyGroupedActivity[]> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/daily-activity');
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const state = getLocalState();
    const goalMap = new Map<string, string>();
    state.goals.forEach(g => goalMap.set(g.id, g.title));

    const completedTasks = state.tasks.filter(t => t.completed && t.completedDate);
    const groups = new Map<string, any[]>();

    completedTasks.forEach(t => {
      const date = t.completedDate!;
      if (!groups.has(date)) groups.set(date, []);
      groups.get(date)!.push({
        taskId: t.id,
        taskTitle: t.title,
        goalId: t.goalId,
        goalTitle: goalMap.get(t.goalId) || 'Goal',
        topic: t.topic,
        difficulty: t.difficulty,
        url: t.url,
        completedAt: t.completedAt || date
      });
    });

    const result: DailyGroupedActivity[] = [];
    Array.from(groups.keys()).sort().reverse().forEach(date => {
      const items = groups.get(date)!;
      result.push({ date, count: items.length, items });
    });
    return result;
  }
};
