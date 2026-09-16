# 📝 Full-Stack Notes Application

A full-stack Notes application built with **Next.js**, **Fastify**, **Sequelize**, and **MariaDB**.

The project is designed to practice building a complete application where a Next.js frontend communicates with a separate Fastify REST API.

---

# 🚀 Tech Stack

## Frontend

* Next.js
* React
* JavaScript
* HTML/CSS
* Fetch API

## Backend

* Node.js
* Fastify
* Sequelize
* MariaDB
* dotenv

## Development Tools

* Git
* GitHub
* Postman
* VS Code

---

# 🏗️ Application Architecture

The application consists of two separate applications:

```text
notes-app/
│
├── frontend/       → Next.js
│
└── backend/        → Fastify API
```

The overall architecture is:

```text
┌─────────────────────┐
│      Browser        │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│      Next.js        │
│      Frontend       │
└──────────┬──────────┘
           │
           │ fetch()
           ▼
┌─────────────────────┐
│      Fastify        │
│       Routes        │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│     Controller      │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│       Service       │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│     Repository      │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Sequelize Model    │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│       MariaDB       │
└─────────────────────┘
```

---

# 📁 Project Structure

```text
notes-app/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── page.js
│   │   │
│   │   ├── notes/
│   │   │   ├── page.js
│   │   │   │
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   │
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   │
│   │   └── components/
│   │       ├── NoteCard.js
│   │       ├── NoteForm.js
│   │       ├── NoteList.js
│   │       └── SearchBar.js
│   │
│   ├── lib/
│   │   └── api.js
│   │
│   ├── .env.local
│   ├── package.json
│   └── ...
│
│
└── backend/
    │
    ├── src/
    │   │
    │   ├── app.js
    │   │
    │   ├── config/
    │   │   └── database.js
    │   │
    │   ├── controllers/
    │   │   └── notes.controller.js
    │   │
    │   ├── services/
    │   │   └── notes.service.js
    │   │
    │   ├── repositories/
    │   │   ├── base.repository.js
    │   │   └── notes.repository.js
    │   │
    │   ├── models/
    │   │   └── notes.model.js
    │   │
    │   └── routes/
    │       └── notes.routes.js
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── ...
```

---

# 🎯 Project Goals

The main purpose of this project is to learn how to build a full-stack application from frontend to database.

You will practice:

* Creating a REST API
* Building a React/Next.js frontend
* Connecting frontend and backend
* CRUD operations
* Database operations
* Sequelize ORM
* Repository pattern
* Service layer
* Controller layer
* API validation
* Searching
* Filtering
* Form handling
* Loading states
* Error handling

---

# 🗄️ Database

The application uses MariaDB.

## Notes Table

```sql
CREATE TABLE notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(100),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
```

The table contains:

| Column        | Type     | Description       |
| ------------- | -------- | ----------------- |
| `id`          | INT      | Unique note ID    |
| `title`       | VARCHAR  | Note title        |
| `description` | TEXT     | Note content      |
| `tag`         | VARCHAR  | Note category/tag |
| `created_at`  | DATETIME | Creation time     |
| `updated_at`  | DATETIME | Last update time  |

---

# 🔧 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Initialize the project:

```bash
npm init -y
```

Install dependencies:

```bash
npm install fastify sequelize mariadb dotenv
```

---

# 🔐 Backend Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DB_NAME=notes_app
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

PORT=3000
```

Create `.env.example`:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

PORT=3000
```

Do not commit `.env`.

Add it to `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🔌 Database Configuration

The Sequelize connection is responsible for connecting the Fastify application to MariaDB.

```text
Fastify
   ↓
Sequelize
   ↓
MariaDB
```

The application should authenticate the database when starting:

```js
await sequelize.authenticate();
```

---

# 📦 Backend Layers

The backend follows a layered architecture.

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
Database
```

## Route

Defines the HTTP endpoint.

Example:

```text
POST /notes
```

## Controller

Handles:

* Request
* Response
* HTTP status codes

## Service

Handles:

