# Rimende — Chore Reminder App

## Project Overview
A household & hygiene chore reminder web app. Helps users remember routine tasks they forget or don't know the frequency of. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend / DB / Auth:** Supabase (PostgreSQL + auth + real-time)

## Core Features
- Chronological list of chores grouped by Overdue / Today / This Week
- Category-based filtering (Kitchen, Bathroom, Bedroom, Personal Hygiene, Living Room, General)
- Pre-seeded default chores with suggested frequencies
- Add custom chores with flexible frequency (daily, weekly, biweekly, monthly, custom)
- Mark chores as done → auto-schedules next occurrence
- Cross-device sync via Supabase auth + real-time subscriptions

## Database Design
- `profiles` — extends Supabase auth.users
- `chores` — chore definitions (user-created or system defaults where `is_default = true`)
- `chore_instances` — individual scheduled occurrences; marking done writes `completed_at` and inserts the next instance

## Key Conventions
- Use **Server Actions** for all mutations (no separate API routes)
- `lib/chores/scheduling.ts` is the single source of truth for next-due calculation — keep it a pure function
- All Supabase server-side access goes through `lib/supabase/server.ts` (cookie-based, `@supabase/ssr`)
- Route groups: `(auth)` for unauthenticated routes, `(app)` for protected routes
- RLS policies enforce that users can only read/write their own rows; `is_default = true` rows are readable by all authenticated users

## Local Development
```bash
npm install
cp .env.local.example .env.local   # add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npx supabase db push                # run migrations
npm run dev
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
