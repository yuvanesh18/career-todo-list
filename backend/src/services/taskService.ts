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
  public async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      throw new Error('Name, email, and password are required');
    }

    const existing = await db.getUserByEmail(trimmedEmail);
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

    // Save user
    await db.addUser(newUser);

    // Initialize individual seeded goals & tasks for new user
    const { goals: userGoals, tasks: userTasks } = createUserDataForUser(userId);
    for (const g of userGoals) {
      await db.addGoal(g);
    }
    if (db.isPostgres()) {
      await db.batchInsertTasks(userTasks);
    } else {
      for (const t of userTasks) {
        await db.addTask(t);
      }
    }

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

  public async login(email: string, password: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();
    const user = await db.getUserByEmail(trimmedEmail);

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

  public async getUserById(userId: string): Promise<UserProfile | null> {
    const user = await db.getUserById(userId);
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  // --- GOALS ---
  public async getGoals(userId: string = DEFAULT_USER_ID): Promise<Goal[]> {
    return db.getGoals(userId);
  }

  public async getGoalById(userId: string = DEFAULT_USER_ID, id: string): Promise<Goal | null> {
    const goals = await this.getGoals(userId);
    return goals.find(g => g.id === id) || null;
  }

  public async createGoal(userId: string = DEFAULT_USER_ID, data: Omit<Goal, 'id' | 'createdAt' | 'userId'>): Promise<Goal> {
    const newGoal: Goal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      title: data.title.trim(),
      description: data.description || '',
      category: data.category || 'Career',
      icon: data.icon || 'Target',
      createdAt: new Date().toISOString()
    };
    return db.addGoal(newGoal);
  }

  public async updateGoal(userId: string = DEFAULT_USER_ID, id: string, updates: Partial<Goal>): Promise<Goal | null> {
    return db.updateGoal(userId, id, updates);
  }

  public async deleteGoal(userId: string = DEFAULT_USER_ID, id: string): Promise<boolean> {
    return db.deleteGoal(userId, id);
  }

  // --- TASKS ---
  public async getTasks(userId: string = DEFAULT_USER_ID, filters: {
    goalId?: string;
    topic?: string;
    completed?: boolean;
    search?: string;
  } = {}): Promise<Task[]> {
    return db.getTasks(userId, filters);
  }

  public async createTask(userId: string = DEFAULT_USER_ID, data: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'completedDate' | 'userId'> & { id?: string }): Promise<Task> {
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

    return db.addTask(newTask);
  }

  public async toggleTask(userId: string = DEFAULT_USER_ID, id: string): Promise<Task | null> {
    return db.toggleTask(userId, id);
  }

  public async updateTask(userId: string = DEFAULT_USER_ID, id: string, updates: Partial<Task>): Promise<Task | null> {
    return db.updateTask(userId, id, updates);
  }

  public async deleteTask(userId: string = DEFAULT_USER_ID, id: string): Promise<boolean> {
    return db.deleteTask(userId, id);
  }

  // --- DAILY TRACKING & ANALYTICS ---
  public async getDailyActivity(userId: string = DEFAULT_USER_ID): Promise<DailyGroupedActivity[]> {
    const goals = await this.getGoals(userId);
    const goalMap = new Map<string, string>();
    goals.forEach(g => goalMap.set(g.id, g.title));

    const userTasks = await this.getTasks(userId);
    const completedTasks = userTasks.filter(t => t.completed && t.completedDate);

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

  public async getSummary(userId: string = DEFAULT_USER_ID): Promise<OverallSummary> {
    const goals = await this.getGoals(userId);
    const goalMap = new Map<string, string>();
    goals.forEach(g => goalMap.set(g.id, g.title));

    const userTasks = await this.getTasks(userId);
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

    // Consecutive streak days
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

    const recentActivity = await this.getDailyActivity(userId);

    return {
      totalGoals: goals.length,
      totalTasks,
      completedTasksTotal,
      completedTodayCount: todayTasks.length,
      todayCompletedItems,
      recentDailyActivity: recentActivity.slice(0, 7),
      streakDays,
      goalStats
    };
  }

  public async resetSeed() {
    return db.resetSeed();
  }

  public async exportData() {
    return db.exportData();
  }

  public async importData(newState: any) {
    if (!newState || !Array.isArray(newState.goals) || !Array.isArray(newState.tasks)) {
      throw new Error('Invalid backup format: goals and tasks arrays are required.');
    }
    return db.importData(newState);
  }
}

export const taskService = new TaskService();
