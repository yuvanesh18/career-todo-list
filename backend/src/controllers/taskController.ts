import { Request, Response } from 'express';
import { z } from 'zod';
import { taskService } from '../services/taskService.js';
import { FilterOptions, TaskCategory, TaskPriority, TaskStatus } from '../types.js';

const CategoryEnum = z.enum([
  'System Design',
  'DSA & Algorithms',
  'Cloud & DevOps',
  'Full Stack Projects',
  'Interview Prep',
  'Certifications',
  'Soft Skills & Leadership',
  'Daily Habit'
]);

const PriorityEnum = z.enum(['Low', 'Medium', 'High', 'Urgent']);
const StatusEnum = z.enum(['Backlog', 'To Do', 'In Progress', 'In Review', 'Done']);

const SubtaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean()
});

const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  category: CategoryEnum,
  priority: PriorityEnum.optional().default('Medium'),
  status: StatusEnum.optional().default('To Do'),
  tags: z.array(z.string()).optional().default([]),
  subtasks: z.array(SubtaskSchema).optional().default([]),
  estimatedHours: z.number().nonnegative().optional().default(1),
  actualHours: z.number().nonnegative().optional().default(0),
  pomodoroSessions: z.number().int().nonnegative().optional().default(0),
  dueDate: z.string().nullable().optional().default(null),
  reflectionNotes: z.string().optional().default('')
});

const UpdateTaskSchema = CreateTaskSchema.partial();

export const getAllTasks = (req: Request, res: Response): void => {
  try {
    const filters: FilterOptions = {
      status: req.query.status as TaskStatus | undefined,
      category: req.query.category as TaskCategory | undefined,
      priority: req.query.priority as TaskPriority | undefined,
      tag: req.query.tag as string | undefined,
      search: req.query.search as string | undefined,
      sortBy: req.query.sortBy as any,
      sortOrder: req.query.sortOrder as any
    };

    const tasks = taskService.getAll(filters);
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTaskById = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const task = taskService.getById(id);
    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createTask = (req: Request, res: Response): void => {
  try {
    const parsed = CreateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.format()
      });
      return;
    }

    const newTask = taskService.create(parsed.data);
    res.status(201).json({ success: true, data: newTask });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  try {
    const parsed = UpdateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.format()
      });
      return;
    }

    const id = String(req.params.id);
    const updated = taskService.update(id, parsed.data);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = taskService.delete(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const logPomodoroSession = (req: Request, res: Response): void => {
  try {
    const minutes = req.body.minutes ? Number(req.body.minutes) : 25;
    const id = String(req.params.id);
    const task = taskService.logPomodoro(id, minutes);
    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }
    res.json({
      success: true,
      message: `Logged ${minutes}m Pomodoro session`,
      data: task
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalytics = (_req: Request, res: Response): void => {
  try {
    const summary = taskService.getAnalytics();
    res.json({ success: true, data: summary });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const resetSeedData = (_req: Request, res: Response): void => {
  try {
    const resetTasks = taskService.resetSeed();
    res.json({
      success: true,
      message: 'Database reset to initial career tasks',
      count: resetTasks.length,
      data: resetTasks
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const exportData = (_req: Request, res: Response): void => {
  try {
    const exported = taskService.exportAll();
    res.json({ success: true, data: exported });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const importData = (req: Request, res: Response): void => {
  try {
    const tasks = req.body.tasks || req.body;
    const result = taskService.importAll(tasks);
    res.json({ success: true, message: `Successfully imported ${result.importedCount} tasks` });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
