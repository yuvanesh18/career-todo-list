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

app.listen(PORT, async () => {
  console.log(`🚀 CareerPulse API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  try {
    await db.init();
    console.log('✅ Database connected and initialized successfully');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
  }
});

