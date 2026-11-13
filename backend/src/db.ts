import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { Goal, Task, User } from './types.js';
import { hashPassword } from './auth.js';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const STATE_FILE = path.join(DATA_DIR, 'goals_and_tasks.json');
const SEED_FILE = path.join(DATA_DIR, 'seed_data.json');
const TEMPLATE_SEED_FILE = path.join(__dirname, '..', 'seed_template', 'seed_data.json');

export const DEFAULT_USER_ID = 'user-default';

export interface AppDatabaseState {
  users: User[];
  goals: Goal[];
  tasks: Task[];
}

export function createUserDataForUser(userId: string): { goals: Goal[]; tasks: Task[] } {
  let seedRaw: any = { goals: [], tasks: [] };
  if (fs.existsSync(SEED_FILE)) {
    seedRaw = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
  } else if (fs.existsSync(TEMPLATE_SEED_FILE)) {
    seedRaw = JSON.parse(fs.readFileSync(TEMPLATE_SEED_FILE, 'utf-8'));
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.copyFileSync(TEMPLATE_SEED_FILE, SEED_FILE);
    } catch {}
  }

  const isDefault = userId === DEFAULT_USER_ID;

  const userGoals: Goal[] = seedRaw.goals.map((g: any) => ({
    id: isDefault ? g.id : `${g.id}-${userId}`,
    userId,
    title: g.title,
    description: g.description,
    category: g.category,
    icon: g.icon,
    createdAt: new Date().toISOString()
  }));

  const userTasks: Task[] = seedRaw.tasks.map((t: any) => ({
    id: isDefault ? t.id : `${t.id}-${userId}`,
    userId,
    goalId: isDefault ? t.goalId : `${t.goalId}-${userId}`,
    title: t.title,
    topic: t.topic,
    difficulty: t.difficulty,
    url: t.url,
    duration: t.duration,
    completed: Boolean(t.completed),
    completedAt: t.completed ? new Date().toISOString() : null,
    completedDate: t.completed ? new Date().toISOString().split('T')[0] : null,
    createdAt: new Date().toISOString()
  }));

  return { goals: userGoals, tasks: userTasks };
}

// Database Manager supporting both Supabase (PostgreSQL) and Local JSON file
class Database {
  private pool: pg.Pool | null = null;
  private stateFile: string;
  private state: AppDatabaseState = { users: [], goals: [], tasks: [] };
  private initialized = false;

