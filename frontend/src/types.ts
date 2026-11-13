export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  topic: string;
  difficulty?: Difficulty;
  url?: string;
  duration?: number;
  completed: boolean;
  completedAt: string | null;
  completedDate: string | null;
  createdAt: string;
}

export interface DailyActivityItem {
  taskId: string;
  taskTitle: string;
  goalId: string;
  goalTitle: string;
  topic: string;
  difficulty?: Difficulty;
  url?: string;
  completedAt: string;
}

export interface DailyGroupedActivity {
  date: string;
  count: number;
  items: DailyActivityItem[];
}

export interface GoalStats {
  goalId: string;
  goalTitle: string;
  totalTasks: number;
  completedTasks: number;
  percent: number;
  byTopic: Record<string, { total: number; completed: number }>;
}

export interface OverallSummary {
  totalGoals: number;
  totalTasks: number;
  completedTasksTotal: number;
  completedTodayCount: number;
  todayCompletedItems: DailyActivityItem[];
  recentDailyActivity: DailyGroupedActivity[];
  streakDays: number;
  goalStats: GoalStats[];
}

export type ActiveTab = 'goals' | 'daily-tracker';
