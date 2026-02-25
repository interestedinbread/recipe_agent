# Pantry API Test Suite – To-Do List

Steps to set up a robust test suite for the pantry API (Vitest + Supertest).

---

## 1. Export the app for Supertest

- [ ] Create **`backend/src/app.ts`**: build the Express app (middleware, `authRoutes`, `pantryRoutes`, health route) and **export** the app. Do not call `app.listen()` here.
- [ ] Update **`backend/src/index.ts`**: import the app from `app.ts` and call `app.listen(port, ...)` only in this file.
- [ ] Ensure pantry routes are mounted in `app.ts` (e.g. `app.use('/pantry', pantryRoutes)`).

---

## 2. Vitest config

- [ ] Create **`backend/vitest.config.ts`**: set `environment: 'node'`, `include` (e.g. `tests/**/*.test.ts`), and `setupFiles` pointing to your test setup file.

---

## 3. Test setup

- [ ] Create **`backend/tests/setup.ts`**: load test env (e.g. `dotenv.config({ path: '.env.test' })` or set `DATABASE_URL` for test DB). Optionally set `NODE_ENV=test`.
- [ ] (Optional) Run Prisma migrations or `db push` in setup so the test DB schema is ready.

---

## 4. Auth helper for protected routes

- [ ] Create **`backend/tests/helpers/auth.ts`**: export a helper that returns a valid JWT for a test user (e.g. create user + sign in via auth service, or sign a token with the same secret your app uses). Use this in pantry tests to set the `Authorization` header.

---

## 5. Pantry API integration tests

- [ ] Create **`backend/tests/pantry.api.test.ts`**: use Supertest with the app from `app.ts`. Add tests for:
  - **GET /pantry/list**: with auth → 200 and list; without auth → 401.
  - **POST /pantry/create**: with auth + valid body → 201; invalid body → 400; without auth → 401.
  - **DELETE /pantry/:id**: with auth + valid id → 200; non-existent id → 404; without auth → 401 (and 403 for another user’s item if applicable).

---

## 6. Optional

- [ ] Create **`backend/tests/helpers/db.ts`**: helpers to create test users, create pantry items, or reset DB between tests.
- [ ] Add **`backend/.env.test`**: set `DATABASE_URL` (and `JWT_SECRET` if needed) for the test database.
- [ ] Update **`backend/package.json`** `test` script to run Vitest (e.g. `"test": "vitest"` or `"vitest run"`).

---

## Summary

| Item | Purpose |
|------|--------|
| `src/app.ts` | Export Express app (no `listen`) so tests can use Supertest. |
| `src/index.ts` | Import app and call `app.listen()` only here. |
| `vitest.config.ts` | Vitest config + setup file path. |
| `tests/setup.ts` | Load test env and optionally prepare DB. |
| `tests/helpers/auth.ts` | Return a valid JWT for pantry tests. |
| `tests/pantry.api.test.ts` | Supertest integration tests for pantry endpoints. |
| (optional) `tests/helpers/db.ts` | DB helpers for test data. |
| (optional) `.env.test` | Test `DATABASE_URL` and secrets. |
