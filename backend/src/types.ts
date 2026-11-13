export type GoalStatus = 'Active' | 'Completed' | 'On Hold';

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetMonths: number; // e.g. 1, 2, 3, 6 months
  startDate: string; // YYYY-MM-DD
  targetEndDate: string; // YYYY-MM-DD
  status: GoalStatus;
  category: string;
  createdAt: string;
}

export interface Task {
  id: string;
  goalId?: string | null;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string | null; // YYYY-MM-DD
  estimatedHours: number;
  actualHours: number;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  completedAt: string | null;
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  goalId?: string | null;
  statusSummary: string; // What did I do today?
  hoursSpent: number;
  energyLevel: 'High' | 'Medium' | 'Low';
  createdAt: string;
}

export interface AppStateData {
  goals: Goal[];
  tasks: Task[];
  dailyLogs: DailyLog[];
}

export interface DashboardSummary {
  activeGoal: Goal | null;
  goalProgressPercent: number;
  daysRemaining: number;
  totalDays: number;
  currentDayInGoal: number;
  todayTasksTotal: number;
  todayTasksCompleted: number;
  todayLoggedStatus: boolean;
  totalHoursSpent: number;
  streakDays: number;
  recentLogs: DailyLog[];
}
