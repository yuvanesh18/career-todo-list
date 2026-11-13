import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { taskService } from '../src/services/taskService.js';

const app = createApp();

describe('Goal-Based Tasks & Daily Tracking API', () => {
  beforeEach(() => {
    taskService.resetSeed();
  });

  describe('Health Endpoint', () => {
    it('GET /health returns healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('Goals API', () => {
    it('GET /api/goals returns initial goals (DSA & AWS)', async () => {
      const res = await request(app).get('/api/goals');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBeGreaterThanOrEqual(2);
      expect(res.body.data.some((g: any) => g.title.includes('DSA'))).toBe(true);
    });

    it('POST /api/goals creates a custom goal', async () => {
      const newGoal = {
        title: 'Master System Design & Microservices',
        description: 'Read Designing Data-Intensive Applications & Alex Xu books',
        category: 'System Design',
        icon: 'Server'
      };

      const res = await request(app).post('/api/goals').send(newGoal);
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(newGoal.title);
      expect(res.body.data.id).toBeDefined();
    });
  });

  describe('Tasks API with Grind 169 DSA questions', () => {
    it('GET /api/tasks?goalId=goal-dsa returns the 169 DSA questions', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ goalId: 'goal-dsa' });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(169);
      expect(res.body.data[0].topic).toBeDefined();
    });

    it('POST /api/tasks/:id/toggle toggles task completion and records completedDate', async () => {
      // Find an incomplete task
      const incompleteTask = taskService.getTasks({ completed: false })[0];
      expect(incompleteTask).toBeDefined();

      const res = await request(app).post(`/api/tasks/${incompleteTask.id}/toggle`);
      expect(res.status).toBe(200);
      expect(res.body.data.completed).toBe(true);
      expect(res.body.data.completedDate).toBeDefined();
    });

    it('POST /api/tasks adds a new task under a goal', async () => {
      const newTask = {
        goalId: 'goal-aws',
        title: 'Complete AWS Cloud Practitioner Practice Exam 2',
        topic: 'Practice Exams',
        difficulty: 'Medium'
      };

      const res = await request(app).post('/api/tasks').send(newTask);
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(newTask.title);
      expect(res.body.data.completed).toBe(false);
    });
  });

  describe('Daily Tracking & Summary API', () => {
    it('GET /api/daily-activity returns completed items grouped by date', async () => {
      const res = await request(app).get('/api/daily-activity');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      if (res.body.data.length > 0) {
        expect(res.body.data[0].date).toBeDefined();
        expect(res.body.data[0].items.length).toBeGreaterThan(0);
      }
    });

    it('GET /api/summary returns overall progress and today completion stats', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.status).toBe(200);
      expect(res.body.data.totalGoals).toBeGreaterThanOrEqual(2);
      expect(res.body.data.totalTasks).toBeGreaterThanOrEqual(169);
      expect(res.body.data.completedTodayCount).toBeDefined();
      expect(res.body.data.goalStats).toBeDefined();
    });
  });
});
