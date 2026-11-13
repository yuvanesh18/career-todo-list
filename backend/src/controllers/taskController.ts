import { Request, Response } from 'express';
import { z } from 'zod';
import { taskService } from '../services/taskService.js';
import { verifyToken } from '../auth.js';
import { DEFAULT_USER_ID } from '../db.js';

// Auth User Helper
export function getAuthUserId(req: Request): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const verifiedId = verifyToken(token);
    if (verifiedId) return verifiedId;
  }
  return DEFAULT_USER_ID;
}

// Validation Schemas
const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const LoginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required')
});

const CreateGoalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  category: z.string().optional().default('General'),
  icon: z.string().optional().default('Target')
});

const CreateTaskSchema = z.object({
  goalId: z.string().min(1, 'Goal ID is required'),
  title: z.string().min(1, 'Title is required'),
  topic: z.string().optional().default('General'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  url: z.string().url().optional().or(z.literal('')),
  duration: z.number().nonnegative().optional(),
  completed: z.boolean().optional().default(false)
});

// --- AUTH CONTROLLERS ---
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation failed' });
      return;
    }
    const result = await taskService.register(parsed.data.name, parsed.data.email, parsed.data.password);
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.issues[0]?.message || 'Validation failed' });
      return;
    }
    const result = await taskService.login(parsed.data.email, parsed.data.password);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const user = await taskService.getUserById(userId);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- SUMMARY & DAILY ACTIVITY ---
export const getSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const summary = await taskService.getSummary(userId);
    res.json({ success: true, data: summary });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getDailyActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const activity = await taskService.getDailyActivity(userId);
    res.json({ success: true, data: activity });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- GOALS ---
export const getGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const goals = await taskService.getGoals(userId);
    res.json({ success: true, count: goals.length, data: goals });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const parsed = CreateGoalSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.format() });
      return;
    }
    const goal = await taskService.createGoal(userId, parsed.data);
    res.status(201).json({ success: true, data: goal });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const id = String(req.params.id);
    const updated = await taskService.updateGoal(userId, id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const id = String(req.params.id);
    const deleted = await taskService.deleteGoal(userId, id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, message: 'Goal and its tasks removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- TASKS ---
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const goalId = req.query.goalId ? String(req.query.goalId) : undefined;
    const topic = req.query.topic ? String(req.query.topic) : undefined;
    const completed = req.query.completed !== undefined ? req.query.completed === 'true' : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const tasks = await taskService.getTasks(userId, { goalId, topic, completed, search });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const parsed = CreateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.format() });
      return;
    }
    const task = await taskService.createTask(userId, {
      ...parsed.data,
      url: parsed.data.url || undefined
    });
    res.status(201).json({ success: true, data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const toggleTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getAuthUserId(req);
    const id = String(req.params.id);
    const task = await taskService.toggleTask(userId, id);
    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const userId = getAuthUserId(req);
    const updated = await taskService.updateTask(userId, id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const userId = getAuthUserId(req);
    const deleted = await taskService.deleteTask(userId, id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, message: 'Task deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const resetData = async (_req: Request, res: Response): Promise<void> => {
  try {
    await taskService.resetSeed();
    res.json({ success: true, message: 'Reset to initial seed' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const backupDatabase = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await taskService.exportData();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const restoreDatabase = async (req: Request, res: Response): Promise<void> => {
  try {
    const backup = req.body.data || req.body;
    await taskService.importData(backup);
    res.json({ success: true, message: 'Database successfully restored' });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
