import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { taskService } from '../src/services/taskService.js';

const app = createApp();

describe('CareerPulse API Test Suite', () => {
  beforeEach(() => {
    // Reset to clean seed data before each test
    taskService.resetSeed();
  });

  describe('Health Check Endpoint', () => {
    it('GET /health returns healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.service).toBe('career-pulse-backend');
    });
  });

  describe('Tasks CRUD API', () => {
    it('GET /api/tasks returns seeded career tasks', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.count).toBeGreaterThanOrEqual(5);
    });

    it('GET /api/tasks with query filters works correctly', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ category: 'DSA & Algorithms' });

      expect(res.status).toBe(200);
      expect(res.body.data.every((t: any) => t.category === 'DSA & Algorithms')).toBe(true);
    });

    it('POST /api/tasks creates a new career goal task', async () => {
      const newTask = {
        title: 'Complete AWS Certified Solutions Architect Practice Exam',
        description: 'Take 65 question test and review incorrect answers',
        category: 'Certifications',
        priority: 'High',
        status: 'To Do',
        tags: ['aws', 'cloud', 'certification'],
        estimatedHours: 3,
        subtasks: [
          { id: 'sub-100', title: 'Answer 65 questions in timed mode', completed: false }
        ]
      };

      const res = await request(app).post('/api/tasks').send(newTask);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(newTask.title);
      expect(res.body.data.id).toBeDefined();
    });

    it('POST /api/tasks fails when title is missing', async () => {
      const res = await request(app).post('/api/tasks').send({
        category: 'Certifications'
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('PUT /api/tasks/:id updates status and marks completion time', async () => {
      const res = await request(app)
        .put('/api/tasks/task-1')
        .send({ status: 'Done', reflectionNotes: 'Successfully configured GitHub Actions CI!' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('Done');
      expect(res.body.data.completedAt).not.toBeNull();
      expect(res.body.data.reflectionNotes).toContain('Successfully configured');
    });

    it('POST /api/tasks/:id/pomodoro logs a 25min focus session', async () => {
      const initialTask = taskService.getById('task-2');
      const initialHours = initialTask?.actualHours || 0;
      const initialPomodoros = initialTask?.pomodoroSessions || 0;

      const res = await request(app)
        .post('/api/tasks/task-2/pomodoro')
        .send({ minutes: 25 });

      expect(res.status).toBe(200);
      expect(res.body.data.pomodoroSessions).toBe(initialPomodoros + 1);
      expect(res.body.data.actualHours).toBeGreaterThan(initialHours);
    });

    it('DELETE /api/tasks/:id deletes the task', async () => {
      const res = await request(app).delete('/api/tasks/task-5');
      expect(res.status).toBe(200);

      const check = await request(app).get('/api/tasks/task-5');
      expect(check.status).toBe(404);
    });
  });

  describe('Analytics & Progress API', () => {
    it('GET /api/analytics returns accurate career metrics', async () => {
      const res = await request(app).get('/api/analytics');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalTasks).toBeGreaterThan(0);
      expect(res.body.data.completionRate).toBeDefined();
      expect(res.body.data.categoryBreakdown).toBeDefined();
      expect(res.body.data.priorityBreakdown).toBeDefined();
    });
  });
});
