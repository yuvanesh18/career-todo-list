import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Goal, Task, User } from './types.js';
import { hashPassword } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const STATE_FILE = path.join(DATA_DIR, 'goals_and_tasks.json');
const SEED_FILE = path.join(DATA_DIR, 'seed_data.json');
const TEMPLATE_SEED_FILE = path.join(__dirname, '..', 'seed_template', 'seed_data.json');

export interface AppDatabaseState {
  users: User[];
  goals: Goal[];
  tasks: Task[];
}

export const DEFAULT_USER_ID = 'user-default';

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

class Database {
  private stateFile: string;
  private state: AppDatabaseState = { users: [], goals: [], tasks: [] };
  private initialized = false;

  constructor(stateFile: string) {
    this.stateFile = stateFile;
  }

  public init(): void {
    if (this.initialized) return;

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
          this.initDefaultUser();
        }
      } else {
        this.initDefaultUser();
      }
      this.initialized = true;
    } catch (err) {
      console.warn('DB initialization error, creating clean state:', err);
      this.initDefaultUser();
      this.initialized = true;
    }
  }

  public initDefaultUser(): void {
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
    this.persist();
  }

  public getState(): AppDatabaseState {
    this.init();
    return this.state;
  }

  public setState(newState: AppDatabaseState): void {
    this.init();
    this.state = newState;
    this.persist();
  }

  public resetSeed(): AppDatabaseState {
    this.initDefaultUser();
    return this.state;
  }

  public persist(): void {
    try {
      const dir = path.dirname(this.stateFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tempPath = `${this.stateFile}.tmp.${Date.now()}`;
      const jsonContent = JSON.stringify(this.state, null, 2);
      fs.writeFileSync(tempPath, jsonContent, 'utf-8');
      fs.renameSync(tempPath, this.stateFile);

      // Create backup copy for disaster recovery
      const backupPath = `${this.stateFile}.bak`;
      fs.writeFileSync(backupPath, jsonContent, 'utf-8');
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }
}

export const db = new Database(STATE_FILE);
