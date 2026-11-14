export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  userId: string;
  goalId: string;
  title: string;
  topic: string; // e.g. "Array", "Stack", "Domain 1: Data Preparation"
  subtopic?: string; // e.g. "1.1 Collect & Store Data"
  difficulty?: Difficulty;
  url?: string; // e.g. LeetCode link or AWS documentation link
  duration?: number; // estimated minutes
  completed: boolean;
  completedAt: string | null; // ISO timestamp
  completedDate: string | null; // YYYY-MM-DD
  createdAt: string;
  isImportant?: boolean; // Marks critical/high-yield exam topics
  description?: string; // Concept explanation
  notes?: string; // Quick revision notes and exam traps
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
  date: string; // YYYY-MM-DD
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
