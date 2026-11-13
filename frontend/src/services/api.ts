import { AuthResponse, DailyGroupedActivity, Goal, OverallSummary, Task, UserProfile } from '../types';

const AUTH_TOKEN_KEY = 'career_pulse_auth_token';
const AUTH_USER_KEY = 'career_pulse_auth_user';

// Production Render Backend URL (defaults to user's live Render backend)
export const BACKEND_URL = (
  (import.meta.env.VITE_API_BASE_URL as string) ||
  'https://career-todo-backend.onrender.com'
).replace(/\/$/, '');

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

const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  getCurrentUser,
  getToken,

  async checkServer(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${BACKEND_URL}/health`, { signal: controller.signal });
      clearTimeout(timeout);
      return res.ok;
    } catch {
      return false;
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Registration failed');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, json.data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(json.data.user));
      return json.data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Connection timed out. The server might be waking up from sleep on Render, please try again in a few moments.');
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Invalid email or password');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, json.data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(json.data.user));
      return json.data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Connection timed out. The server might be waking up from sleep on Render, please try again in a few moments.');
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  },

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  async getSummary(): Promise<OverallSummary> {
    const res = await fetch(`${BACKEND_URL}/api/summary`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch summary: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  },

  async getGoals(): Promise<Goal[]> {
    const res = await fetch(`${BACKEND_URL}/api/goals`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch goals: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  },

  async getTasks(goalId?: string): Promise<Task[]> {
    const url = goalId
      ? `${BACKEND_URL}/api/tasks?goalId=${encodeURIComponent(goalId)}`
      : `${BACKEND_URL}/api/tasks`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  },

  async toggleTask(id: string): Promise<Task> {
    const res = await fetch(`${BACKEND_URL}/api/tasks/${id}/toggle`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error(`Failed to toggle task: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    const res = await fetch(`${BACKEND_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error(`Failed to create task: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  },

  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error(`Failed to delete task: ${res.statusText}`);
    }
  },

  async getDailyActivity(): Promise<DailyGroupedActivity[]> {
    const res = await fetch(`${BACKEND_URL}/api/daily-activity`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch daily activity: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  }
};
