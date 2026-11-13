import { Router } from 'express';
import {
  backupDatabase,
  createGoal,
  createTask,
  deleteGoal,
  deleteTask,
  getDailyActivity,
  getGoals,
  getSummary,
  getTasks,
  resetData,
  restoreDatabase,
  toggleTask,
  updateGoal,
  updateTask
} from '../controllers/taskController.js';

const router = Router();

// Overall & Daily Tracking
router.get('/summary', getSummary);
router.get('/daily-activity', getDailyActivity);
router.post('/seed', resetData);
router.get('/backup', backupDatabase);
router.post('/restore', restoreDatabase);

// Goals
router.get('/goals', getGoals);
router.post('/goals', createGoal);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

// Tasks
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.post('/tasks/:id/toggle', toggleTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
