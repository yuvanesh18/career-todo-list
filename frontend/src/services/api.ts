import { AuthResponse, DailyGroupedActivity, Goal, OverallSummary, Task, UserProfile } from '../types';
import seedData from '../data/seed_data.json';

const AUTH_TOKEN_KEY = 'career_pulse_auth_token';
const AUTH_USER_KEY = 'career_pulse_auth_user';
const USERS_KEY = 'career_pulse_registered_users';
const BACKEND_URL_KEY = 'career_pulse_backend_url';

let serverAvailable: boolean | null = null;

export const getCurrentUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getStoredBackendUrl = (): string => {
  return localStorage.getItem(BACKEND_URL_KEY) || (import.meta.env.VITE_API_BASE_URL as string) || '';
};

export const setStoredBackendUrl = (url: string): void => {
  if (!url || !url.trim()) {
    localStorage.removeItem(BACKEND_URL_KEY);
  } else {
    localStorage.setItem(BACKEND_URL_KEY, url.trim().replace(/\/$/, ''));
  }
  serverAvailable = null; // force re-check
};

export const getApiUrl = (endpoint: string): string => {
  const base = getStoredBackendUrl().trim().replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${path}` : path;
};

const getStorageKeyForUser = (): string => {
  const user = getCurrentUser();
  return user ? `career_pulse_goals_${user.id}` : 'career_pulse_goals_v3';
};

const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getLocalState = (): { goals: Goal[]; tasks: Task[] } => {
  const key = getStorageKeyForUser();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seedData));
      return JSON.parse(JSON.stringify(seedData));
    }
    const parsed = JSON.parse(raw);
    if (!parsed.goals || !parsed.tasks || parsed.tasks.length === 0) {
      localStorage.setItem(key, JSON.stringify(seedData));
      return JSON.parse(JSON.stringify(seedData));
    }
    return parsed;
  } catch {
    return JSON.parse(JSON.stringify(seedData));
  }
};

const saveLocalState = (state: { goals: Goal[]; tasks: Task[] }) => {
  const key = getStorageKeyForUser();
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
};

export const api = {
  getCurrentUser,
  getToken,
  getStoredBackendUrl,
  setStoredBackendUrl,

  async checkServer(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(getApiUrl('/health'), {
        signal: controller.signal
      });
      clearTimeout(timeout);
      serverAvailable = res.ok;
      return res.ok;
    } catch {
      serverAvailable = false;
      return false;
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const json = await res.json();
        if (res.ok && json.success) {
          localStorage.setItem(AUTH_TOKEN_KEY, json.data.token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(json.data.user));
          return json.data;
        } else {
          throw new Error(json.error || 'Registration failed');
        }
      }
    } catch (err: any) {
      if (serverAvailable) throw err;
      serverAvailable = false;
    }

    // LocalStorage fallback for offline demo / GitHub Pages
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: any[] = usersRaw ? JSON.parse(usersRaw) : [];
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const authRes: AuthResponse = {
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token: `local-token-${newUser.id}`
    };

    localStorage.setItem(AUTH_TOKEN_KEY, authRes.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authRes.user));
    localStorage.setItem(`career_pulse_goals_${newUser.id}`, JSON.stringify(seedData));
    return authRes;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const json = await res.json();
        if (res.ok && json.success) {
          localStorage.setItem(AUTH_TOKEN_KEY, json.data.token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(json.data.user));
          return json.data;
        } else {
          throw new Error(json.error || 'Invalid email or password');
        }
      }
    } catch (err: any) {
      if (serverAvailable) throw err;
      serverAvailable = false;
    }

    // LocalStorage fallback for offline demo / GitHub Pages
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: any[] = usersRaw ? JSON.parse(usersRaw) : [
      { id: 'user-default', name: 'Yuvanesh', email: 'yuvanesh@example.com', password: 'password123' }
    ];

    const match = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!match || match.password !== password) {
      throw new Error('Invalid email or password');
    }

    const authRes: AuthResponse = {
      user: { id: match.id, name: match.name, email: match.email },
      token: `local-token-${match.id}`
    };

    localStorage.setItem(AUTH_TOKEN_KEY, authRes.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authRes.user));
    return authRes;
  },

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  async getSummary(): Promise<OverallSummary> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(getApiUrl('/api/summary'), { headers: getAuthHeaders() });
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
        const res = await fetch(getApiUrl('/api/goals'), { headers: getAuthHeaders() });
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
        const res = await fetch(getApiUrl('/api/goals'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
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
        const res = await fetch(getApiUrl(url), { headers: getAuthHeaders() });
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
        const res = await fetch(getApiUrl(`/api/tasks/${id}/toggle`), {
          method: 'POST',
          headers: getAuthHeaders()
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
        const res = await fetch(getApiUrl('/api/tasks'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
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
        const res = await fetch(getApiUrl(`/api/tasks/${id}`), {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
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
        const res = await fetch(getApiUrl('/api/daily-activity'), { headers: getAuthHeaders() });
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
  },

  async backupDatabase(): Promise<{ goals: Goal[]; tasks: Task[] }> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(getApiUrl('/api/backup'), { headers: getAuthHeaders() });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }
    return getLocalState();
  },

  async restoreDatabase(backupData: any): Promise<void> {
    try {
      if (serverAvailable ?? (await this.checkServer())) {
        const res = await fetch(getApiUrl('/api/restore'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify(backupData)
        });
        if (res.ok) return;
      }
    } catch {
      serverAvailable = false;
    }
    const state = backupData.data || backupData;
    if (state && Array.isArray(state.goals) && Array.isArray(state.tasks)) {
      saveLocalState(state);
    }
  }
};
