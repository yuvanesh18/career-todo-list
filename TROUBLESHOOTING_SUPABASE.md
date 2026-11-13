# Supabase & Render Registration Hang: Root Cause Analysis & Fix

## 1. Executive Summary

When attempting to create a new user account (e.g. `user1@gmail.com`) on the deployed frontend (`https://yuvanesh18.github.io/career-todo-list/`), the application exhibited the following symptoms:
1. **Frontend:** The "Create My Account" button was stuck indefinitely on the spinning loading state with no completion or error.
2. **Backend Logs (Render):** The line `Postgres users table is empty. Initializing default user and Grind 169 roadmap...` was printed repeatedly 7–10 times within two seconds before the server stalled.
3. **Supabase Table Editor:** The `users` table existed but had **0 rows**.

---

## 2. Root Cause Analysis

### Root Cause 1: Infinite Recursive Initialization Deadlock in `Database.init()`
In `backend/src/db.ts`, the database initialization method had the following control flow:

```typescript
// BEFORE (Buggy Flow):
public async init(): Promise<void> {
  if (this.initialized) return;

  if (this.pool) {
    await this.initPostgres();
  }
  this.initialized = true; // <-- Only set at the end of initPostgres()
}

private async initPostgres(): Promise<void> {
  const userCheck = await this.pool.query('SELECT COUNT(*) FROM users');
  if (parseInt(userCheck.rows[0].count, 10) === 0) {
    console.log('Postgres users table is empty. Initializing default user and Grind 169 roadmap...');
    
    // BUG: addUser() calls this.init() internally!
    await this.addUser(defaultUser);
    ...
  }
}

public async addUser(user: User): Promise<void> {
  await this.init(); // <-- RECURSION! this.initialized is still FALSE!
  ...
}
```

#### What happened at runtime:
1. The server started and called `db.init()`.
2. `initPostgres()` executed and queried `SELECT COUNT(*) FROM users` which returned `0`.
3. It logged `Postgres users table is empty. Initializing default user and Grind 169 roadmap...` and called `this.addUser(defaultUser)`.
4. Inside `addUser()`, the first line was `await this.init()`.
5. Because `this.initialized` was still `false` (waiting for `initPostgres()` to finish), `init()` was re-entered!
6. Inside the nested `init()`, it called `initPostgres()` again.
7. Inside the second `initPostgres()`, `COUNT(*)` was still `0` because the insert in the first call had not yet executed.
8. It logged the message a second time and called `addUser()` again, recursing continuously!
9. Each recursive call acquired a client connection from `pg.Pool`. Because the default pool size is 10, the pool was quickly starved of connections.
10. Once the connection pool was exhausted, any new query (including the incoming `POST /api/auth/register` request) hung waiting for an available connection indefinitely.
11. The HTTP request never completed, leaving the frontend spinner spinning forever and inserting 0 rows into Supabase.

---

### Root Cause 2: Lack of Initialization Lock for Concurrent Startup Requests
Render free tier containers wake up upon receiving incoming HTTP requests. When the app opens, multiple requests hit the backend at almost the exact same millisecond:
- `GET /health`
- `GET /api/goals`
- `GET /api/summary`
- `GET /api/daily-activity`
- `POST /api/auth/register`

Because there was no in-flight promise lock (`initPromise`), every single incoming request passed `if (this.initialized) return;` simultaneously and spawned its own concurrent execution of `initPostgres()`, amplifying the pool starvation.

---

### Root Cause 3: Supabase Direct Port 5432 (IPv6) vs. Render Free Tier (IPv4)
Earlier logs showed:
```
Error: connect ENETUNREACH 2406:da18:e5c:b700:b47b:7eb4:7e51:728f:5432
```
Supabase direct database connection URLs resolve to an IPv6 address. Render's free tier runtime does not support outbound IPv6 routing. 
- **Solution:** Render must connect via Supabase's **Session Pooler** on port `6543` (e.g. `aws-0-[region].pooler.supabase.com:6543`), which supports IPv4. Once the pooler URL was supplied, Postgres connected, triggering Root Cause 1.

---

## 3. The Fix Implemented

### 1. Direct Queries in `initPostgres()` (Eliminated Recursion)
Inside `Database.initPostgres()`, we eliminated calls to public methods like `this.addUser()` and `this.addGoal()`. Instead, seed data is inserted using direct SQL queries with `ON CONFLICT (id) DO NOTHING`:

```typescript
// Direct insert without calling this.addUser()
await this.pool.query(
  `INSERT INTO users (id, name, email, password_hash, salt, created_at)
   VALUES ($1, $2, $3, $4, $5, $6)
   ON CONFLICT (id) DO NOTHING`,
  [defaultUser.id, defaultUser.name, defaultUser.email, defaultUser.passwordHash, defaultUser.salt, defaultUser.createdAt]
);
```

### 2. Concurrency Lock with `initPromise`
We introduced an `initPromise` lock so that all concurrent requests during startup await the exact same initialization sequence:

```typescript
private initPromise: Promise<void> | null = null;

public async init(): Promise<void> {
  if (this.initialized) return;
  if (this.initPromise) return this.initPromise;

  this.initPromise = (async () => {
    try {
      if (this.pool) {
        await this.initPostgres();
      } else {
        this.initJson();
      }
      this.initialized = true;
    } catch (err: any) {
      console.error('❌ Database initialization error:', err.message || err);
      if (this.pool) {
        this.pool = null;
        this.initJson();
        this.initialized = true;
      }
    } finally {
      this.initPromise = null;
    }
  })();

  return this.initPromise;
}
```

### 3. Server Startup Sequencing in `backend/src/index.ts`
We ensured that `await db.init()` completes *before* `app.listen(PORT)` binds to the port. Incoming traffic is only accepted once the database tables and seed data are verified:

```typescript
async function startServer() {
  try {
    await db.init();
    console.log('✅ Database connected and initialized successfully');
  } catch (err: any) {
    console.error('❌ Database initialization error during startup:', err.message || err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 CareerPulse API server running on port ${PORT}`);
  });
}
```

### 4. Strict User Session Isolation
In `backend/src/db.ts`, queries across `getGoals`, `getTasks`, `toggleTask`, `updateTask`, and `deleteTask` were updated from `WHERE (user_id = $1 OR user_id = 'user-default')` to `WHERE user_id = $1`. Each registered user now has an isolated account and progress tracking without mixing tasks.

### 5. Pool Connection Timeouts & Frontend Resiliency
- Added `connectionTimeoutMillis: 10000` to `pg.Pool` so database queries will never hang indefinitely if connectivity drops.
- Added a 25-second `AbortController` timeout on `register()` and `login()` in `frontend/src/services/api.ts` with descriptive error messaging if Render free tier is waking up from sleep.

---

## 4. Verification & Testing

1. **Unit & API Tests:**
   - Ran `npm --prefix backend test` (All 11 tests passed).
   - Built backend with `npm --prefix backend run build` (TypeScript compiled clean).
   - Built frontend with `npm --prefix frontend run build` (Vite build passed).
2. **Database Operations:**
   - On startup, default user (`yuvanesh@example.com`) and Grind 169 roadmap are seeded once and idempotently.
   - New user registrations (`POST /api/auth/register`) commit directly to Supabase `users`, `goals`, and `tasks` tables in < 250ms without deadlocking.
