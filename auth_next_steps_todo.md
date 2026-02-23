# Auth — Next Steps Todo

Steps to take now that auth routes are mounted in the main app.

---

## 1. Test the auth endpoints

- [ ] Call `POST /auth/signup` with a valid body (email, password). Confirm response has `{ user, token }` and the controller sends the token.
- [ ] Call `POST /auth/signin` with the same credentials. Confirm response has `{ user, token }`.
- [ ] Fix any issues (wrong status codes, missing token, wrong body shape).

## 2. Add validation middleware on auth routes

- [ ] Create middleware that validates `req.body` with `signUpBodySchema` for sign-up and `signInBodySchema` for sign-in.
- [ ] On validation failure, respond with 400 and the validation errors; do not call the controller.
- [ ] Attach the middleware to the sign-up and sign-in routes so invalid bodies are rejected before the controller runs.

## 3. Add a small protected route

- [ ] Add a route that uses `requireAuth` (e.g. `GET /auth/me`) and returns `req.user`.
- [ ] Call it with the token in the `Authorization: Bearer <token>` header.
- [ ] Confirm the middleware runs and `req.user` is set correctly.

## 4. CORS (when using the frontend)

- [ ] Install and configure CORS on the backend (e.g. `cors` middleware) so the browser allows requests from the frontend origin (e.g. `http://localhost:5173`) to the API (e.g. `http://localhost:3001`).

## 5. Auth UI

- [ ] Build sign-up and sign-in forms in the frontend.
- [ ] Call the auth API from the frontend; store the token (e.g. in memory or localStorage).
- [ ] Send the token on later requests (e.g. in the `Authorization` header).

---

## Summary

| Step | Description |
|------|-------------|
| 1 | Test sign-up and sign-in; confirm response shape and token |
| 2 | Validation middleware on auth routes (Zod) |
| 3 | Protected route (e.g. GET /auth/me) and test with token |
| 4 | CORS for frontend |
| 5 | Auth UI (forms, API calls, token storage) |
