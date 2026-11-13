import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppStateData, DailyLog, Goal, Task } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'career_goal_state.json');

const todayStr = new Date().toISOString().split('T')[0];
const sixtyDaysLater = new Date(Date.now() + 86400000 * 60).toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const INITIAL_STATE: AppStateData = {
  goals: [
    {
      id: 'goal-1',
      title: 'Become Cloud & DevOps Job Ready',
      description: 'Master Docker, Kubernetes, CI/CD with GitHub Actions, and complete 2 portfolio architectures.',
      targetMonths: 2,
      startDate: todayStr,
      targetEndDate: sixtyDaysLater,
      status: 'Active',
      category: 'Cloud & DevOps',
      createdAt: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: 'task-1',
      goalId: 'goal-1',
      title: 'Configure GitHub Actions CI/CD pipeline with automated tests',
      description: 'Create multi-stage Docker build and test workflows.',
      completed: true,
      dueDate: todayStr,
      estimatedHours: 2.5,
      actualHours: 2.5,
      priority: 'High',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      goalId: 'goal-1',
      title: 'Study Docker multi-stage builds and Alpine container optimization',
      description: 'Reduce final image footprint and run non-root security checks.',
      completed: true,
      dueDate: todayStr,
      estimatedHours: 1.5,
      actualHours: 1.5,
      priority: 'High',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    },
    {
      id: 'task-3',
      goalId: 'goal-1',
      title: 'Set up Kubernetes Minikube local cluster and deploy backend service',
      description: 'Write Pod, Service, and Ingress YAML declarations.',
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      estimatedHours: 3.0,
      actualHours: 0,
      priority: 'High',
      createdAt: new Date().toISOString(),
      completedAt: null
    },
    {
      id: 'task-4',
      goalId: 'goal-1',
      title: 'Practice 2 Medium LeetCode problems (Hashmap / Sliding Window)',
      description: 'Maintain daily DSA problem solving habit.',
      completed: false,
      dueDate: todayStr,
      estimatedHours: 1.0,
      actualHours: 0,
      priority: 'Medium',
      createdAt: new Date().toISOString(),
      completedAt: null
    }
  ],
  dailyLogs: [
    {
      id: 'log-1',
      date: yesterdayStr,
      goalId: 'goal-1',
      statusSummary: 'Completed initial Dockerfile architecture and setup GitHub repo. Tested local builds.',
      hoursSpent: 3.0,
      energyLevel: 'High',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

class Database {
  private filePath: string;
  private state: AppStateData = { goals: [], tasks: [], dailyLogs: [] };
  private initialized = false;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public init(): void {
    if (this.initialized) return;

    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.state = JSON.parse(raw);
        if (!this.state.goals || !this.state.tasks || !this.state.dailyLogs) {
          this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
          this.persist();
        }
      } else {
        this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
        this.persist();
      }
      this.initialized = true;
    } catch (err) {
      console.warn('Database initialization warning, resetting to clean state:', err);
      this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
      this.initialized = true;
    }
  }

  public getState(): AppStateData {
    this.init();
    return this.state;
  }

  public setState(newState: AppStateData): void {
    this.init();
    this.state = newState;
    this.persist();
  }

  public resetToDefault(): AppStateData {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.persist();
    return this.state;
  }

  private persist(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tempPath = `${this.filePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(this.state, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }
}

export const db = new Database(DB_FILE);
