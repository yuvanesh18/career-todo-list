import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Task } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'tasks.json');

export const INITIAL_CAREER_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Master CI/CD Pipelines with GitHub Actions',
    description: 'Build an automated pipeline that lints, runs tests, creates Docker images, and deploys to registry on push.',
    category: 'Cloud & DevOps',
    priority: 'Urgent',
    status: 'In Progress',
    tags: ['ci-cd', 'github-actions', 'devops', 'docker'],
    subtasks: [
      { id: 'sub-1', title: 'Write unit tests with Vitest', completed: true },
      { id: 'sub-2', title: 'Create multi-stage Dockerfile', completed: true },
      { id: 'sub-3', title: 'Configure GitHub Actions workflow YAML', completed: true },
      { id: 'sub-4', title: 'Publish container image to GHCR', completed: false }
    ],
    estimatedHours: 4,
    actualHours: 2.5,
    pomodoroSessions: 5,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    reflectionNotes: 'Automating tests on every PR prevents breaking changes. GHCR provides free unlimited container hosting for open-source repositories.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-2',
    title: 'Design Distributed Rate Limiter (System Design)',
    description: 'Study Token Bucket, Leaky Bucket, and Sliding Window algorithms with Redis for multi-node rate limiting.',
    category: 'System Design',
    priority: 'High',
    status: 'To Do',
    tags: ['system-design', 'redis', 'architecture', 'scalability'],
    subtasks: [
      { id: 'sub-5', title: 'Compare Token Bucket vs Sliding Window Counter', completed: true },
      { id: 'sub-6', title: 'Draft high-level architecture diagram', completed: false },
      { id: 'sub-7', title: 'Handle race conditions using Redis Lua scripts', completed: false }
    ],
    estimatedHours: 3.5,
    actualHours: 1.0,
    pomodoroSessions: 2,
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    reflectionNotes: 'Token bucket is ideal for bursty traffic; sliding window log is accurate but memory-intensive.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-3',
    title: 'Blind 75: Two Pointers & Sliding Window Patterns',
    description: 'Solve and analyze time/space complexity for 3 classic problems: 3Sum, Container With Most Water, Longest Substring Without Repeating Characters.',
    category: 'DSA & Algorithms',
    priority: 'High',
    status: 'Done',
    tags: ['leetcode', 'dsa', 'two-pointers', 'python', 'javascript'],
    subtasks: [
      { id: 'sub-8', title: 'Solve 3Sum with sorting and two pointers', completed: true },
      { id: 'sub-9', title: 'Solve Container With Most Water in O(n)', completed: true },
      { id: 'sub-10', title: 'Write clean explanation in notes', completed: true }
    ],
    estimatedHours: 3,
    actualHours: 3,
    pomodoroSessions: 6,
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    reflectionNotes: 'Always sort first when applying two pointers on sums to eliminate duplicate triplets easily.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'task-4',
    title: 'Polish Resume & STAR Method Interview Stories',
    description: 'Prepare 5 impactful behavioral stories demonstrating leadership, debugging under pressure, and cross-team collaboration.',
    category: 'Interview Prep',
    priority: 'Medium',
    status: 'In Progress',
    tags: ['resume', 'behavioral', 'star-method', 'career'],
    subtasks: [
      { id: 'sub-11', title: 'Draft Situation, Task, Action, Result for project lead story', completed: true },
      { id: 'sub-12', title: 'Quantify metrics (reduced latency by 40%, improved test coverage to 85%)', completed: true },
      { id: 'sub-13', title: 'Conduct mock behavioral session', completed: false }
    ],
    estimatedHours: 2.5,
    actualHours: 1.5,
    pomodoroSessions: 3,
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    reflectionNotes: 'Focus heavily on the "Action" part of STAR - what specific architectural decisions did I make?',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: 'task-5',
    title: 'Daily Tech Reading: Kafka Partitioning & Rebalancing',
    description: 'Read Apache Kafka documentation on consumer group rebalancing protocols (Eager vs Cooperative Sticky).',
    category: 'Daily Habit',
    priority: 'Low',
    status: 'Done',
    tags: ['kafka', 'distributed-systems', 'reading'],
    subtasks: [
      { id: 'sub-14', title: 'Read 2 articles on cooperative sticky assignor', completed: true },
      { id: 'sub-15', title: 'Write down 3 bullet takeaways', completed: true }
    ],
    estimatedHours: 1,
    actualHours: 0.8,
    pomodoroSessions: 2,
    dueDate: new Date().toISOString().split('T')[0],
    reflectionNotes: 'Cooperative rebalancing avoids the stop-the-world pauses of eager rebalancing.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  }
];

class Database {
  private filePath: string;
  private tasks: Task[] = [];
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
        this.tasks = JSON.parse(raw);
      } else {
        this.tasks = [...INITIAL_CAREER_TASKS];
        this.persist();
      }
      this.initialized = true;
    } catch (err) {
      console.warn('Database initialization warning, falling back to initial data:', err);
      this.tasks = [...INITIAL_CAREER_TASKS];
      this.initialized = true;
    }
  }

  public getTasks(): Task[] {
    this.init();
    return [...this.tasks];
  }

  public setTasks(tasks: Task[]): void {
    this.init();
    this.tasks = tasks;
    this.persist();
  }

  public resetToDefault(): Task[] {
    this.tasks = [...INITIAL_CAREER_TASKS];
    this.persist();
    return [...this.tasks];
  }

  private persist(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tempPath = `${this.filePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(this.tasks, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }
}

export const db = new Database(DB_FILE);