* Business logic
* Decisions
* Processing data

## Repository

Handles:

* Database queries
* CRUD operations

## Model

Defines the database structure using Sequelize.

---

# 🌐 API Endpoints

| Method   | Endpoint     | Description  |
| -------- | ------------ | ------------ |
| `POST`   | `/notes`     | Create note  |
| `GET`    | `/notes`     | Get notes    |
| `GET`    | `/notes/:id` | Get one note |
| `PUT`    | `/notes/:id` | Update note  |
| `DELETE` | `/notes/:id` | Delete note  |

---

# ➕ Create Note

### Request

```http
POST /notes
Content-Type: application/json
```

### Body

```json
{
  "title": "Learn Next.js",
  "description": "Build a full-stack application",
  "tag": "learning"
}
```

### Response

```json
{
  "data": {
    "id": 1,
    "title": "Learn Next.js",
    "description": "Build a full-stack application",
    "tag": "learning"
  }
}
```

---

# 📋 Get Notes

```http
GET /notes
```

Example response:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Learn Next.js",
      "description": "Build a full-stack application",
      "tag": "learning"
    },
    {
      "id": 2,
      "title": "Learn Fastify",
      "description": "Build REST APIs",
      "tag": "backend"
    }
  ]
}
```

---

# 🔍 Search Notes

Search notes using the `search` query parameter:

```http
GET /notes?search=fastify
```

The search can be performed against:

```text
title
description
```

The `search` parameter itself is **not a database column**.

Conceptually:

```sql
WHERE
    title LIKE '%fastify%'
    OR description LIKE '%fastify%'
```

---

# 🏷️ Filter by Tag

```http
GET /notes?tag=backend
```

This searches the actual `tag` column.

Conceptually:

```sql
WHERE tag = 'backend'
```

---

# 🔍 Search + Tag

Both filters can be used together:

```http
GET /notes?tag=backend&search=fastify
```

Conceptually:

```sql
WHERE
    tag = 'backend'
    AND (
        title LIKE '%fastify%'
        OR description LIKE '%fastify%'
    )
```

---

# 🔎 Get Note by ID

```http
GET /notes/1
```

Response:

```json
{
  "data": {
    "id": 1,
    "title": "Learn Next.js",
    "description": "Build a full-stack application",
    "tag": "learning"
  }
}
```

If the note doesn't exist:

```http
404 Not Found
```

---

# ✏️ Update Note

```http
PUT /notes/1
Content-Type: application/json
```

Body:

```json
{
  "title": "Learn Next.js and Fastify",
  "description": "Build a full-stack Notes application",
  "tag": "fullstack"
}
```

Only the fields supplied need to be changed.

---

# 🗑️ Delete Note

```http
DELETE /notes/1
```

Response:

```json
{
  "message": "Note deleted successfully"
}
```

---

# 🖥️ Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Create the Next.js application:

```bash
npx create-next-app@latest frontend
```

During setup, recommended choices:

```text
TypeScript?          No
ESLint?              Yes
Tailwind CSS?        Yes
src/ directory?      No
App Router?          Yes
Turbopack?           Yes
Import alias?        Yes
```

---

# 🌎 Frontend Environment Variables

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The frontend can then access the Fastify API through:

```js
process.env.NEXT_PUBLIC_API_URL
```

---

# 🧩 Frontend Pages

The application will contain:

```text
/               
    Home

/notes
    List all notes

/notes/new
    Create note

/notes/:id
    View/Edit note
```

With Next.js App Router:

```text
app/
├── page.js
│
└── notes/
    ├── page.js
    │
    ├── new/
    │   └── page.js
    │
    └── [id]/
        └── page.js
```

---

# 🧱 Frontend Components

Create reusable components:

```text
components/
├── NoteCard.js
├── NoteForm.js
├── NoteList.js
└── SearchBar.js
```

### NoteCard

Responsible for displaying one note.

```text
┌───────────────────────────────┐
│ Learn Fastify                 │
│                               │
│ Build REST APIs               │
│                               │
│ #backend                      │
│                               │
│ Edit        Delete            │
└───────────────────────────────┘
```

### NoteList

Responsible for displaying multiple notes.

```text
NoteList
   │
   ├── NoteCard
   ├── NoteCard
   └── NoteCard
