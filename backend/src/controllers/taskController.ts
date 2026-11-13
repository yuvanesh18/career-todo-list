import { Request, Response } from 'express';
import { z } from 'zod';
import { taskService } from '../services/taskService.js';

// Schemas
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

// Summary & Daily Activity
export const getSummary = (_req: Request, res: Response): void => {
  try {
    const summary = taskService.getSummary();
    res.json({ success: true, data: summary });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getDailyActivity = (_req: Request, res: Response): void => {
  try {
    const activity = taskService.getDailyActivity();
    res.json({ success: true, data: activity });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Goals
export const getGoals = (_req: Request, res: Response): void => {
  try {
    const goals = taskService.getGoals();
    res.json({ success: true, count: goals.length, data: goals });
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
    const goal = taskService.createGoal(parsed.data);
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
    res.json({ success: true, message: 'Goal and its tasks removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Tasks
export const getTasks = (req: Request, res: Response): void => {
  try {
    const goalId = req.query.goalId ? String(req.query.goalId) : undefined;
    const topic = req.query.topic ? String(req.query.topic) : undefined;
    const completed = req.query.completed !== undefined ? req.query.completed === 'true' : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const tasks = taskService.getTasks({ goalId, topic, completed, search });
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
    const task = taskService.createTask({
      ...parsed.data,
      url: parsed.data.url || undefined
    });
    res.status(201).json({ success: true, data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const toggleTask = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const task = taskService.toggleTask(id);
    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: task });
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

export const resetData = (_req: Request, res: Response): void => {
  try {
    const state = taskService.resetSeed();
    res.json({ success: true, message: 'Reset to initial seed', data: state });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
