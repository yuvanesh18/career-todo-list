import dns from 'node:dns';
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { db } from './db.js';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {}

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = createApp();

async function startServer() {
  try {
    await db.init();
    console.log('✅ Database connected and initialized successfully');
  } catch (err: any) {
    console.error('❌ Database initialization error during startup:', err.message || err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 CareerPulse API server running on port ${PORT}`);
    console.log(`📊 Health check available at /health`);
  });
}

startServer();

