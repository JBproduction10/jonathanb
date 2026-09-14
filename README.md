# Jonathan Bangala Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS portfolio, now a full
stack app with a **MongoDB-backed admin dashboard**, **NextAuth**
authentication, and **Cloudinary** image uploads.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **MongoDB** via Mongoose — stores site content, projects, skills,
  strengths, timeline entries, and contact messages
- **NextAuth** (Credentials provider) — protects `/admin/*`
- **Cloudinary** — image uploads from the admin dashboard

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values, see below
npm run seed                 # creates the admin user + seeds initial content
npm run dev
```

Open http://localhost:3000 for the site, http://localhost:3000/admin for
the dashboard.

## Environment variables (`.env.local`)

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (or a local `mongodb://localhost:27017/portfolio`) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` in dev; your deployed URL in prod |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Only used once, by `npm run seed`, to create your admin login |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → Account Details |

See `.env.example` for the full template.

## How the data flows

- `lib/mongodb.ts` — cached Mongoose connection (safe for serverless/hot-reload).
- `lib/models/*.ts` — schemas for `SiteSettings`, `Project`, `SkillGroup`,
  `Strength`, `Timeline`, `Message`, and `Admin`.
- `lib/data.ts` — the functions every public page component calls
  (`getSite`, `getProjects`, etc). They read from MongoDB and **fall back
  to the static files in `data/`** if the database is empty or
  unreachable, so the site still renders before you've configured
  anything.
- `scripts/seed.ts` (`npm run seed`) — one-time, safely re-runnable script
  that copies `data/*.ts` into MongoDB and creates the admin user from
  `ADMIN_EMAIL` / `ADMIN_PASSWORD`. It only writes to collections that are
  still empty, so it won't clobber edits you've made from the dashboard.

## Admin dashboard (`/admin`)

Sign in at `/admin/login` with the credentials from your seed run.

- **Overview** — content counts + unread message count
- **Projects** — create/edit/delete, with Cloudinary image upload
- **Site Content** — hero, about, contact copy, and social links
- **Skills** — grouped skill categories
- **Strengths** — the strengths grid
- **Timeline** — work/education history (section auto-hides while empty)
- **Messages** — contact form submissions, mark read/unread, delete

All `/admin/*` pages and `/api/admin/*` routes are protected by
`middleware.ts` (NextAuth JWT session check) and by a server-side session
check inside each API route as a second layer of defense.

Image uploads (`app/api/admin/upload/route.ts`) accept a file, upload it to
your Cloudinary account under the `portfolio/` folder, and store the
returned URL (and `public_id`, for cleanup on delete) on the project
document.

## Project structure

- `data/` — original static content, now used only as the **fallback**
  and as the **seed source** (`scripts/seed.ts`) for the database.
- `lib/data.ts` — DB-backed content functions (see above).
- `lib/models/` — Mongoose schemas.
- `app/api/contact/route.ts` — contact form endpoint, now saves to the
  `messages` collection (readable from `/admin/messages`).
- `app/api/admin/` — CRUD API routes backing the dashboard.
- `app/admin/` — the dashboard UI itself.
- `components/` — public site sections (unchanged).
- `components/admin/` — dashboard-only UI (sidebar, image uploader).

## Still needed from you

1. **Real project screenshots** — replace the placeholders in
   `public/project-image/`, or just re-upload each project's image from
   the admin dashboard once it's live.
2. **Resume** — add your PDF at `public/resume/resume.pdf` and set
   `resumeReady: true` from the Site Content admin page (or `data/site.ts`
   before your first seed).
3. **MongoDB / Cloudinary accounts** — create a free MongoDB Atlas cluster
   and a Cloudinary account, then fill in `.env.local`.

## Deploying

On Vercel (or similar): set all the environment variables above in the
project settings, then run `npm run seed` once against your production
database (e.g. locally with `MONGODB_URI` pointed at the prod cluster, or
via a one-off script run) to create the admin user and seed initial
content.
