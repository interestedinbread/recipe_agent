# Pantry API — Todo

Backend API for user pantry items. All routes are user-scoped (require auth). MVP: no quantities; add/remove items only. See [pantry_input_details.md](pantry_input_details.md) for data model and normalization.

---

## 1. Pantry service layer

- [ ] Create `src/services/pantryService.ts`.
- [ ] `listByUserId(userId: string)` — return all pantry items for the user (Prisma `findMany` where `userId`).
- [ ] `create(userId: string, data: { displayName: string; canonicalName: string; category: string })` — create one pantry item; return the created item.
- [ ] `delete(userId: string, itemId: string)` — delete one item; ensure `itemId` belongs to `userId` (return null/throw if not found or wrong user).

---

## 2. Validation schemas

- [ ] Create `src/validation/pantry.ts`.
- [ ] Define Zod schema for **create** body: `displayName` (string, non-empty), `canonicalName` (string, non-empty), `category` (string, non-empty). No quantity fields.
- [ ] Define schema for **delete** param: `id` (string, e.g. cuid).

---

## 3. Pantry controller

- [ ] Create `src/controllers/pantryController.ts`.
- [ ] `listPantry` — call `req.user` (from requireAuth), call `pantryService.listByUserId(req.user.id)`, respond with JSON array of items.
- [ ] `addPantryItem` — validate body, call `pantryService.create(req.user.id, body)`, respond with 201 and created item.
- [ ] `deletePantryItem` — read `req.params.id`, call `pantryService.delete(req.user.id, id)`, respond 204 on success or 404 if not found/wrong user.

---

## 4. Pantry routes

- [ ] Create `src/routes/pantryRoutes.ts`.
- [ ] All routes use `requireAuth` (no anonymous access).
- [ ] `GET /pantry` → listPantry.
- [ ] `POST /pantry` → validate(createBodySchema), addPantryItem.
- [ ] `DELETE /pantry/:id` → validate(paramSchema) if desired, deletePantryItem.
- [ ] Mount router in `src/index.ts` (e.g. `app.use('/pantry', pantryRoutes)`).

---

## 5. Test the pantry API

- [ ] Call `GET /pantry` with `Authorization: Bearer <token>`. Confirm 200 and empty array or existing items.
- [ ] Call `POST /pantry` with body `{ displayName, canonicalName, category }`. Confirm 201 and returned item with `userId` matching the token.
- [ ] Call `GET /pantry` again; confirm the new item appears.
- [ ] Call `DELETE /pantry/:id` with the created item’s id. Confirm 204.
- [ ] Call `GET /pantry` again; confirm the item is gone. Call `DELETE /pantry/:id` for another user’s item (or invalid id); confirm 404.

---

## 6. (Optional) Ingredient dictionary and normalization

- [ ] Add a static ingredient dictionary (e.g. JSON or TS map: synonym → `{ canonicalName, category }`). Preprocess for O(1) lookup.
- [ ] In `pantryService.create`, optionally accept only `displayName` from the client; resolve `canonicalName` and `category` from the dictionary; if no match, store as-is or use a fallback category (e.g. "other").
- [ ] Document whether create API accepts full `{ displayName, canonicalName, category }` or only `displayName` for MVP.

---

## Summary

| Step | Description |
|------|-------------|
| 1 | Pantry service: listByUserId, create, delete (user-scoped) |
| 2 | Zod schemas for create body and delete param |
| 3 | Pantry controller: list, add, delete |
| 4 | Routes: GET/POST/DELETE /pantry, all behind requireAuth; mount in app |
| 5 | Test with curl (or similar): list, add, list, delete, list; verify 404 for wrong user |
| 6 | Optional: ingredient dictionary and normalize displayName → canonicalName, category |