```

### NoteForm

Used for both:

```text
Create Note
```

and:

```text
Edit Note
```

### SearchBar

Responsible for:

```text
Search notes...
```

---

# 🔗 Frontend API Layer

Create:

```text
frontend/lib/api.js
```

Keep API calls in one place rather than putting `fetch()` calls throughout components.

Example:

```js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNotes() {
  const response = await fetch(`${API_URL}/notes`);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}
```

Other API functions can be added:

```js
getNote(id)
createNote(data)
updateNote(id, data)
deleteNote(id)
```

This gives the frontend a clean API layer:

```text
Components
     ↓
   api.js
     ↓
Fastify API
```

---

# 🔄 Full CRUD Flow

## Create

```text
User
 ↓
NoteForm
 ↓
api.js
 ↓
POST /notes
 ↓
Fastify
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Sequelize
 ↓
MariaDB
```

---

## Read

```text
User opens /notes
       ↓
Next.js
       ↓
api.js
       ↓
GET /notes
       ↓
Fastify
       ↓
Repository
       ↓
MariaDB
       ↓
JSON response
       ↓
NoteList
       ↓
NoteCard
```

---

## Update

```text
User edits note
       ↓
NoteForm
       ↓
api.js
       ↓
PUT /notes/:id
       ↓
Fastify
       ↓
Service
       ↓
Repository
       ↓
MariaDB
```

---

## Delete

```text
User clicks Delete
       ↓
api.js
       ↓
DELETE /notes/:id
       ↓
Fastify
       ↓
Repository
       ↓
MariaDB
       ↓
Success
       ↓
Update UI
```

---

# 🧪 Testing

Before connecting the frontend, test the backend using Postman.

Test:

```text
POST   /notes
GET    /notes
GET    /notes/:id
PUT    /notes/:id
DELETE /notes/:id
```

Then test:

```text
GET /notes?search=fastify
GET /notes?tag=backend
GET /notes?tag=backend&search=fastify
```

Only after the API works correctly should you connect the Next.js frontend.

---

# ⏳ Loading States

The frontend should show a loading state while waiting for the API.

Example:

```text
Loading notes...
```

Instead of displaying an empty page while the request is running.

---

# ❌ Error Handling

The frontend should handle API errors.

Example:

```text
Failed to load notes.

[Try Again]
```

The backend should return appropriate HTTP status codes:

| Status | Meaning            |
| ------ | ------------------ |
| `200`  | Successful request |
| `201`  | Resource created   |
| `400`  | Invalid request    |
| `404`  | Resource not found |
| `500`  | Server error       |

---

# 📭 Empty State

If there are no notes:

```text
┌──────────────────────────────┐
│                              │
│       No notes found         │
│                              │
│    Create your first note    │
│                              │
│      [+ Create Note]         │
│                              │
└──────────────────────────────┘
```

---

# 📝 Note Form

The form should contain:

```text
Title
Description
Tag
```

Example:

```text
┌────────────────────────────────┐
│ Create Note                    │
│                                │
│ Title                          │
│ ┌────────────────────────────┐ │
│ │ Learn Next.js              │ │
│ └────────────────────────────┘ │
│                                │
│ Description                    │
│ ┌────────────────────────────┐ │
│ │ Build a full-stack app     │ │
│ └────────────────────────────┘ │
│                                │
│ Tag                            │
│ ┌────────────────────────────┐ │
│ │ learning                   │ │
│ └────────────────────────────┘ │
│                                │
│          [Create Note]         │
└────────────────────────────────┘
```

The same form can be reused for editing.

---

# 🔐 CORS

Because the frontend and backend run on different ports during development:

```text
Next.js  → http://localhost:3001
Fastify  → http://localhost:3000
```

the backend needs to allow requests from the frontend.

Install:

```bash
npm install @fastify/cors
```

Register it in Fastify:

```js
await fastify.register(cors, {
  origin: "http://localhost:3001",
});
```

Adjust the frontend port to whatever Next.js is actually using.

---

# ▶️ Running the Application

You need to run **both applications**.

## Start Backend

```bash
cd backend
npm run dev
```

Example:

```text
Fastify API:
http://localhost:3000
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Example:

