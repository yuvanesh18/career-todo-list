# 🎓 The Complete Hands-On CI/CD Guide (100% Free Resources)

Welcome! This guide is designed to take you from beginner to confident practitioner in **Continuous Integration (CI)** and **Continuous Deployment (CD)** without spending a single dollar.

---

## 📑 Table of Contents

1. [What is CI/CD and Why Does It Matter?](#1-what-is-cicd-and-why-does-it-matter)
2. [The 100% Free Stack We Are Using](#2-the-100-free-stack-we-are-using)
3. [Step 1: Create a GitHub Repository](#step-1-create-a-github-repository)
4. [Step 2: Commit &amp; Push Your Project](#step-2-commit--push-your-project)
5. [Step 3: Enable Free GitHub Pages Deployment](#step-3-enable-free-github-pages-deployment)
6. [Step 4: Deep Dive into Your Workflows](#step-4-deep-dive-into-your-workflows)
7. [Step 5: Practical Hands-On CI/CD Exercises](#step-5-practical-hands-on-cicd-exercises)
   - [Exercise A: Verify Your First Green Build](#exercise-a-verify-your-first-green-build)
   - [Exercise B: Simulate a Bug &amp; Watch CI Catch It](#exercise-b-simulate-a-bug--watch-ci-catch-it)
   - [Exercise C: Practice Pull Request Branch Protection](#exercise-c-practice-pull-request-branch-protection)
   - [Exercise D: Pull Your Container from GHCR with Docker](#exercise-d-pull-your-container-from-ghcr-with-docker)
8. [Step 6: Displaying Status Badges on Your Profile](#step-6-displaying-status-badges-on-your-profile)
9. [Troubleshooting &amp; Pro Tips](#troubleshooting--pro-tips)

---

## 1. What is CI/CD and Why Does It Matter?

- **CI (Continuous Integration)**: Automatically tests, validates, and compiles your code every time you or a teammate pushes commits or opens a pull request. If someone introduces a breaking bug or syntax error, the automated test fails immediately, preventing broken code from ever reaching production.
- **CD (Continuous Delivery / Deployment)**: Automatically packages the approved software (e.g., builds a Docker container or bundles frontend assets) and publishes or deploys it to servers, registries, or hosting environments without manual intervention.

---

## 2. The 100% Free Stack We Are Using

You do **NOT** need an AWS credit card or paid servers to practice production-grade CI/CD:

| Tool                                       | Cost                                                                                   | What It Does In This Project                                                       |
| :----------------------------------------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **GitHub Actions**                   | **Free** (2,000 mins/mo for private repos, **unlimited** for public repos) | Spins up clean virtual Linux machines (`ubuntu-latest`) to run tests and builds. |
| **GitHub Container Registry (GHCR)** | **Free** (Unlimited for public packages)                                         | Stores and hosts your built Docker container images at `ghcr.io`.                |
| **GitHub Pages**                     | **Free**                                                                         | Hosts your live interactive frontend web app with SSL enabled.                     |
| **Vitest & Supertest**               | **Free Open Source**                                                             | Automated unit and REST API testing framework.                                     |

---

## Step 1: Create a GitHub Repository

1. Open your browser and go to [https://github.com/new](https://github.com/new).
2. Choose a repository name, for example: `career-pulse` or `career-todo-list`.
3. Set the repository to **Public** (recommended for portfolio & unlimited free GitHub Actions minutes) or **Private**.
4. **Important**: Leave "Add a README", "Add .gitignore", and "Choose a license" **UNCHECKED** (we already created them locally).
5. Click **Create repository**.
6. GitHub will now show your repository URL, which looks like:
   `https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git`

---

## Step 2: Commit & Push Your Project

Open PowerShell or terminal in your project directory (`c:\Users\Admin\Desktop\To-do-list`):

```powershell
# 1. Check git status
git status

# 2. Stage all files
git add .

# 3. Create your initial commit
git commit -m "feat: initial commit with full-stack career pulse app, docker, and ci/cd"

# 4. Set default branch to main
git branch -M main

# 5. Link your local project to your GitHub repository
# (Replace <YOUR-USERNAME> and <YOUR-REPO-NAME> with your actual GitHub details)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 6. Push to GitHub
git push -u origin main
```

*(Note: If Git asks you to sign in, use your GitHub browser login or a Personal Access Token).*

---

## Step 3: Enable Free GitHub Pages Deployment

To let GitHub host your live frontend website for free:

1. In your GitHub repository, click on the **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** ➔ **Source**, select:
   **`GitHub Actions`** (instead of "Deploy from a branch").
4. That's it! The workflow `.github/workflows/deploy-pages.yml` will now automatically build and publish your app whenever you push to `main`.
5. Once finished, your live app URL will be displayed right there:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## Step 4: Deep Dive into Your Workflows

In your `.github/workflows/` folder, you have 3 specialized automation pipelines:

### 1. `ci.yml` (Continuous Integration)

```yaml
name: CI - Test & Validate
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

- **Backend Job**: Spins up Node 22 on Ubuntu, runs `npm test` (testing all REST API endpoints like `/health`, `/api/tasks`, `/api/analytics`), and tests TypeScript compilation (`npm run build`).
- **Frontend Job**: Spins up Node 22, runs Vitest unit tests, and tests Vite production bundling.
- **Docker Validation Job**: Tests that the multi-stage Dockerfiles build successfully without caching errors.

### 2. `cd-ghcr.yml` (Continuous Delivery to Container Registry)

- Runs on push to `main`.
- Authenticates using GitHub's automatic built-in token:
  ```yaml
  password: ${{ secrets.GITHUB_TOKEN }}
  ```
- Builds and pushes:
  `ghcr.io/<your-username>/career-pulse-backend:latest`
  `ghcr.io/<your-username>/career-pulse-frontend:latest`

### 3. `deploy-pages.yml` (Continuous Deployment of Demo)

- Runs on push to `main`.
- Bundles the frontend and deploys it to GitHub's global CDN at zero cost.

---

## Step 5: Practical Hands-On CI/CD Exercises

Here are 4 exercises to practice real DevOps workflows:

### Exercise A: Verify Your First Green Build

1. Go to your repository on GitHub and click the **Actions** tab at the top.
2. You will see your workflows running:
   - `CI - Test & Validate`
   - `CD - Build & Push Docker to GHCR`
   - `CD - Deploy Demo to GitHub Pages`
3. Click on `CI - Test & Validate` and inspect the steps. You can expand `Run Backend Unit & API Tests` to see the exact test output from GitHub's Linux runner!
4. When all jobs show a green checkmark `✔`, your CI pipeline has passed.

---

### Exercise B: Simulate a Bug & Watch CI Catch It

In engineering teams, CI protects main branches from human error. Let's intentionally trigger a failure to see CI in action!

1. Open `backend/tests/api.test.ts`.
2. Change line 19 from:

   ```typescript
   expect(res.status).toBe(200);
   ```

   to:
   ```typescript
   expect(res.status).toBe(500); // Intentionally incorrect expectation!
   ```
3. Commit and push:

   ```bash
   git add backend/tests/api.test.ts
   git commit -m "test: simulate failing test"
   git push origin main
   ```
4. Now check the **Actions** tab on GitHub:

   - The workflow will turn **Red ❌**!
   - GitHub will send you an email alert.
   - Click into the job to see Vitest pinpointing the exact failure line.
5. Now fix the test back to `toBe(200)`, commit, and push again:

   ```bash
   git add backend/tests/api.test.ts
   git commit -m "fix: restore passing test assertion"
   git push origin main
   ```
6. Watch the pipeline turn **Green ✔** again! You just practiced automated test triage!

---

### Exercise C: Practice Pull Request Branch Protection

This is how modern software engineers collaborate:

1. Create a feature branch locally:
   ```bash
   git checkout -b feature/add-new-metric
   ```
2. Make a small edit in `frontend/src/types.ts` or `README.md`.
3. Commit and push the branch:
   ```bash
   git add .
   git commit -m "feat: add experimental metric"
   git push origin feature/add-new-metric
   ```
4. On GitHub, you will see a banner: **"Compare & pull request"**. Click it and create the PR.
5. Notice how GitHub automatically runs `CI - Test & Validate` on your PR!
6. It displays: *"All checks have passed"* before allowing you to click **Merge Pull Request**.

---

### Exercise D: Pull Your Container from GHCR with Docker

Once the `CD - Build & Push Docker to GHCR` workflow finishes, your Docker images are publicly stored in GitHub Packages!

To pull and run your newly minted container on any machine:

```bash
# Pull your backend image
docker pull ghcr.io/<your-username>/<your-repo-name>/backend:latest

# Run it
docker run -p 5000:5000 ghcr.io/<your-username>/<your-repo-name>/backend:latest
```

Test it in your browser: `http://localhost:5000/health`.
You have just built an automated container release pipeline from scratch!

---

## Step 6: Displaying Status Badges on Your Profile

In your `README.md`, update the badges at the top with your real username and repository name:

```markdown
[![CI - Test & Validate](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/ci.yml/badge.svg)](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/ci.yml)
[![CD - Docker GHCR](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/cd-ghcr.yml/badge.svg)](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/cd-ghcr.yml)
[![CD - GitHub Pages](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>/actions/workflows/deploy-pages.yml)
```

Now, anyone visiting your GitHub profile or repository will see live passing status badges!

---

## Troubleshooting & Pro Tips

### 1. "Permission to ghcr.io denied"

- In your GitHub repo, go to **Settings** ➔ **Actions** ➔ **General**.
- Scroll to **Workflow permissions**.
- Select **"Read and write permissions"** and click **Save**.
  *(Our workflows also explicitly declare `permissions: packages: write`, ensuring automatic authorization).*

### 2. GitHub Pages shows 404

- Verify that **Settings** ➔ **Pages** ➔ **Source** is set to **GitHub Actions**.
- Ensure the `CD - Deploy Demo to GitHub Pages` workflow has run successfully on `main`.

### 3. Running tests locally before pushing

Always run:

```bash
npm test
```

before pushing so you catch any mistakes before the cloud runner does!
