# User Authentication Setup — Remaining Steps

A basic to-do list for finishing user auth in this project. You already have: Prisma client, User model, auth validation schemas (sign-up/sign-in body, sign-in response).

---

## 1. Password hashing

- [ ] Install a hashing library (e.g. `bcrypt` or `argon2`) in the backend.
- [ ] Create a small util (or use inline) to hash passwords on sign-up and compare on sign-in.
- [ ] Never store or return the raw password; only store the hash in `User.passwordHash`.

## 2. Choose session strategy

- [ ] Decide: **JWT** (token in response, frontend sends in header) or **cookie-based session** (e.g. `express-session` + store).
- [ ] If JWT: install `jsonwebtoken` (and types), decide payload shape (e.g. `userId`, `email`, `iat`, `exp`), sign on sign-in/sign-up, send in response body.
- [ ] If sessions: install `express-session` and a store (e.g. in-memory for dev, or a DB/Redis store), configure middleware, set session on sign-in/sign-up.

## 3. Sign-up route

- [ ] Add POST route (e.g. `POST /auth/signup`).
- [ ] Validate body with `signUpBodySchema.safeParse(req.body)`; on failure return 400 with validation errors.
- [ ] Check email is not already in use (`prisma.user.findUnique({ where: { email } })`); if taken return 409 or 400.
- [ ] Hash password, then `prisma.user.create` with `email` and `passwordHash`.
- [ ] Create session or JWT, then return response matching `signInResponseSchema` (user + token) or your chosen shape; validate with schema before `res.json(...)` if desired.

## 4. Sign-in route

- [ ] Add POST route (e.g. `POST /auth/signin`).
- [ ] Validate body with `signInBodySchema.safeParse(req.body)`; on failure return 400.
- [ ] Find user by email (`prisma.user.findUnique`); if not found return 401.
- [ ] Compare password with hash; if invalid return 401.
- [ ] Create session or JWT, then return response matching `signInResponseSchema`; validate with schema before sending if desired.

## 5. Auth middleware

- [ ] Create middleware that reads the JWT (from header) or session (from cookie).
- [ ] If JWT: verify and decode, then validate payload with a small Zod schema (optional but recommended); attach user (or userId/email) to `req` (e.g. `req.user`).
- [ ] If session: load user from session and attach to `req`.
- [ ] If missing or invalid: respond with 401 and do not call `next()`.

## 6. Wire auth into the app

- [ ] Mount auth routes (e.g. `app.use('/auth', authRouter)` or define routes in `index.ts`).
- [ ] Apply auth middleware to any route that requires a logged-in user (e.g. pantry, planning).
- [ ] Ensure `express.json()` (or equivalent) runs so request bodies are parsed.

## 7. Optional

- [ ] Add a sign-out route (e.g. clear session or invalidate token; for JWT, frontend discards token).
- [ ] Add JWT payload schema and use it in auth middleware when decoding the token.
- [ ] Add `signUpResponseSchema` if sign-up response shape differs from sign-in.

---

## Summary

| Step | Description |
|------|-------------|
| 1 | Password hashing (bcrypt/argon2) |
| 2 | Choose JWT or cookie sessions and install deps |
| 3 | Sign-up route (validate → hash → create user → return user + token/session) |
| 4 | Sign-in route (validate → find user → compare password → return user + token/session) |
| 5 | Auth middleware (verify token/session, attach user to req, 401 if invalid) |
| 6 | Mount routes and protect routes that need auth |
| 7 | Optional: sign-out, JWT payload schema, signUpResponseSchema |
