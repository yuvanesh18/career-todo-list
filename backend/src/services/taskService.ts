import { db } from '../db.js';
import { AppStateData, DailyLog, DashboardSummary, Goal, Task } from '../types.js';

export class TaskService {
  // --- GOALS ---
  public getGoals(): Goal[] {
    return db.getState().goals;
  }

  public getActiveGoal(): Goal | null {
    const goals = this.getGoals();
    return goals.find(g => g.status === 'Active') || goals[0] || null;
  }

  public createGoal(data: Omit<Goal, 'id' | 'createdAt'>): Goal {
    const state = db.getState();
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: data.title.trim(),
      description: data.description || '',
      targetMonths: Number(data.targetMonths) || 1,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      targetEndDate: data.targetEndDate,
      status: data.status || 'Active',
      category: data.category || 'Career Growth',
      createdAt: new Date().toISOString()
    };

    // If marked active, set other goals to On Hold
    if (newGoal.status === 'Active') {
      state.goals.forEach(g => {
        g.status = 'On Hold';
      });
    }

    state.goals.unshift(newGoal);
    db.setState(state);
    return newGoal;
  }

  public updateGoal(id: string, updates: Partial<Goal>): Goal | null {
    const state = db.getState();
    const index = state.goals.findIndex(g => g.id === id);
    if (index === -1) return null;

    if (updates.status === 'Active') {
      state.goals.forEach(g => {
        if (g.id !== id) g.status = 'On Hold';
      });
    }

    state.goals[index] = { ...state.goals[index], ...updates };
    db.setState(state);
    return state.goals[index];
  }

  public deleteGoal(id: string): boolean {
    const state = db.getState();
    const initialLen = state.goals.length;
    state.goals = state.goals.filter(g => g.id !== id);
    if (state.goals.length === initialLen) return false;
    db.setState(state);
    return true;
  }

  // --- TASKS ---
  public getTasks(goalId?: string): Task[] {
    const state = db.getState();
    let tasks = [...state.tasks];
    if (goalId) {
      tasks = tasks.filter(t => t.goalId === goalId);
    }
    return tasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public createTask(data: Omit<Task, 'id' | 'createdAt' | 'completedAt'> & { id?: string }): Task {
    const state = db.getState();
    const now = new Date().toISOString();
    const newTask: Task = {
      id: data.id || `task-${Date.now()}`,
      goalId: data.goalId || null,
      title: data.title.trim(),
      description: data.description || '',
      completed: Boolean(data.completed),
      dueDate: data.dueDate || null,
      estimatedHours: Number(data.estimatedHours) || 1,
      actualHours: Number(data.actualHours) || 0,
      priority: data.priority || 'Medium',
      createdAt: now,
      completedAt: data.completed ? now : null
    };

    state.tasks.unshift(newTask);
    db.setState(state);
    return newTask;
  }

  public updateTask(id: string, updates: Partial<Task>): Task | null {
    const state = db.getState();
    const index = state.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const existing = state.tasks[index];
    const now = new Date().toISOString();

    let completedAt = existing.completedAt;
    if (updates.completed !== undefined) {
      if (updates.completed && !existing.completed) {
        completedAt = now;
      } else if (!updates.completed) {
        completedAt = null;
      }
    }

    const updated: Task = {
      ...existing,
      ...updates,
      completedAt
    };

    state.tasks[index] = updated;
    db.setState(state);
    return updated;
  }

  public deleteTask(id: string): boolean {
    const state = db.getState();
    const initialLen = state.tasks.length;
    state.tasks = state.tasks.filter(t => t.id !== id);
    if (state.tasks.length === initialLen) return false;
    db.setState(state);
    return true;
  }

  // --- DAILY LOGS & STATUS UPDATES ---
  public getDailyLogs(): DailyLog[] {
    const state = db.getState();
    return [...state.dailyLogs].sort((a, b) => b.date.localeCompare(a.date));
  }

  public recordDailyStatus(data: Omit<DailyLog, 'id' | 'createdAt'>): DailyLog {
    const state = db.getState();
    const targetDate = data.date || new Date().toISOString().split('T')[0];

    // Check if a log for this date already exists; update it or create new
    const existingIndex = state.dailyLogs.findIndex(l => l.date === targetDate);
    const now = new Date().toISOString();

    if (existingIndex !== -1) {
      state.dailyLogs[existingIndex] = {
        ...state.dailyLogs[existingIndex],
        statusSummary: data.statusSummary,
        hoursSpent: Number(data.hoursSpent) || 0,
        energyLevel: data.energyLevel || 'Medium',
        goalId: data.goalId || state.dailyLogs[existingIndex].goalId
      };
      db.setState(state);
      return state.dailyLogs[existingIndex];
    }

    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: targetDate,
      goalId: data.goalId || null,
      statusSummary: data.statusSummary,
      hoursSpent: Number(data.hoursSpent) || 0,
      energyLevel: data.energyLevel || 'Medium',
      createdAt: now
    };

    state.dailyLogs.unshift(newLog);
    db.setState(state);
    return newLog;
  }

  // --- DASHBOARD SUMMARY ---
  public getDashboard(): DashboardSummary {
    const state = db.getState();
    const activeGoal = this.getActiveGoal();
    const todayStr = new Date().toISOString().split('T')[0];

    // Goal time progress
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

    // Goal tasks
    const goalTasks = activeGoal ? state.tasks.filter(t => t.goalId === activeGoal.id) : state.tasks;
    const completedGoalTasks = goalTasks.filter(t => t.completed).length;
    const goalProgressPercent = goalTasks.length > 0
      ? Math.round((completedGoalTasks / goalTasks.length) * 100)
      : 0;

    // Today's tasks
    const todayTasks = state.tasks.filter(t => t.dueDate === todayStr);
    const todayTasksCompleted = todayTasks.filter(t => t.completed).length;

    // Today logged check
    const todayLoggedStatus = state.dailyLogs.some(l => l.date === todayStr);

    // Total hours
    const totalHoursSpent = Number(
      state.dailyLogs.reduce((acc, l) => acc + (l.hoursSpent || 0), 0) +
      state.tasks.reduce((acc, t) => acc + (t.actualHours || 0), 0)
    ).toFixed(1);

    // Streak calculation (days with either task completed or daily log)
    const activeDates = new Set<string>();
    state.dailyLogs.forEach(l => activeDates.add(l.date));
    state.tasks.filter(t => t.completed && t.completedAt).forEach(t => {
      activeDates.add(t.completedAt!.split('T')[0]);
    });

    const sortedDates = Array.from(activeDates).sort().reverse();
    let streakDays = 0;
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (sortedDates.includes(todayStr) || sortedDates.includes(yesterdayStr)) {
      let checkDate = sortedDates.includes(todayStr)
        ? new Date()
        : new Date(Date.now() - 86400000);

      while (true) {
        const dKey = checkDate.toISOString().split('T')[0];
        if (sortedDates.includes(dKey)) {
          streakDays++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    }

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
      streakDays,
      recentLogs: state.dailyLogs.slice(0, 7)
    };
  }

  public resetSeed(): AppStateData {
    return db.resetToDefault();
  }
}

export const taskService = new TaskService();
