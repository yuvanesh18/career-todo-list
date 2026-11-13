import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes.js';

export const createApp = (): Express => {
  const app = express();

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint for Docker & Kubernetes / CI
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'career-pulse-backend'
    });
  });

  // API Routes
  app.use('/api', taskRoutes);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
  });

  return app;
};

