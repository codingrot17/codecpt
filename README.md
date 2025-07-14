## ✅ Project Overview

**CodeCPT Portfolio** — a full-stack portfolio app featuring:

* ✅ A public-facing website with animated UI and blog/tech/project showcase
* ✅ An admin dashboard for content management
* ✅ Backend APIs with Express + Drizzle ORM
* ✅ Authentication using sessions
* ✅ Fully typed data models with Zod + Drizzle
* ✅ Modular folder structure with shared schemas

---

## ⚙️ Tech Stack

| Layer                  | Tech                                  |
| ---------------------- | ------------------------------------- |
| Frontend               | React + Vite + Wouter (SPA routing)   |
| Styling                | TailwindCSS + Framer Motion           |
| State & Data           | React Query + Zod Validation          |
| Backend                | Node.js + Express                     |
| ORM                    | Drizzle ORM with PostgreSQL           |
| Auth                   | express-session                       |
| DB Hosting (suggested) | Neon (via `@neondatabase/serverless`) |
| Deployment             | Vercel (Frontend), Railway (Backend)  |

---

## 🗂 Folder Structure

```
codecpt-main/
│
├── client/          # Vite-powered frontend
│   ├── src/
│   └── .env.local   # VITE_API_URL goes here
│
├── server/          # Express backend
│   ├── index.ts     # Entry point
│   ├── routes.ts    # All API routes
│   ├── db.ts        # DB connections via Drizzle
│
├── shared/          # Shared schemas & validation
│   └── schema.ts    # Zod + Drizzle schemas
│
├── package.json     # Dev + build scripts for both
└── tsconfig.json    # Shared config for monorepo
```

---

## 🚀 Scripts

### Dev Mode (Run Separately):

```bash
npm run dev:client     # Runs frontend (Vite)
npm run dev:server     # Runs backend (TSX)
```

### Production Build:

```bash
npm run build:client   # Vite builds to client/dist
npm run build:server   # esbuild compiles backend to dist/server
npm run build          # builds both

npm start              # Starts backend from dist/server/index.js
```

---

## 🌐 Routes & Pages

### Frontend Routes (via Wouter):

* `/` → Home
* `/terminal` → Interactive terminal UI
* `/admin` → Admin dashboard (auth protected)

### API Routes:

* `GET /api/blog-posts` → Fetch all posts
* `GET /api/blog-posts/:slug` → Get single blog post
* `GET /api/projects`, `GET /api/tech-stacks`, etc.
* `POST /api/admin/login` → Admin login
* `POST /api/tech-stacks` → Add tech stack
* ...and more CRUD APIs via `routes.ts`

---

## 🔐 Authentication

* Uses `express-session` with `connect-pg-simple`
* Sessions stored in PostgreSQL
* Admins are authenticated by session middleware (not JWT)

---

## 🧪 Validation & Types

* All input validation is done using **Zod**
* `shared/schema.ts` contains:

  * DB models (via Drizzle)
  * Insert schemas (via `drizzle-zod`)
  * Zod validation used both client and server side

---

## 🌍 Deployment Instructions

### 1. Deploy Backend to Railway

* Set root as `server/`
* Add `.env`:

```env
PORT=5000
SESSION_SECRET=your_super_secret_key
DATABASE_URL=your_postgres_connection_url
```

### 2. Deploy Frontend to Vercel

* Set root as `client/`
* Add `.env.local`:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

---

## 🧾 Future Improvements (Ideas)

* Replace Wouter with React Router for nested layouts
* Add file uploads for blogs/projects
* Use OAuth (e.g. GitHub) for admin auth
* Add unit/integration tests (Vitest + Supertest)

---

## 📄 LICENSE

MIT

---

### 🧠 Final Word

This is a very well-structured project with modern tools and real-world patterns. The separation of logic, shared types, clean routing, and clear component breakdown all reflect solid full-stack practices.
