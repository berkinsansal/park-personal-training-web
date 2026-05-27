@AGENTS.md

## Project Context

This is a Next.js 16 App Router project. The framework version has breaking changes — always read `node_modules/next/dist/docs/` before writing framework-specific code.

## What This Project Is

A Turkish personal training studio marketing site with an admin CMS. Two audiences:
- **Public** (`/`): single-page site, fully server-rendered, reads from Supabase
- **Admin** (`/admin`): protected dashboard for editing all dynamic content

## Architecture Decisions

**All data fetching is server-side.** The homepage and admin page are async Server Components that fetch from Supabase at request time. There is no client-side data fetching and no React Query / SWR. Both pages use `export const dynamic = 'force-dynamic'` to disable static caching on Vercel.

**Server Actions for all mutations.** CRUD in the admin panel uses `'use server'` actions in `app/admin/actions.ts`. No API routes exist.

**Two Supabase clients, never mix them:**
- `createSessionClient()` — SSR client, reads the session cookie, used for auth checks. Use in server actions that need to verify the user.
- `createAdminClient()` — uses the service key, bypasses RLS. Use for all data reads and writes (the tables have public read RLS, and the service key handles admin writes).

**Auth has two layers:**
1. `proxy.ts` at the project root — Next.js 16's middleware convention (renamed from `middleware.ts`). Guards every `/admin/*` route at the edge.
2. `requireAuth()` in `actions.ts` — called at the top of every mutating server action as a belt-and-suspenders check.

**Shared types live in `lib/types.ts`.** Never redefine `SiteInfo`, `Service`, or `Teacher` locally — import from there. The `SiteInfo` type has all 8 fields; components that only display a subset still receive the full type.

## File Locations

| What | Where |
|---|---|
| Shared TS types | `lib/types.ts` |
| Supabase clients | `lib/supabase-server.ts` |
| Auth middleware | `proxy.ts` (root) |
| All server actions | `app/admin/actions.ts` |
| Shared admin input style | `app/admin/components/styles.ts` → `inputCls` |
| DB schema | `supabase/migrations/002_redesign_schema.sql` |
| Seed data | `supabase/seed.sql` |

## Database Tables

- `site_info` — single row, site-wide settings (contact info, stats, IG handle)
- `services` — list of offered services with emoji icon and display order
- `teachers` — list of trainers with initials and IG handle

The tables from migration 001 (`hero`, `about`, `contact`) were dropped in migration 002 and no longer exist.

## Key Conventions

- Admin panel form inputs use `inputCls` from `app/admin/components/styles.ts`
- Public section components receive data as props from the server-rendered page — they are not aware of Supabase
- The `Hero` component has no dynamic data; it is fully static
- Turkish UI strings are hardcoded in components — there is no i18n library

## What Does Not Exist Yet

- Contact form submission handler (the form in `components/Contact.tsx` has no action)
- Image upload for teachers or services
- Public sign-up or multi-user admin