  constructor(stateFile: string) {
    this.stateFile = stateFile;
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      console.log('Connecting to PostgreSQL / Supabase Database...');
      this.pool = new Pool({
        connectionString: dbUrl,
        ssl: {
          rejectUnauthorized: false
        }
      });
    }
  }

  public isPostgres(): boolean {
    return this.pool !== null;
  }

  public async init(): Promise<void> {
    if (this.initialized) return;

    if (this.pool) {
      await this.initPostgres();
    } else {
      this.initJson();
    }
    this.initialized = true;
  }

  // --- POSTGRES / SUPABASE IMPLEMENTATION ---
  private async initPostgres(): Promise<void> {
    if (!this.pool) return;
    try {
      await this.pool.query(`
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
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_tasks_user_goal ON tasks(user_id, goal_id);
        CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(user_id, completed, completed_date);
      `);

      // Seed default user in Postgres if empty
      const userCheck = await this.pool.query('SELECT COUNT(*) FROM users');
      if (parseInt(userCheck.rows[0].count, 10) === 0) {
        console.log('Postgres users table is empty. Initializing default user and Grind 169 roadmap...');
        const { hash, salt } = hashPassword('password123');
        const defaultUser: User = {
          id: DEFAULT_USER_ID,
          name: 'Yuvanesh',
          email: 'yuvanesh@example.com',
          passwordHash: hash,
          salt,
          createdAt: new Date().toISOString()
        };
        await this.addUser(defaultUser);
        const { goals, tasks } = createUserDataForUser(DEFAULT_USER_ID);
        for (const g of goals) {
          await this.addGoal(g);
        }
        await this.batchInsertTasks(tasks);
        console.log('Postgres successfully seeded with 169 Grind DSA questions and goals.');
      }
    } catch (err) {
      console.error('Error initializing PostgreSQL tables:', err);
      throw err;
    }
  }

  public async batchInsertTasks(tasks: Task[]): Promise<void> {
    if (!this.pool || tasks.length === 0) return;
    const chunkSize = 40;
    for (let i = 0; i < tasks.length; i += chunkSize) {
      const chunk = tasks.slice(i, i + chunkSize);
      const values: any[] = [];
      const rowsSql = chunk.map((t, idx) => {
        const offset = idx * 12;
        values.push(
          t.id,
          t.userId,
          t.goalId,
          t.title,
          t.topic,
          t.difficulty || null,
          t.url || null,
          t.duration || null,
          t.completed,
          t.completedAt,
          t.completedDate,
          t.createdAt
        );
        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9}, $${offset + 10}, $${offset + 11}, $${offset + 12})`;
      }).join(', ');

      const query = `
        INSERT INTO tasks (id, user_id, goal_id, title, topic, difficulty, url, duration, completed, completed_at, completed_date, created_at)
        VALUES ${rowsSql}
        ON CONFLICT (id) DO NOTHING;
      `;
      await this.pool.query(query, values);
    }
  }

  // --- LOCAL JSON FILE IMPLEMENTATION ---
  private initJson(): void {
    try {
      const dir = path.dirname(this.stateFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (!fs.existsSync(SEED_FILE) && fs.existsSync(TEMPLATE_SEED_FILE)) {
        try {
          fs.copyFileSync(TEMPLATE_SEED_FILE, SEED_FILE);
        } catch {}
      }

      if (fs.existsSync(this.stateFile)) {
        const raw = fs.readFileSync(this.stateFile, 'utf-8');
        this.state = JSON.parse(raw);
        if (!this.state.users || this.state.users.length === 0) {
          this.initDefaultUserJson();
        }
      } else {
        this.initDefaultUserJson();
      }
    } catch (err) {
      console.warn('DB initialization error, creating clean state:', err);
      this.initDefaultUserJson();
    }
  }

  private initDefaultUserJson(): void {
    const { hash, salt } = hashPassword('password123');
    const defaultUser: User = {
      id: DEFAULT_USER_ID,
      name: 'Yuvanesh',
      email: 'yuvanesh@example.com',
      passwordHash: hash,
      salt,
      createdAt: new Date().toISOString()
    };

    const { goals, tasks } = createUserDataForUser(DEFAULT_USER_ID);

    this.state = {
      users: [defaultUser],
      goals,
      tasks
    };
    this.persistJson();
  }

  private persistJson(): void {
    try {
      const dir = path.dirname(this.stateFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tempPath = `${this.stateFile}.tmp.${Date.now()}`;
      const jsonContent = JSON.stringify(this.state, null, 2);
      fs.writeFileSync(tempPath, jsonContent, 'utf-8');
      fs.renameSync(tempPath, this.stateFile);

      const backupPath = `${this.stateFile}.bak`;
      fs.writeFileSync(backupPath, jsonContent, 'utf-8');
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  // --- UNIFIED DATA ACCESS METHODS ---
  public async getUserByEmail(email: string): Promise<User | null> {
    await this.init();
    const cleanEmail = email.trim().toLowerCase();
    if (this.pool) {
      const res = await this.pool.query(
        'SELECT id, name, email, password_hash as "passwordHash", salt, created_at as "createdAt" FROM users WHERE LOWER(email) = $1',
        [cleanEmail]
      );
      return res.rows[0] || null;
    }
    return this.state.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  }

  public async getUserById(id: string): Promise<User | null> {
    await this.init();
    if (this.pool) {
      const res = await this.pool.query(
        'SELECT id, name, email, password_hash as "passwordHash", salt, created_at as "createdAt" FROM users WHERE id = $1',
        [id]
      );
      return res.rows[0] || null;
    }
    return this.state.users.find(u => u.id === id) || null;
  }

  public async addUser(user: User): Promise<void> {
    await this.init();
    if (this.pool) {
      await this.pool.query(
        'INSERT INTO users (id, name, email, password_hash, salt, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [user.id, user.name, user.email, user.passwordHash, user.salt, user.createdAt]
      );
      return;
    }
    this.state.users.push(user);
    this.persistJson();
  }

  public async getGoals(userId: string): Promise<Goal[]> {
    await this.init();
    if (this.pool) {
      const res = await this.pool.query(
        'SELECT id, user_id as "userId", title, description, category, icon, created_at as "createdAt" FROM goals WHERE user_id = $1 OR user_id = $2 ORDER BY created_at ASC',
        [userId, DEFAULT_USER_ID]
      );
      return res.rows;
    }
    return this.state.goals.filter(g => g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID));
  }

  public async addGoal(goal: Goal): Promise<Goal> {
    await this.init();
    if (this.pool) {
      await this.pool.query(
        'INSERT INTO goals (id, user_id, title, description, category, icon, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [goal.id, goal.userId, goal.title, goal.description, goal.category, goal.icon, goal.createdAt]
      );
      return goal;
    }
    this.state.goals.push(goal);
    this.persistJson();
    return goal;
  }

  public async updateGoal(userId: string, id: string, updates: Partial<Goal>): Promise<Goal | null> {
    await this.init();
    if (this.pool) {
      const res = await this.pool.query(
        `UPDATE goals 
         SET title = COALESCE($3, title), 
             description = COALESCE($4, description), 
             category = COALESCE($5, category), 
             icon = COALESCE($6, icon)
         WHERE id = $1 AND (user_id = $2 OR user_id = $7)
         RETURNING id, user_id as "userId", title, description, category, icon, created_at as "createdAt"`,
        [id, userId, updates.title || null, updates.description || null, updates.category || null, updates.icon || null, DEFAULT_USER_ID]
      );
      return res.rows[0] || null;
    }

    const idx = this.state.goals.findIndex(g => g.id === id && (g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID)));
    if (idx === -1) return null;
    this.state.goals[idx] = { ...this.state.goals[idx], ...updates, userId };
    this.persistJson();
    return this.state.goals[idx];
  }

  public async deleteGoal(userId: string, id: string): Promise<boolean> {
    await this.init();
    if (this.pool) {
      const res = await this.pool.query('DELETE FROM goals WHERE id = $1 AND (user_id = $2 OR user_id = $3)', [id, userId, DEFAULT_USER_ID]);
      if (res.rowCount && res.rowCount > 0) {
        await this.pool.query('DELETE FROM tasks WHERE goal_id = $1 AND (user_id = $2 OR user_id = $3)', [id, userId, DEFAULT_USER_ID]);
        return true;
      }
      return false;
    }

    const initLen = this.state.goals.length;
    this.state.goals = this.state.goals.filter(g => !(g.id === id && (g.userId === userId || (!g.userId && userId === DEFAULT_USER_ID))));
    if (this.state.goals.length === initLen) return false;
    this.state.tasks = this.state.tasks.filter(t => !(t.goalId === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID))));
    this.persistJson();
    return true;
  }

  public async getTasks(userId: string, filters: { goalId?: string; topic?: string; completed?: boolean; search?: string } = {}): Promise<Task[]> {
    await this.init();
    if (this.pool) {
      let query = `
        SELECT id, user_id as "userId", goal_id as "goalId", title, topic, difficulty, url, duration, completed, completed_at as "completedAt", completed_date as "completedDate", created_at as "createdAt"
        FROM tasks
        WHERE (user_id = $1 OR user_id = $2)
      `;
      const values: any[] = [userId, DEFAULT_USER_ID];

      if (filters.goalId) {
        values.push(filters.goalId);
        query += ` AND goal_id = $${values.length}`;
      }
      if (filters.topic) {
        values.push(filters.topic.toLowerCase());
        query += ` AND LOWER(topic) = $${values.length}`;
      }
      if (filters.completed !== undefined) {
        values.push(filters.completed);
        query += ` AND completed = $${values.length}`;
      }
      if (filters.search) {
        values.push(`%${filters.search.toLowerCase()}%`);
        query += ` AND (LOWER(title) LIKE $${values.length} OR LOWER(topic) LIKE $${values.length})`;
      }

      query += ' ORDER BY created_at ASC';
      const res = await this.pool.query(query, values);
      return res.rows;
    }

    let tasks = this.state.tasks.filter(t => t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID));
    if (filters.goalId) tasks = tasks.filter(t => t.goalId === filters.goalId);
    if (filters.topic) tasks = tasks.filter(t => t.topic.toLowerCase() === filters.topic!.toLowerCase());
    if (filters.completed !== undefined) tasks = tasks.filter(t => t.completed === filters.completed);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || t.topic.toLowerCase().includes(q));
    }
    return tasks;
  }

  public async addTask(task: Task): Promise<Task> {
    await this.init();
    if (this.pool) {
      await this.pool.query(
        `INSERT INTO tasks (id, user_id, goal_id, title, topic, difficulty, url, duration, completed, completed_at, completed_date, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          task.id,
          task.userId,
          task.goalId,
          task.title,
          task.topic,
          task.difficulty || null,
          task.url || null,
          task.duration || null,
          task.completed,
          task.completedAt,
          task.completedDate,
          task.createdAt
        ]
      );
      return task;
    }

    this.state.tasks.unshift(task);
    this.persistJson();
    return task;
  }

  public async toggleTask(userId: string, id: string): Promise<Task | null> {
    await this.init();
    if (this.pool) {
      const checkRes = await this.pool.query(
        'SELECT completed FROM tasks WHERE id = $1 AND (user_id = $2 OR user_id = $3)',
        [id, userId, DEFAULT_USER_ID]
      );
      if (checkRes.rows.length === 0) return null;

      const isCompleted = checkRes.rows[0].completed;
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      const newCompleted = !isCompleted;
      const newCompletedAt = newCompleted ? now.toISOString() : null;
      const newCompletedDate = newCompleted ? todayStr : null;

      const updateRes = await this.pool.query(
        `UPDATE tasks 
         SET completed = $1, completed_at = $2, completed_date = $3
         WHERE id = $4 AND (user_id = $5 OR user_id = $6)
         RETURNING id, user_id as "userId", goal_id as "goalId", title, topic, difficulty, url, duration, completed, completed_at as "completedAt", completed_date as "completedDate", created_at as "createdAt"`,
        [newCompleted, newCompletedAt, newCompletedDate, id, userId, DEFAULT_USER_ID]
      );
      return updateRes.rows[0] || null;
    }

    const idx = this.state.tasks.findIndex(t => t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID)));
    if (idx === -1) return null;
    const task = this.state.tasks[idx];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (!task.completed) {
      task.completed = true;
      task.completedAt = now.toISOString();
      task.completedDate = todayStr;
    } else {
      task.completed = false;
      task.completedAt = null;
      task.completedDate = null;
    }
    this.persistJson();
    return task;
  }

  public async updateTask(userId: string, id: string, updates: Partial<Task>): Promise<Task | null> {
    await this.init();
    if (this.pool) {
      const current = await this.pool.query(
        'SELECT * FROM tasks WHERE id = $1 AND (user_id = $2 OR user_id = $3)',
        [id, userId, DEFAULT_USER_ID]
      );
      if (current.rows.length === 0) return null;

      const row = current.rows[0];
      const now = new Date();
      let completedAt = row.completed_at;
      let completedDate = row.completed_date;

      if (updates.completed !== undefined) {
        if (updates.completed && !row.completed) {
          completedAt = now.toISOString();
          completedDate = now.toISOString().split('T')[0];
        } else if (!updates.completed) {
          completedAt = null;
          completedDate = null;
        }
      }

      const res = await this.pool.query(
        `UPDATE tasks 
         SET title = COALESCE($1, title),
             topic = COALESCE($2, topic),
             difficulty = COALESCE($3, difficulty),
             url = COALESCE($4, url),
             duration = COALESCE($5, duration),
             completed = COALESCE($6, completed),
             completed_at = $7,
             completed_date = $8
         WHERE id = $9 AND (user_id = $10 OR user_id = $11)
         RETURNING id, user_id as "userId", goal_id as "goalId", title, topic, difficulty, url, duration, completed, completed_at as "completedAt", completed_date as "completedDate", created_at as "createdAt"`,
        [
          updates.title || null,
          updates.topic || null,
          updates.difficulty || null,
          updates.url || null,
          updates.duration || null,
          updates.completed !== undefined ? updates.completed : null,
          completedAt,
          completedDate,
          id,
          userId,
          DEFAULT_USER_ID
        ]
      );
      return res.rows[0] || null;
    }

    const idx = this.state.tasks.findIndex(t => t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID)));
    if (idx === -1) return null;
    const task = this.state.tasks[idx];
    const now = new Date();
    let completedAt = task.completedAt;
    let completedDate = task.completedDate;

    if (updates.completed !== undefined) {
      if (updates.completed && !task.completed) {
        completedAt = now.toISOString();
        completedDate = now.toISOString().split('T')[0];
      } else if (!updates.completed) {
        completedAt = null;
        completedDate = null;
      }
    }

    this.state.tasks[idx] = { ...task, ...updates, userId, completedAt, completedDate };
    this.persistJson();
    return this.state.tasks[idx];
  }

  public async deleteTask(userId: string, id: string): Promise<boolean> {
    await this.init();
    if (this.pool) {
      const res = await this.pool.query(
        'DELETE FROM tasks WHERE id = $1 AND (user_id = $2 OR user_id = $3)',
        [id, userId, DEFAULT_USER_ID]
      );
      return res.rowCount !== null && res.rowCount > 0;
    }

    const initLen = this.state.tasks.length;
    this.state.tasks = this.state.tasks.filter(t => !(t.id === id && (t.userId === userId || (!t.userId && userId === DEFAULT_USER_ID))));
    if (this.state.tasks.length === initLen) return false;
    this.persistJson();
    return true;
  }

  public async resetSeed(): Promise<void> {
    if (this.pool) {
      await this.pool.query('DELETE FROM tasks WHERE user_id = $1', [DEFAULT_USER_ID]);
      await this.pool.query('DELETE FROM goals WHERE user_id = $1', [DEFAULT_USER_ID]);
      const { goals, tasks } = createUserDataForUser(DEFAULT_USER_ID);
      for (const g of goals) {
        await this.addGoal(g);
      }
      await this.batchInsertTasks(tasks);
      return;
    }
    this.initDefaultUserJson();
  }

  public async exportData(): Promise<AppDatabaseState> {
    await this.init();
    if (this.pool) {
      const usersRes = await this.pool.query('SELECT id, name, email, password_hash as "passwordHash", salt, created_at as "createdAt" FROM users');
      const goalsRes = await this.pool.query('SELECT id, user_id as "userId", title, description, category, icon, created_at as "createdAt" FROM goals');
      const tasksRes = await this.pool.query('SELECT id, user_id as "userId", goal_id as "goalId", title, topic, difficulty, url, duration, completed, completed_at as "completedAt", completed_date as "completedDate", created_at as "createdAt" FROM tasks');
      return {
        users: usersRes.rows,
        goals: goalsRes.rows,
        tasks: tasksRes.rows
      };
    }
    return this.state;
  }

  public async importData(newState: AppDatabaseState): Promise<void> {
    await this.init();
    if (this.pool) {
      await this.pool.query('TRUNCATE tasks, goals, users CASCADE');
      for (const u of newState.users) {
        await this.addUser(u);
      }
      for (const g of newState.goals) {
        await this.addGoal(g);
      }
      await this.batchInsertTasks(newState.tasks);
      return;
    }
    this.state = newState;
    this.persistJson();
  }
}

export const db = new Database(STATE_FILE);
