import { Router } from 'express';
import {
  createGoal,
  createTask,
  deleteGoal,
  deleteTask,
  getDailyLogs,
  getDashboard,
  getGoals,
  getTasks,
  recordDailyStatus,
  resetData,
  updateGoal,
  updateTask
} from '../controllers/taskController.js';

const router = Router();

// Dashboard Summary
router.get('/dashboard', getDashboard);
router.post('/seed', resetData);

// Goals (Short-term goals in months)
router.get('/goals', getGoals);
router.post('/goals', createGoal);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

// Tasks (Daily to-do tasks linked to goals)
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

// Daily Status Updates & Logs
router.get('/daily-logs', getDailyLogs);
router.post('/daily-logs', recordDailyStatus);

export default router;