```text
Next.js:
http://localhost:3001
```

Your browser communicates with:

```text
Next.js
   ↓
Fastify
   ↓
MariaDB
```

---

# 📌 Development Milestones

## Milestone 1 — Database

* [x] Create MariaDB database
* [x] Create notes table
* [x] Configure Sequelize
* [x] Create Notes model

---

## Milestone 2 — Backend

* [x] Create Fastify application
* [x] Create routes
* [x] Create controllers
* [x] Create services
* [x] Create repositories
* [x] Implement CRUD
* [x] Implement search
* [x] Implement tag filtering
* [x] Add request validation

---

## Milestone 3 — Next.js

* [ ] Create Next.js application
* [ ] Learn App Router
* [ ] Create pages
* [ ] Create components
* [ ] Create note list
* [ ] Create note card
* [ ] Create note form
* [ ] Create search bar

---

## Milestone 4 — Connect Frontend + Backend

* [ ] Configure API URL
* [ ] Create `api.js`
* [ ] Fetch notes
* [ ] Create notes from UI
* [ ] Update notes from UI
* [ ] Delete notes from UI
* [ ] Search notes
* [ ] Filter by tag

---

## Milestone 5 — UX

* [ ] Loading state
* [ ] Error state
* [ ] Empty state
* [ ] Form validation
* [ ] Delete confirmation
* [ ] Success messages
* [ ] Responsive UI

---

# 🎯 Final Feature Set

At the end of this version, the application should support:

```text
                NOTES APP
                    │
        ┌───────────┴───────────┐
        │                       │
      Notes                   Search
        │                       │
   ┌────┼────┐                  │
   │    │    │                  │
 Create Read Update Delete    Filter
                              │
                              Tag
```

### Features

* ✅ Create notes
* ✅ View notes
* ✅ View individual note
* ✅ Update notes
* ✅ Delete notes
* ✅ Search notes
* ✅ Filter by tag
* ✅ Combined search + tag filtering
* ✅ Form validation
* ✅ Loading states
* ✅ Error handling
* ✅ Empty states
* ✅ Responsive frontend

---

# 🧠 What You Will Learn

After completing this project, you should understand:

### Frontend

```text
Next.js
├── App Router
├── Pages
├── Components
├── Props
├── State
├── Forms
├── Fetching APIs
└── Loading/Error UI
```

### Backend

```text
Fastify
├── Routes
├── Controllers
├── Services
├── Repositories
├── Validation
└── REST API
```

### Database

```text
Sequelize
    ↓
MariaDB
```

You'll also understand how all three layers communicate:

```text
Next.js
   ↕
HTTP / JSON
   ↕
Fastify
   ↕
Sequelize
   ↕
MariaDB
```

---

# 🚧 Scope of This Version

This version intentionally stops before the later advanced phases.

It does **not** include:

* Authentication
* Users
* User-specific notes
* Many-to-many tags
* Advanced tag relationships
* Pagination
* Production deployment
* Advanced caching
* Transactions
* Automated testing

Those can be added as a separate next stage after the core full-stack application is working.

---

# 🏁 Final Goal

The finished application should allow a user to:

```text
1. Open the Next.js application
              ↓
2. See their notes
              ↓
3. Search/filter notes
              ↓
4. Create a note
              ↓
5. Edit a note
              ↓
6. Delete a note
              ↓
7. All changes persist in MariaDB
```

The most important thing is understanding the complete request flow:

```text
User
 ↓
Next.js UI
 ↓
fetch()
 ↓
Fastify Route
 ↓
Controller
 ↓
Service
 ↓
Sequelize
 ↓
MariaDB
```

That is the core of this full-stack project.
