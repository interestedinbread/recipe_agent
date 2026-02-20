# Design Considerations

Design choices that are referenced in the project docs but not yet fully specified. Addressing these will unblock implementation and keep behavior consistent.

---

## Crucial (specify before or early in implementation)

### 1. Auth & user identity — **Decided**

- **Decided:** Standard authentication. Users sign up with email and password (sign-in credentials). User auth information is stored in a `users` table. See [project_plan.md](project_plan.md#auth).

### 2. Onboarding: what’s actually collected

- “User preferences” and “dietary restrictions, cuisine preferences” are referenced but never defined.
- **Specify** what onboarding captures, e.g.:
  - Dietary: allergies, intolerances, diet type (vegan, vegetarian, etc.)
  - Cuisine preferences / dislikes
  - Household size (for scaling portions?)
  - Any other fields that feed into the planning context
- Without this, the planning context and agent filters are underspecified.

### 3. Recipe schema (vector store + DB)

- RAG and “internal recipe database” / “embedded recipe index” need a concrete recipe shape.
- **Define** at least:
  - Fields stored (e.g. title, ingredients, instructions, cook_time, cuisine, dietary_tags, source_url)
  - What gets embedded for RAG (e.g. title + ingredients + instructions)
  - What is filterable (time, diet, cuisine)
- That drives indexing, filtering, and what the agent can reliably use.

### 4. When the pantry snapshot is taken — **Decided**

- “The app uses a snapshot of the pantry” is stated but not when.
- **Clarify:**
  - Snapshot is created at time of request; pantry changes during the request are not included.
  - “Edit pantry and replan”: new snapshot + new request?
- One short sentence (e.g. “Snapshot is taken at the moment the user submits the planning request”) resolves this.

### 5. Structured output & failures

- The agent is supposed to return a fixed JSON shape; how that’s enforced isn’t specified.
- **Specify:**
  - How the shape is enforced (e.g. structured output / JSON mode, schema in the prompt)
  - What happens when the response is invalid or partial (retry, show error, fallback)
- Defining “we use X to enforce the schema; on failure we do Y” avoids ad-hoc handling later.

### 6. Agent failure and timeouts

- No mention of timeouts for the agent or tool calls, or what the user sees when something fails.
- **Specify:**
  - Timeouts for the agent or tool calls
  - What the user sees when the agent fails, gets stuck, or a tool (e.g. recipe API) is down
  - Retry behavior (automatic vs “Try again” button)
- Even one sentence (e.g. “On timeout or tool failure we show an error and allow the user to retry”) is a design choice worth documenting.

### 7. Shopping list (MVP: no pantry quantities)

- Shopping list is “recipes minus pantry, by category.” **MVP: pantry has no quantities; leave all quantity-related functionality out.** No pantry quantity fields, no “use X from pantry” logic.
- **For MVP, clarify only:** How the shopping list is presented (e.g. ingredient names only, or names + amounts from recipes). Aggregation across recipes (e.g. “flour, 3 cups”) is optional for MVP.
- Post-MVP: quantity fields, aggregation, and “remaining pantry after plan” can be added.

---

## Worth a brief note (less critical for first version)


### Plan history

- “Save plan to history” / “Save week” could use one line on what is stored (e.g. output JSON + recipe refs) and whether “regenerate” / “swap” overwrite the same saved plan or create a new version.

### Recipe ingestion

- When and how the vector DB is updated (on demand, cron, user-triggered) and any constraints (rate limits, ToS for scraping) could be one sentence so “agent might update the vector db” is concrete.

---

## Summary

| Priority   | Topic                         | Status   | Action                                      |
|-----------|-------------------------------|----------|---------------------------------------------|
| Crucial   | Auth & user identity          | Decided  | See [project_plan.md](project_plan.md#auth) |
| Crucial   | Onboarding fields             | Open     | List all preferences/constraints collected  |
| Crucial   | Recipe schema                 | Open     | Define fields, embeddings, filters         |
| Crucial   | Pantry snapshot timing        | Decided  | See [pantry_input_details.md](pantry_input_details.md) |
| Crucial   | Structured output & failures  | Open     | Define enforcement and failure behavior     |
| Crucial   | Agent failure / timeouts      | Open     | Define timeouts and user-facing behavior    |
| Crucial   | Shopping list (no pantry qty) | Open     | MVP: no quantities; define list presentation only |
| Optional  | Leftovers                     | Open     | Define “handled logically”                  |
| Optional  | Plan history                  | Open     | Define what’s stored and overwrite behavior  |
| Optional  | Recipe ingestion              | Open     | Define when/how vector DB is updated        |
