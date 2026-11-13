import { DailyLog, DashboardSummary, Goal, Task } from '../types';

const STORAGE_KEY = 'career_pulse_v2_state';

const todayStr = new Date().toISOString().split('T')[0];
const sixtyDaysLater = new Date(Date.now() + 86400000 * 60).toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const DEFAULT_STATE = {
  goals: [
    {
      id: 'goal-1',
      title: 'Become Cloud & DevOps Job Ready',
      description: 'Master Docker, Kubernetes, CI/CD with GitHub Actions, and complete 2 portfolio architectures.',
      targetMonths: 2,
      startDate: todayStr,
      targetEndDate: sixtyDaysLater,
      status: 'Active' as const,
      category: 'Cloud & DevOps',
      createdAt: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: 'task-1',
      goalId: 'goal-1',
      title: 'Configure GitHub Actions CI/CD pipeline with automated tests',
      description: 'Create multi-stage Docker build and test workflows.',
      completed: true,
      dueDate: todayStr,
      estimatedHours: 2.5,
      actualHours: 2.5,
      priority: 'High' as const,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      goalId: 'goal-1',
      title: 'Study Docker multi-stage builds and Alpine container optimization',
      description: 'Reduce final image footprint and run non-root security checks.',
      completed: true,
      dueDate: todayStr,
      estimatedHours: 1.5,
      actualHours: 1.5,
      priority: 'High' as const,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    },
    {
      id: 'task-3',
      goalId: 'goal-1',
      title: 'Set up Kubernetes Minikube local cluster and deploy backend service',
      description: 'Write Pod, Service, and Ingress YAML declarations.',
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      estimatedHours: 3.0,
      actualHours: 0,
      priority: 'High' as const,
      createdAt: new Date().toISOString(),
      completedAt: null
    },
    {
      id: 'task-4',
      goalId: 'goal-1',
      title: 'Practice 2 Medium LeetCode problems (Hashmap / Sliding Window)',
      description: 'Maintain daily DSA problem solving habit.',
      completed: false,
      dueDate: todayStr,
      estimatedHours: 1.0,
      actualHours: 0,
      priority: 'Medium' as const,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
  ],
  dailyLogs: [
    {
      id: 'log-1',
      date: yesterdayStr,
      goalId: 'goal-1',
      statusSummary: 'Completed initial Dockerfile architecture and setup GitHub repo. Tested local builds.',
      hoursSpent: 3.0,
      energyLevel: 'High' as const,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

let serverAvailable: boolean | null = null;

const getLocalState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    const parsed = JSON.parse(raw);
    if (!parsed.goals || !parsed.tasks || !parsed.dailyLogs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return parsed;
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
};

const saveLocalState = (state: any) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
};

export const api = {
  async checkServer(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000);
      const res = await fetch('/api/dashboard', { signal: controller.signal });
      clearTimeout(timeout);
      serverAvailable = res.ok;
      return res.ok;
    } catch {
      serverAvailable = false;
      return false;
    }
  },

  async getDashboard(): Promise<DashboardSummary> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/dashboard');
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
    const activeGoal = state.goals.find((g: Goal) => g.status === 'Active') || state.goals[0] || null;
    const today = new Date().toISOString().split('T')[0];

    let daysRemaining = 0;
    let totalDays = 30;
    let currentDayInGoal = 1;

    if (activeGoal) {
      const start = new Date(activeGoal.startDate).getTime();
      const end = new Date(activeGoal.targetEndDate).getTime();
      const now = new Date().getTime();
      totalDays = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);
      const daysPassed = Math.max(Math.floor((now - start) / (1000 * 60 * 60 * 24)), 0);
      daysRemaining = Math.max(Math.ceil((end - now) / (1000 * 60 * 60 * 24)), 0);
      currentDayInGoal = Math.min(daysPassed + 1, totalDays);
    }

    const goalTasks = activeGoal ? state.tasks.filter((t: Task) => t.goalId === activeGoal.id) : state.tasks;
    const completedGoalTasks = goalTasks.filter((t: Task) => t.completed).length;
    const goalProgressPercent = goalTasks.length > 0 ? Math.round((completedGoalTasks / goalTasks.length) * 100) : 0;

    const todayTasks = state.tasks.filter((t: Task) => t.dueDate === today);
    const todayTasksCompleted = todayTasks.filter((t: Task) => t.completed).length;
    const todayLoggedStatus = state.dailyLogs.some((l: DailyLog) => l.date === today);

    const totalHoursSpent = Number(
      state.dailyLogs.reduce((acc: number, l: DailyLog) => acc + (l.hoursSpent || 0), 0) +
      state.tasks.reduce((acc: number, t: Task) => acc + (t.actualHours || 0), 0)
    ).toFixed(1);

    return {
      activeGoal,
      goalProgressPercent,
      daysRemaining,
      totalDays,
      currentDayInGoal,
      todayTasksTotal: todayTasks.length,
      todayTasksCompleted,
      todayLoggedStatus,
      totalHoursSpent: Number(totalHoursSpent),
      streakDays: 3,
      recentLogs: state.dailyLogs.slice(0, 7)
    };
  },

  // Goals
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
      title: data.title || 'New Short Term Goal',
      description: data.description || '',
      targetMonths: data.targetMonths || 1,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      targetEndDate: data.targetEndDate || new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
      status: data.status || 'Active',
      category: data.category || 'Career Growth',
      createdAt: new Date().toISOString()
    };
    if (newGoal.status === 'Active') {
      state.goals.forEach((g: Goal) => { g.status = 'On Hold'; });
    }
    state.goals.unshift(newGoal);
    saveLocalState(state);
    return newGoal;
  },

  // Tasks
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
    let tasks = state.tasks;
    if (goalId) tasks = tasks.filter((t: Task) => t.goalId === goalId);
    return tasks;
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
    const now = new Date().toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      goalId: data.goalId || null,
      title: data.title || 'Untitled task',
      description: data.description || '',
      completed: Boolean(data.completed),
      dueDate: data.dueDate || new Date().toISOString().split('T')[0],
      estimatedHours: data.estimatedHours || 1,
      actualHours: data.actualHours || 0,
      priority: data.priority || 'Medium',
      createdAt: now,
      completedAt: data.completed ? now : null
    };
    state.tasks.unshift(newTask);
    saveLocalState(state);
    return newTask;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
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
    const index = state.tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    const existing = state.tasks[index];
    const now = new Date().toISOString();

    let completedAt = existing.completedAt;
    if (updates.completed !== undefined) {
      completedAt = updates.completed ? now : null;
    }

    const updated = { ...existing, ...updates, completedAt };
    state.tasks[index] = updated;
    saveLocalState(state);
    return updated;
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
    state.tasks = state.tasks.filter((t: Task) => t.id !== id);
    saveLocalState(state);
  },

  // Daily Logs / Status Updates
  async getDailyLogs(): Promise<DailyLog[]> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/daily-logs');
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }
    return getLocalState().dailyLogs;
  },

  async recordDailyStatus(data: Partial<DailyLog>): Promise<DailyLog> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch('/api/daily-logs', {
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
    const targetDate = data.date || new Date().toISOString().split('T')[0];
    const existingIdx = state.dailyLogs.findIndex((l: DailyLog) => l.date === targetDate);

    if (existingIdx !== -1) {
      state.dailyLogs[existingIdx] = {
        ...state.dailyLogs[existingIdx],
        statusSummary: data.statusSummary || '',
        hoursSpent: data.hoursSpent || 1,
        energyLevel: data.energyLevel || 'Medium'
      };
      saveLocalState(state);
      return state.dailyLogs[existingIdx];
    }

    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: targetDate,
      goalId: data.goalId || null,
      statusSummary: data.statusSummary || '',
      hoursSpent: data.hoursSpent || 1,
      energyLevel: data.energyLevel || 'Medium',
      createdAt: new Date().toISOString()
    };
    state.dailyLogs.unshift(newLog);
    saveLocalState(state);
    return newLog;
  }
};
