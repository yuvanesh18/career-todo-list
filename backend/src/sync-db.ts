import dns from 'node:dns';
import dotenv from 'dotenv';
import { db } from './db.js';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {}

dotenv.config();

async function runSync() {
  console.log('🔄 Starting database synchronization...');
  const isPg = Boolean(process.env.DATABASE_URL);
  console.log(`Target: ${isPg ? 'PostgreSQL / Supabase Remote Database' : 'Local JSON Database'}`);

  try {
    await db.init();
    const result = await db.syncRoadmap();
    console.log(`✅ Success! Synced ${result.total} curriculum tasks into ${isPg ? 'Supabase/PostgreSQL' : 'local database'}.`);
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Failed to sync database:', err.message || err);
    process.exit(1);
  }
}

runSync();
