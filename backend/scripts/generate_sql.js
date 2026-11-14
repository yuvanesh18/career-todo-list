import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(__dirname, '..', 'data', 'seed_data.json');
const sqlPath = path.join(__dirname, '..', 'data', 'init_supabase.sql');

const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- CareerPulse Supabase Initialization Script
-- Paste and Run this in Supabase SQL Editor to create tables & seed both Grind 169 DSA and AWS MLA-C02 roadmaps!

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goals (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) DEFAULT 'Career',
  icon VARCHAR(50) DEFAULT 'Target',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  goal_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(100) DEFAULT 'General',
  difficulty VARCHAR(20),
  url TEXT,
  duration INT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  completed_date VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subtopic VARCHAR(255),
  is_important BOOLEAN DEFAULT FALSE,
  description TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_goal ON tasks(user_id, goal_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(user_id, completed, completed_date);

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS subtopic VARCHAR(255);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS is_important BOOLEAN DEFAULT FALSE;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS notes TEXT;

-- Insert Default User: Yuvanesh (password: password123)
INSERT INTO users (id, name, email, password_hash, salt, created_at)
VALUES (
  'user-default',
  'Yuvanesh',
  'yuvanesh@example.com',
  '3a216440cf6e35ae58f00db1cb11c2106e22f254b41300994fbc266f8e7aebae5059bbd407ff2497672ec1d4ce8c707d727b1eeea0a9e7232230b809d4376483',
  'd4b73b22e1b827e85c150c77bc1b8cf4',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert Default Goals
INSERT INTO goals (id, user_id, title, description, category, icon, created_at)
VALUES 
  ('goal-dsa', 'user-default', 'Master DSA (Grind 169)', 'Complete all 169 top interview questions grouped by topic from Tech Interview Handbook', 'Algorithms & Data Structures', 'Code2', NOW()),
  ('goal-aws', 'user-default', 'AWS Certified Machine Learning Engineer - Associate (MLA-C02)', 'Comprehensive 1000/1000 study roadmap covering Data Prep (28%), Model & FM Development (24%), Deployment & MLOps (24%), and Operations & Security (24%).', 'Cloud & Machine Learning', 'BrainCircuit', NOW())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, category = EXCLUDED.category, icon = EXCLUDED.icon;

-- Insert Tasks
`;

const size = 25;
for (let i = 0; i < seed.tasks.length; i += size) {
  const chunk = seed.tasks.slice(i, i + size);
  sql += `INSERT INTO tasks (id, user_id, goal_id, title, topic, difficulty, url, duration, completed, created_at, subtopic, is_important, description, notes)\nVALUES\n`;
  sql += chunk.map(t => {
    return `  (${esc(t.id)}, 'user-default', ${esc(t.goalId)}, ${esc(t.title)}, ${esc(t.topic)}, ${esc(t.difficulty)}, ${esc(t.url)}, ${t.duration || 'NULL'}, ${Boolean(t.completed)}, NOW(), ${esc(t.subtopic)}, ${Boolean(t.isImportant)}, ${esc(t.description)}, ${esc(t.notes)})`;
  }).join(',\n');
  sql += `\nON CONFLICT (id) DO UPDATE SET\n  title = EXCLUDED.title, topic = EXCLUDED.topic, difficulty = EXCLUDED.difficulty, url = EXCLUDED.url, duration = EXCLUDED.duration, subtopic = EXCLUDED.subtopic, is_important = EXCLUDED.is_important, description = EXCLUDED.description, notes = EXCLUDED.notes;\n\n`;
}

fs.writeFileSync(sqlPath, sql, 'utf-8');
console.log(`✅ Generated ${sqlPath} with ${seed.tasks.length} tasks!`);
