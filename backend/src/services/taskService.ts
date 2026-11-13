import { db, DEFAULT_USER_ID, createUserDataForUser } from '../db.js';
import { generateToken, hashPassword, verifyPassword } from '../auth.js';
import {
  AuthResponse,
  DailyActivityItem,
  DailyGroupedActivity,
  Goal,
  GoalStats,
  OverallSummary,
  Task,
  User,
  UserProfile
} from '../types.js';

export class TaskService {
  // --- AUTHENTICATION ---
  public register(name: string, email: string, password: string): AuthResponse {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      throw new Error('Name, email, and password are required');
    }

    const state = db.getState();
    const existing = state.users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      throw new Error('An account with this email already exists');
    }

    const { hash, salt } = hashPassword(password);
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newUser: User = {
      id: userId,
      name: trimmedName,
      email: trimmedEmail,
      passwordHash: hash,
      salt,
      createdAt: new Date().toISOString()
    };

    // Initialize individual seeded goals & tasks for new user
    const { goals: userGoals, tasks: userTasks } = createUserDataForUser(userId);

    state.users.push(newUser);
    state.goals.push(...userGoals);
    state.tasks.push(...userTasks);
    db.setState(state);

    const token = generateToken(userId);
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    };
  }

  public login(email: string, password: string): AuthResponse {
    const trimmedEmail = email.trim().toLowerCase();
    const state = db.getState();
    const user = state.users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  public getUserById(userId: string): UserProfile | null {
    const state = db.getState();
    const user = state.users.find(u => u.id === userId);
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  // --- GOALS ---
  public getGoals(userId: string = DEFAULT_USER_ID): Goal[] {
    const state = db.getState();
    return state.goals.filter(g => g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID));
  }

  public getGoalById(userId: string = DEFAULT_USER_ID, id: string): Goal | null {
    return this.getGoals(userId).find(g => g.id === id) || null;
  }

  public createGoal(userId: string = DEFAULT_USER_ID, data: Omit<Goal, 'id' | 'createdAt' | 'userId'>): Goal {
    const state = db.getState();
    const newGoal: Goal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
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

  public updateGoal(userId: string = DEFAULT_USER_ID, id: string, updates: Partial<Goal>): Goal | null {
    const state = db.getState();
    const idx = state.goals.findIndex(g => g.id === id && (g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID)));
    if (idx === -1) return null;

    state.goals[idx] = { ...state.goals[idx], ...updates, userId };
    db.setState(state);
    return state.goals[idx];
  }

  public deleteGoal(userId: string = DEFAULT_USER_ID, id: string): boolean {
    const state = db.getState();
    const initLen = state.goals.length;
    state.goals = state.goals.filter(g => !(g.id === id && (g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID))));
    if (state.goals.length === initLen) return false;

    // Remove associated tasks for this user
    state.tasks = state.tasks.filter(t => !(t.goalId === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID))));
    db.setState(state);
    return true;
  }

  // --- TASKS ---
  public getTasks(userId: string = DEFAULT_USER_ID, filters: {
    goalId?: string;
    topic?: string;
    completed?: boolean;
    search?: string;
  } = {}): Task[] {
    let tasks = db.getState().tasks.filter(t => t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID));

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

  public createTask(userId: string = DEFAULT_USER_ID, data: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'completedDate' | 'userId'> & { id?: string }): Task {
    const state = db.getState();
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const newTask: Task = {
      id: data.id || `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
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

  public toggleTask(userId: string = DEFAULT_USER_ID, id: string): Task | null {
    const state = db.getState();
    const idx = state.tasks.findIndex(t => t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID)));
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

  public updateTask(userId: string = DEFAULT_USER_ID, id: string, updates: Partial<Task>): Task | null {
    const state = db.getState();
    const idx = state.tasks.findIndex(t => t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID)));
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
      userId,
      completedAt,
      completedDate
    };

    db.setState(state);
    return state.tasks[idx];
  }

  public deleteTask(userId: string = DEFAULT_USER_ID, id: string): boolean {
    const state = db.getState();
    const initLen = state.tasks.length;
    state.tasks = state.tasks.filter(t => !(t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID))));
    if (state.tasks.length === initLen) return false;
    db.setState(state);
    return true;
  }

  // --- DAILY TRACKING & ANALYTICS ---
  public getDailyActivity(userId: string = DEFAULT_USER_ID): DailyGroupedActivity[] {
    const goals = this.getGoals(userId);
    const goalMap = new Map<string, string>();
    goals.forEach(g => goalMap.set(g.id, g.title));

    // Filter only completed tasks for this user that have a completedDate
    const userTasks = this.getTasks(userId);
    const completedTasks = userTasks.filter(t => t.completed && t.completedDate);

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

  public getSummary(userId: string = DEFAULT_USER_ID): OverallSummary {
    const goals = this.getGoals(userId);
    const goalMap = new Map<string, string>();
    goals.forEach(g => goalMap.set(g.id, g.title));

    const userTasks = this.getTasks(userId);
    const todayStr = new Date().toISOString().split('T')[0];

    const totalTasks = userTasks.length;
    const completedTasksTotal = userTasks.filter(t => t.completed).length;

    // Today's completed tasks
    const todayTasks = userTasks.filter(t => t.completed && t.completedDate === todayStr);
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
    const goalStats: GoalStats[] = goals.map(g => {
      const tasks = userTasks.filter(t => t.goalId === g.id);
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
    const completedDates = Array.from(new Set(userTasks.filter(t => t.completed && t.completedDate).map(t => t.completedDate!))).sort().reverse();
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
      totalGoals: goals.length,
      totalTasks,
      completedTasksTotal,
      completedTodayCount: todayTasks.length,
      todayCompletedItems,
      recentDailyActivity: this.getDailyActivity(userId).slice(0, 7),
      streakDays,
      goalStats
    };
  }

  public resetSeed() {
    return db.resetSeed();
  }

  public exportData() {
    return db.getState();
  }

  public importData(newState: any) {
    if (!newState || !Array.isArray(newState.goals) || !Array.isArray(newState.tasks)) {
      throw new Error('Invalid backup format: goals and tasks arrays are required.');
    }
    db.setState(newState);
    return true;
  }
}

export const taskService = new TaskService();
