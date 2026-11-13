import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { taskService } from '../src/services/taskService.js';

const app = createApp();

describe('CareerPulse Goal & Daily Progress API', () => {
  beforeEach(() => {
    taskService.resetSeed();
  });

  describe('Health Check Endpoint', () => {
    it('GET /health returns healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('Short-Term Goals API', () => {
    it('GET /api/goals returns initial active goal', async () => {
      const res = await request(app).get('/api/goals');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].targetMonths).toBeDefined();
    });

    it('POST /api/goals creates a new 3-month career goal', async () => {
      const newGoal = {
        title: 'Clear AWS Certified Solutions Architect',
        description: 'Complete video course, hands-on labs, and 6 practice exams',
        targetMonths: 3,
        startDate: '2026-11-01',
        targetEndDate: '2027-01-31',
        status: 'Active',
        category: 'Certifications'
      };

      const res = await request(app).post('/api/goals').send(newGoal);
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(newGoal.title);
      expect(res.body.data.targetMonths).toBe(3);
    });
  });

  describe('Daily Tasks API', () => {
    it('GET /api/tasks returns to-do items', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('POST /api/tasks creates a task linked to active goal', async () => {
      const task = {
        title: 'Study Kubernetes Deployments & Ingress Controllers',
        dueDate: new Date().toISOString().split('T')[0],
        estimatedHours: 2,
        priority: 'High'
      };

      const res = await request(app).post('/api/tasks').send(task);
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(task.title);
      expect(res.body.data.completed).toBe(false);
    });

    it('PUT /api/tasks/:id marks task as completed', async () => {
      const res = await request(app)
        .put('/api/tasks/task-3')
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.data.completed).toBe(true);
      expect(res.body.data.completedAt).not.toBeNull();
    });
  });

  describe('Daily Status Updates & Dashboard API', () => {
    it('POST /api/daily-logs records daily status update', async () => {
      const dailyLog = {
        date: new Date().toISOString().split('T')[0],
        statusSummary: 'Practiced 3 hours on Docker multi-stage builds and wrote API tests.',
        hoursSpent: 3.0,
        energyLevel: 'High'
      };

      const res = await request(app).post('/api/daily-logs').send(dailyLog);
      expect(res.status).toBe(201);
      expect(res.body.data.statusSummary).toBe(dailyLog.statusSummary);
      expect(res.body.data.hoursSpent).toBe(3.0);
    });

    it('GET /api/dashboard returns goal days remaining and progress', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.activeGoal).toBeDefined();
      expect(res.body.data.daysRemaining).toBeDefined();
      expect(res.body.data.goalProgressPercent).toBeDefined();
    });
  });
});
