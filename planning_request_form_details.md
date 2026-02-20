
This is how users will interact with the agent to get a plan

This will be a form with multiple optional constraints. Let's keep this simple for MVP


Required

- Number of dinners to plan (default: 5 or 7)
- Planning start date (e.g., next Monday)

Optional constraints

- Max cooking time per meal
- Budget for the week
- Use pantry aggressively vs moderately

Optional goal toggles

- Minimize grocery spend
- Maximize pantry usage
- Variety focus

When the form is submitted the backend creates a planning context object consisting of:
- user preferences (these are set up during initial onboarding)
- pantry
- planning constraints


After request is submitted

Step 1: Retrieve Candidate Recipes
Agent queries recipe knowledge sources:
- internal recipe database
- external recipe API
- scraped recipe pages
- embedded recipe index
It filters by:
- dietary restrictions
- time limits
- cuisine preferences
Result → candidate meal pool.

Step 2: Score reciped against pantry

Step 3: Construct Weekly Plan

Now the agent solves a small planning optimization problem:
For example:

Choose N dinners such that:
- total cost ≤ budget
- variety is maintained
- pantry usage maximized
- no excessive repetition
- cooking difficulty balanced
This is the actual “planning intelligence” of the system.

Step 4 - Generate Shopping List

recipes are checked against the pantry to find out which ingredients need to be purchased. Items are grouped by category. **MVP: pantry has no quantities; do not implement any quantity-based logic (e.g. “use 2 cups from pantry”).** Shopping list is based on presence/absence of ingredients only.

Step 5 - Produce structured output 

The agent returns json that looks like:

```
{
  "weekly_plan": [...],
  "shopping_list": [...],
  "recipes": [...],
  "prep_notes": [...]
}
```


What the user sees 

Meal plan for the week
Shopping list
Recipe cards
Plan metrics
	for example:
1. Pantry utilization: 62%
2. Estimated grocery cost: $84
3. Avg cook time: 32 min

After the plan has been generated the user can:
✅ Regenerate entire plan
✅ Swap one meal
✅ Lock favorite meals
✅ Edit pantry and replan
✅ Save plan to history
