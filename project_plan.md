We are building an app that will use RAG and an AI agent to prepare weekly meal plans. The agent will be able to call tools to grab recipes from online sources and use this data in the plan. This project is meant as a portfolio piece to demonstrate my ability to build agentic ai applications. 

High level user flow
1. Onboarding (preferences & constraints)
2. Pantry input
3. Planning request
4. Agent thinking state
5. Weekly dinner plan results
6. Shopping list
7. Adjust / regenerate
8. Save & reuse preferences

Screen Flow Summary:

Landing / Dashboard
First-time onboarding (one time)
Pantry input
Weekly planning request
Agent planning state
Meal plan results
Shopping list
Adjust / regenerate
Save week

Tech Stack:

React, Typescript, Tailwind, Node, Express, Postgres, Zod, Prisma, JWT


RAG usage

The app will use a vector store for recipe data and the agent will use RAG to treat the vector store as a grounded source. The agent might also call tools to find other recipe data online or from other APIs and update the vector db. 

Here are some actions the agent might take:

Read pantry items

Check dietary rules

Consider budget constraints

Search recipe knowledge (RAG) — query vector store by ingredients, cuisine, time, etc., and use returned recipes as candidates

Evaluate candidate recipes

Balance variety across the week

Avoid repeating ingredients excessively

Optimize grocery overlap

Generate shopping list

Adjust plan if user rejects meals



Auth

The app will use standard authentication. Users will sign up with an email and password which will be their sign in credentials. User's will be issued a JWT on login. 

User auth information will be stored in a users table. 


Schemas

We will use Zod to define schemas and validate requests and responses.


ORM

We will use Prisma 6 for db queries and migrations. 