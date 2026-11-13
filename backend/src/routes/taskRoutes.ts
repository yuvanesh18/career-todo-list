import { Router } from 'express';
import {
  createTask,
  deleteTask,
  exportData,
  getAllTasks,
  getAnalytics,
  getTaskById,
  importData,
  logPomodoroSession,
  resetSeedData,
  updateTask
} from '../controllers/taskController.js';

const router = Router();

// Analytics & Utilities (defined before parameterized :id route)
router.get('/analytics', getAnalytics);
router.post('/seed', resetSeedData);
router.get('/export', exportData);
router.post('/import', importData);

// CRUD
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.post('/tasks/:id/pomodoro', logPomodoroSession);

export default router;
