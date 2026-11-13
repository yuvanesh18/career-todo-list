export type TaskCategory =
  | 'System Design'
  | 'DSA & Algorithms'
  | 'Cloud & DevOps'
  | 'Full Stack Projects'
  | 'Interview Prep'
  | 'Certifications'
  | 'Soft Skills & Leadership'
  | 'Daily Habit';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[];
  subtasks: Subtask[];
  estimatedHours: number;
  actualHours: number;
  pomodoroSessions: number;
  dueDate: string | null;
  reflectionNotes: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface CategoryStats {
  total: number;
  completed: number;
  hours: number;
}

export interface AnalyticsSummary {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  completionRate: number;
  totalEstimatedHours: number;
  totalActualHours: number;
  totalPomodoros: number;
  currentStreakDays: number;
  categoryBreakdown: Record<string, CategoryStats>;
  priorityBreakdown: Record<string, number>;
  weeklyCompleted: { date: string; count: number }[];
}

export interface FilterOptions {
  status?: TaskStatus;
  category?: TaskCategory;
  priority?: TaskPriority;
  search?: string;
  tag?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdAt' | 'estimatedHours';
  sortOrder?: 'asc' | 'desc';
}
