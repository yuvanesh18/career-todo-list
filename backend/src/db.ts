import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Goal, Task } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const STATE_FILE = path.join(DATA_DIR, 'goals_and_tasks.json');
const SEED_FILE = path.join(DATA_DIR, 'seed_data.json');

export interface AppDatabaseState {
  goals: Goal[];
  tasks: Task[];
}

class Database {
  private stateFile: string;
  private seedFile: string;
  private state: AppDatabaseState = { goals: [], tasks: [] };
  private initialized = false;

  constructor(stateFile: string, seedFile: string) {
    this.stateFile = stateFile;
    this.seedFile = seedFile;
  }

  public init(): void {
    if (this.initialized) return;

    try {
      const dir = path.dirname(this.stateFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.stateFile)) {
        const raw = fs.readFileSync(this.stateFile, 'utf-8');
        this.state = JSON.parse(raw);
        if (!this.state.goals || !this.state.tasks || this.state.tasks.length === 0) {
          this.loadFromSeed();
        }
      } else {
        this.loadFromSeed();
      }
      this.initialized = true;
    } catch (err) {
      console.warn('DB initialization issue, falling back to seed data:', err);
      this.loadFromSeed();
      this.initialized = true;
    }
  }

  private loadFromSeed(): void {
    if (fs.existsSync(this.seedFile)) {
      const raw = fs.readFileSync(this.seedFile, 'utf-8');
      this.state = JSON.parse(raw);
    } else {
      this.state = { goals: [], tasks: [] };
    }
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
    this.loadFromSeed();
    return this.state;
  }

  private persist(): void {
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

export const db = new Database(STATE_FILE, SEED_FILE);
