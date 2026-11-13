import { AnalyticsSummary, FilterState, Task } from '../types';

const STORAGE_KEY = 'career_pulse_tasks_v1';

const DEFAULT_SEEDED_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Master CI/CD Pipelines with GitHub Actions',
    description: 'Build an automated pipeline that lints, runs tests, creates Docker images, and deploys to registry on push.',
    category: 'Cloud & DevOps',
    priority: 'Urgent',
    status: 'In Progress',
    tags: ['ci-cd', 'github-actions', 'devops', 'docker'],
    subtasks: [
      { id: 'sub-1', title: 'Write unit tests with Vitest', completed: true },
      { id: 'sub-2', title: 'Create multi-stage Dockerfile', completed: true },
      { id: 'sub-3', title: 'Configure GitHub Actions workflow YAML', completed: true },
      { id: 'sub-4', title: 'Publish container image to GHCR', completed: false }
    ],
    estimatedHours: 4,
    actualHours: 2.5,
    pomodoroSessions: 5,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    reflectionNotes: 'Automating tests on every PR prevents breaking changes. GHCR provides free unlimited container hosting for open-source repositories.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-2',
    title: 'Design Distributed Rate Limiter (System Design)',
    description: 'Study Token Bucket, Leaky Bucket, and Sliding Window algorithms with Redis for multi-node rate limiting.',
    category: 'System Design',
    priority: 'High',
    status: 'To Do',
    tags: ['system-design', 'redis', 'architecture', 'scalability'],
    subtasks: [
      { id: 'sub-5', title: 'Compare Token Bucket vs Sliding Window Counter', completed: true },
      { id: 'sub-6', title: 'Draft high-level architecture diagram', completed: false },
      { id: 'sub-7', title: 'Handle race conditions using Redis Lua scripts', completed: false }
    ],
    estimatedHours: 3.5,
    actualHours: 1.0,
    pomodoroSessions: 2,
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    reflectionNotes: 'Token bucket is ideal for bursty traffic; sliding window log is accurate but memory-intensive.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-3',
    title: 'Blind 75: Two Pointers & Sliding Window Patterns',
    description: 'Solve and analyze time/space complexity for 3 classic problems: 3Sum, Container With Most Water, Longest Substring Without Repeating Characters.',
    category: 'DSA & Algorithms',
    priority: 'High',
    status: 'Done',
    tags: ['leetcode', 'dsa', 'two-pointers', 'python', 'javascript'],
    subtasks: [
      { id: 'sub-8', title: 'Solve 3Sum with sorting and two pointers', completed: true },
      { id: 'sub-9', title: 'Solve Container With Most Water in O(n)', completed: true },
      { id: 'sub-10', title: 'Write clean explanation in notes', completed: true }
    ],
    estimatedHours: 3,
    actualHours: 3,
    pomodoroSessions: 6,
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    reflectionNotes: 'Always sort first when applying two pointers on sums to eliminate duplicate triplets easily.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'task-4',
    title: 'Polish Resume & STAR Method Interview Stories',
    description: 'Prepare 5 impactful behavioral stories demonstrating leadership, debugging under pressure, and cross-team collaboration.',
    category: 'Interview Prep',
    priority: 'Medium',
    status: 'In Progress',
    tags: ['resume', 'behavioral', 'star-method', 'career'],
    subtasks: [
      { id: 'sub-11', title: 'Draft Situation, Task, Action, Result for project lead story', completed: true },
      { id: 'sub-12', title: 'Quantify metrics (reduced latency by 40%, improved test coverage to 85%)', completed: true },
      { id: 'sub-13', title: 'Conduct mock behavioral session', completed: false }
    ],
    estimatedHours: 2.5,
    actualHours: 1.5,
    pomodoroSessions: 3,
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    reflectionNotes: 'Focus heavily on the "Action" part of STAR - what specific architectural decisions did I make?',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-5',
    title: 'Daily Tech Reading: Kafka Partitioning & Rebalancing',
    description: 'Read Apache Kafka documentation on consumer group rebalancing protocols (Eager vs Cooperative Sticky).',
    category: 'Daily Habit',
    priority: 'Low',
    status: 'Done',
    tags: ['kafka', 'distributed-systems', 'reading'],
    subtasks: [
      { id: 'sub-14', title: 'Read 2 articles on cooperative sticky assignor', completed: true },
      { id: 'sub-15', title: 'Write down 3 bullet takeaways', completed: true }
    ],
    estimatedHours: 1,
    actualHours: 0.8,
    pomodoroSessions: 2,
    dueDate: new Date().toISOString().split('T')[0],
    reflectionNotes: 'Cooperative rebalancing avoids the stop-the-world pauses of eager rebalancing.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  }
];

let serverAvailable: boolean | null = null;

// Helper: Check local storage
const getLocalTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEEDED_TASKS));
      return [...DEFAULT_SEEDED_TASKS];
    }
    return JSON.parse(raw);
  } catch {
    return [...DEFAULT_SEEDED_TASKS];
  }
};

const saveLocalTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

const computeLocalAnalytics = (tasks: Task[]): AnalyticsSummary => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalEstimatedHours = Number(tasks.reduce((acc, t) => acc + (t.estimatedHours || 0), 0).toFixed(1));
  const totalActualHours = Number(tasks.reduce((acc, t) => acc + (t.actualHours || 0), 0).toFixed(1));
  const totalPomodoros = tasks.reduce((acc, t) => acc + (t.pomodoroSessions || 0), 0);

  const categoryBreakdown: Record<string, { total: number; completed: number; hours: number }> = {};
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

  const priorityBreakdown: Record<string, number> = { Urgent: 0, High: 0, Medium: 0, Low: 0 };
  for (const t of tasks) {
    priorityBreakdown[t.priority] = (priorityBreakdown[t.priority] || 0) + 1;
  }

  const completedWithDates = tasks
    .filter(t => t.status === 'Done' && t.completedAt)
    .map(t => t.completedAt!.split('T')[0]);

  const uniqueCompletedDates = Array.from(new Set(completedWithDates)).sort().reverse();
  let currentStreakDays = 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (uniqueCompletedDates.includes(todayStr) || uniqueCompletedDates.includes(yesterday)) {
    let checkDate = uniqueCompletedDates.includes(todayStr) ? new Date() : new Date(Date.now() - 86400000);
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
};

export const api = {
  isServerConnected: (): boolean => serverAvailable === true,

  async checkServerConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch('/api/tasks', { signal: controller.signal });
      clearTimeout(timeoutId);
      serverAvailable = res.ok;
      return res.ok;
    } catch {
      serverAvailable = false;
      return false;
    }
  },

  async getTasks(filters?: Partial<FilterState>): Promise<Task[]> {
    try {
      const isConnected = serverAvailable ?? (await this.checkServerConnection());
      if (isConnected) {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.priority) params.append('priority', filters.priority);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

        const res = await fetch(`/api/tasks?${params.toString()}`);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    // Fallback to localStorage
    let tasks = getLocalTasks();
    if (filters?.category) tasks = tasks.filter(t => t.category === filters.category);
    if (filters?.priority) tasks = tasks.filter(t => t.priority === filters.priority);
    if (filters?.status) tasks = tasks.filter(t => t.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return tasks;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
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

    // Local fallback
    const tasks = getLocalTasks();
    const now = new Date().toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: data.title || 'Untitled Goal',
      description: data.description || '',
      category: data.category || 'System Design',
      priority: data.priority || 'Medium',
      status: data.status || 'To Do',
      tags: data.tags || [],
      subtasks: data.subtasks || [],
      estimatedHours: data.estimatedHours || 1,
      actualHours: data.actualHours || 0,
      pomodoroSessions: data.pomodoroSessions || 0,
      dueDate: data.dueDate || null,
      reflectionNotes: data.reflectionNotes || '',
      createdAt: now,
      updatedAt: now,
      completedAt: data.status === 'Done' ? now : null
    };
    tasks.unshift(newTask);
    saveLocalTasks(tasks);
    return newTask;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
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

    // Local fallback
    const tasks = getLocalTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');

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

    const updated: Task = {
      ...existing,
      ...updates,
      updatedAt: now,
      completedAt
    };

    tasks[index] = updated;
    saveLocalTasks(tasks);
    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
        const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        if (res.ok) return;
      }
    } catch {
      serverAvailable = false;
    }

    const tasks = getLocalTasks().filter(t => t.id !== id);
    saveLocalTasks(tasks);
  },

  async logPomodoro(id: string, minutes = 25): Promise<Task> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
        const res = await fetch(`/api/tasks/${id}/pomodoro`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ minutes })
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    const tasks = getLocalTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');

    const addedHours = Number((minutes / 60).toFixed(2));
    task.actualHours = Number((task.actualHours + addedHours).toFixed(2));
    task.pomodoroSessions = (task.pomodoroSessions || 0) + 1;
    task.updatedAt = new Date().toISOString();

    saveLocalTasks(tasks);
    return task;
  },

  async getAnalytics(): Promise<AnalyticsSummary> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    return computeLocalAnalytics(getLocalTasks());
  },

  async resetSeed(): Promise<Task[]> {
    try {
      if (serverAvailable ?? (await this.checkServerConnection())) {
        const res = await fetch('/api/seed', { method: 'POST' });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      }
    } catch {
      serverAvailable = false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEEDED_TASKS));
    return [...DEFAULT_SEEDED_TASKS];
  },

  exportData(): string {
    const tasks = getLocalTasks();
    return JSON.stringify({ version: '1.0', exportedAt: new Date().toISOString(), tasks }, null, 2);
  },

  importData(jsonData: string): number {
    const parsed = JSON.parse(jsonData);
    const tasks = parsed.tasks || parsed;
    if (!Array.isArray(tasks)) throw new Error('Invalid format: array of tasks expected');
    saveLocalTasks(tasks);
    return tasks.length;
  }
};
