# 🚀 CareerPulse — Career Improvement & Daily Progress Tracker

[![CI - Test & Validate](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
[![CD - Docker GHCR](https://github.com/OWNER/REPO/actions/workflows/cd-ghcr.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/cd-ghcr.yml)
[![CD - GitHub Pages](https://github.com/OWNER/REPO/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/deploy-pages.yml)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An advanced, production-ready Full-Stack Daily Progress and Career Milestone Tracking system for engineers. Built with React 18, TypeScript, Tailwind CSS, Node.js Express, Docker, and an automated GitHub Actions CI/CD pipeline using **100% free resources**.

---

## 🌟 Key Features

### 1. 🎯 Career-Centric Goal Management
- **Pillar Categorization**: System Design, DSA & Algorithms, Cloud & DevOps, Full Stack Projects, Interview Prep, Certifications, Soft Skills & Leadership, and Daily Habits.
- **Priority Matrix**: Urgent, High, Medium, and Low triage indicators.
- **Milestones & Checklists**: Interactive subtasks with dynamic progress bars.
- **Skill Tagging**: Tag goals with tech skills (`#docker`, `#kubernetes`, `#system-design`, `#redis`, `#python`) for radar tracking.
- **Interview Reflection Notes**: Dedicated learning journal to jot down technical interview talking points, hurdles overcome, and key architectural takeaways.

### 2. ⚡ Multi-View Productivity System
- **Interactive Kanban Board**: Visual 5-stage pipeline (`Backlog` ➔ `To Do` ➔ `In Progress` ➔ `In Review / Testing` ➔ `Completed`) with celebratory confetti animations.
- **Power Search & Filter Table**: Filter by pillar, priority, status, or keyword search with sorting by due date, priority, or creation time.
- **Pomodoro Focus Timer**: Built-in 25m work / 5m break timer with chime sound synthesis that automatically calculates and logs focused study hours to your selected goal.
- **1-Click Daily Standup Generator**: Automatically compiles your day's achievements, active sprints, and learnings into a Markdown summary ready to copy for Discord, Slack, LinkedIn, or your journal.

### 3. 📊 Career Velocity & Growth Analytics
- **Daily Learning Streak**: Real-time flame counter calculating consecutive active days.
- **Total Hours Invested**: Compares estimated effort vs. actual focused study time.
- **7-Day Velocity Chart**: Visual daily completion chart.
- **Skill Cloud**: Visual distribution of your top technical competencies.

### 4. 🔒 Reliability & Offline Sync
- **Backend Mode**: REST API powered by Node.js + Express with atomic JSON/SQLite persistence.
- **Offline / Static Mode**: Automatic fallback to browser `localStorage` when backend is offline or when deployed statically on GitHub Pages.
- **Export & Import**: Instant 1-click JSON backup and restore.

---

## 🏗️ Architecture & Tech Stack

```mermaid
flowchart LR
    subgraph Browser ["Frontend (Port 3000)"]
        UI["React 18 + Vite + TypeScript\nTailwind CSS + Lucide Icons"]
        Store["LocalStorage Fallback Cache"]
    end

    subgraph Backend ["Backend API (Port 5000)"]
        Express["Node.js Express REST API\nZod Validation"]
        DB[("Persistent Storage\nJSON / SQLite")]
    end

    subgraph CICD ["GitHub Actions (100% Free)"]
        CI["CI: Vitest + TypeScript + Docker Lint"]
        GHCR["CD: Docker Build & Push to GHCR"]
        Pages["CD: Deploy Web App to GitHub Pages"]
    end

    UI -->|HTTP / REST| Express
    Express --> DB
    UI -.->|Offline Mode| Store
    Browser -.->|CI/CD Pipeline| CICD
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Git](https://git-scm.com/)
- (Optional) [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Option 1: Run with NPM (No Docker needed)

1. **Install dependencies**:
   ```bash
   # In backend
   cd backend
   npm install

   # In frontend
   cd ../frontend
   npm install
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5000
   ```

3. **Start Frontend** (in a second terminal):
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:3000
   ```

4. **Run Automated Tests**:
   ```bash
   # Test Backend
   cd backend && npm test

   # Test Frontend
   cd ../frontend && npm test
   ```

---

## 🐳 Running with Docker

Run the entire full-stack application with a single command:

```bash
docker compose up --build -d
```

- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api/tasks](http://localhost:5000/api/tasks)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

To view logs or stop:
```bash
docker compose logs -f
docker compose down
```

---

## 🔄 Free CI/CD Pipeline (GitHub Actions)

This project includes a continuous integration and delivery pipeline using **free tier resources**:

| Workflow | Trigger | Free Resource | What It Does |
| :--- | :--- | :--- | :--- |
| **`ci.yml`** | Push / Pull Request | GitHub Hosted Ubuntu Runners | Runs Vitest unit & integration tests, TypeScript compile check, and Docker build test. |
| **`cd-ghcr.yml`** | Push to `main` | GitHub Container Registry (GHCR) | Automatically builds multi-stage Docker images and pushes to `ghcr.io` under your account. |
| **`deploy-pages.yml`** | Push to `main` | GitHub Pages | Automatically bundles and deploys the live web app for free. |

👉 **Read the step-by-step CI/CD tutorial: [CICD_GUIDE.md](file:///c:/Users/Admin/Desktop/To-do-list/CICD_GUIDE.md)**

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check endpoint for Docker & orchestrators |
| `GET` | `/api/tasks` | Get all tasks (supports `?category=`, `?priority=`, `?status=`, `?search=`) |
| `GET` | `/api/tasks/:id` | Get single task details |
| `POST` | `/api/tasks` | Create a new career goal |
| `PUT` | `/api/tasks/:id` | Update status, subtasks, notes, or hours |
| `DELETE` | `/api/tasks/:id` | Remove a task |
| `POST` | `/api/tasks/:id/pomodoro` | Log a 25m Pomodoro session to task |
| `GET` | `/api/analytics` | Get streak, completion %, and category breakdowns |
| `POST` | `/api/seed` | Reset database to initial sample career roadmap |
| `GET` | `/api/export` | Export tasks backup JSON |
| `POST` | `/api/import` | Import tasks from JSON |

---

## 📄 License
MIT © 2026. Built for engineers advancing their careers.
