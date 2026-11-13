import { Request, Response } from 'express';
import { z } from 'zod';
import { taskService } from '../services/taskService.js';

// Schemas
const CreateGoalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  targetMonths: z.number().min(1).max(24).default(1),
  startDate: z.string().optional(),
  targetEndDate: z.string().min(1, 'Target end date is required'),
  status: z.enum(['Active', 'Completed', 'On Hold']).optional().default('Active'),
  category: z.string().optional().default('Career Growth')
});

const CreateTaskSchema = z.object({
  goalId: z.string().nullable().optional(),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional().default(''),
  completed: z.boolean().optional().default(false),
  dueDate: z.string().nullable().optional(),
  estimatedHours: z.number().nonnegative().optional().default(1),
  actualHours: z.number().nonnegative().optional().default(0),
  priority: z.enum(['Low', 'Medium', 'High']).optional().default('Medium')
});

const RecordDailyStatusSchema = z.object({
  date: z.string().optional(),
  goalId: z.string().nullable().optional(),
  statusSummary: z.string().min(1, 'Status summary is required'),
  hoursSpent: z.number().nonnegative().default(1),
  energyLevel: z.enum(['High', 'Medium', 'Low']).optional().default('Medium')
});

// Dashboard
export const getDashboard = (_req: Request, res: Response): void => {
  try {
    const summary = taskService.getDashboard();
    res.json({ success: true, data: summary });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Goals
export const getGoals = (_req: Request, res: Response): void => {
  try {
    const goals = taskService.getGoals();
    res.json({ success: true, data: goals });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createGoal = (req: Request, res: Response): void => {
  try {
    const parsed = CreateGoalSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.format() });
      return;
    }
    const goal = taskService.createGoal(parsed.data as any);
    res.status(201).json({ success: true, data: goal });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateGoal = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const updated = taskService.updateGoal(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteGoal = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = taskService.deleteGoal(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Goal not found' });
      return;
    }
    res.json({ success: true, message: 'Goal removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Tasks
export const getTasks = (req: Request, res: Response): void => {
  try {
    const goalId = req.query.goalId ? String(req.query.goalId) : undefined;
    const tasks = taskService.getTasks(goalId);
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createTask = (req: Request, res: Response): void => {
  try {
    const parsed = CreateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.format() });
      return;
    }
    const newTask = taskService.createTask({
      ...parsed.data,
      dueDate: parsed.data.dueDate || null
    });
    res.status(201).json({ success: true, data: newTask });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const updated = taskService.updateTask(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = taskService.deleteTask(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, message: 'Task deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Daily Status Logs
export const getDailyLogs = (_req: Request, res: Response): void => {
  try {
    const logs = taskService.getDailyLogs();
    res.json({ success: true, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const recordDailyStatus = (req: Request, res: Response): void => {
  try {
    const parsed = RecordDailyStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: parsed.error.format() });
      return;
    }
    const log = taskService.recordDailyStatus({
      ...parsed.data,
      date: parsed.data.date || new Date().toISOString().split('T')[0]
    });
    res.status(201).json({ success: true, data: log });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const resetData = (_req: Request, res: Response): void => {
  try {
    const state = taskService.resetSeed();
    res.json({ success: true, message: 'Database reset to default', data: state });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
