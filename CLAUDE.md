@AGENTS.md

## Project Context

This is a Next.js 16 App Router project. The framework version has breaking changes — always read `node_modules/next/dist/docs/` before writing framework-specific code.

## What This Project Is

A Turkish personal training studio marketing site with an admin CMS. Two audiences:
- **Public** (`/`): single-page site, fully server-rendered, reads from Supabase
- **Admin** (`/admin`): protected dashboard for editing all dynamic content

## Architecture Decisions

**All data fetching is server-side.** No client-side data fetching, no React Query / SWR.

**The homepage uses remote caching for data fetching.** `app/(public)/page.tsx` has three layers: `Home` (Suspense wrapper), `HomeShell` (reads locale cookie, dynamic), and `HomeContent({ locale })` (renders the page). Data is fetched via `getHomepageData(locale)`, a function-level cache using `'use cache: remote'`, `cacheLife('max')`, and `cacheTag('homepage-tr')` or `cacheTag('homepage-en')`. Remote caching stores entries in Vercel's shared cache (not in-memory), so they persist across serverless instances and survive cold starts. Each locale has its own cache entry. `cacheComponents: true` is set in `next.config.ts`. The function throws on Supabase errors to prevent rendering with empty data.

**Cache invalidation on mutation.** Every server action in `app/(admin)/admin/actions.ts` calls `invalidateHomepage()` (a helper that calls `updateTag('homepage-tr')` and `updateTag('homepage-en')`) after a successful DB write. Both locale caches are expired simultaneously. `updateTag` is used (not `revalidateTag`) because we're inside Server Actions and want immediate expiry rather than stale-while-revalidate.

**Multi-language (TR/EN).** The site supports Turkish (default) and English. Locale is persisted in a `locale` cookie (1-year expiry) and read via `getLocale()` in `lib/locale.ts`. UI strings live in `lib/i18n/tr.ts` and `lib/i18n/en.ts`; `getDict(locale)` returns the right dict. DB content that is locale-specific (address, working hours, service titles/descriptions) has `_en` variants in the DB — see migration `003_i18n_columns.sql`. The `locale` cookie is set by `setLocaleAction` in `app/actions.ts`, triggered by the `LanguageSwitcher` component in the navbar. Public components receive `dict: Dict` and `locale: Locale` props from the server-rendered page; admin components receive `dict: Dict` for translated labels/buttons.

**Server Actions for all mutations.** CRUD in the admin panel uses `'use server'` actions in `app/(admin)/admin/actions.ts`. No API routes exist.

**Two Supabase clients, never mix them:**
- `createSessionClient()` — SSR client, reads the session cookie, used for auth checks. Use in server actions that need to verify the user.
- `createAdminClient()` — uses the service key, bypasses RLS. Use for all data reads and writes (the tables have public read RLS, and the service key handles admin writes).

**Admin page stays dynamic.** `app/(admin)/admin/page.tsx` has no `'use cache'` directive, so with `cacheComponents: true` it is dynamic by default — the dashboard always shows the latest DB state.

**Route groups separate the two audiences.** `app/(public)/` contains the public marketing site routes with its own root layout (includes `scroll-smooth`, marketing metadata). `app/(admin)/` contains the admin CMS routes with its own root layout (admin metadata, no `scroll-smooth`). Route group folders are omitted from URL paths — `/` and `/admin` are unaffected.

**Auth has two layers:**
1. `proxy.ts` at the project root — Next.js 16's middleware convention (renamed from `middleware.ts`). Guards every `/admin/*` route at the edge.
2. `requireAuth()` in `app/(admin)/admin/actions.ts` — called at the top of every mutating server action as a belt-and-suspenders check.

**Shared types live in `lib/types.ts`.** Never redefine `SiteInfo`, `Service`, or `Trainer` locally — import from there. The `SiteInfo` type has all 8 fields; components that only display a subset still receive the full type.

## File Locations

| What | Where |
|---|---|
| Shared TS types | `lib/types.ts` |
| Supabase clients | `lib/supabase-server.ts` |
| Auth middleware | `proxy.ts` (root) |
| Shared server actions | `app/actions.ts` (`setLocaleAction`) |
| Public-only server actions | `app/(public)/actions.ts` (`sendContactAction`) |
| All admin server actions | `app/(admin)/admin/actions.ts` |
| Shared admin input style | `app/(admin)/admin/_components/styles.ts` → `inputCls` |
| DB schema | `supabase/migrations/002_redesign_schema.sql` |
| Seed data | `supabase/seed.sql` |

## Database Tables

- `site_info` — single row, site-wide settings (contact info, stats, IG handle)
- `services` — list of offered services with emoji icon and display order
- `trainers` — list of trainers with initials and IG handle

The tables from migration 001 (`hero`, `about`, `contact`) were dropped in migration 002 and no longer exist.

## Key Conventions

- Admin panel form inputs use `inputCls` from `app/(admin)/admin/_components/styles.ts`
- Public section components live in `app/(public)/_components/` and receive data as props from the server-rendered page — they are not aware of Supabase
- `app/_components/` holds components shared between route groups (currently just `LocaleUpdater`)
- The `Hero` component has no dynamic data; it is fully static
- Turkish UI strings are hardcoded in components — there is no i18n library

## What Does Not Exist Yet

- Contact form submission handler (the form in `components/Contact.tsx` has no action)
- Image upload for trainers or services
- Public sign-up or multi-user admin

## CLAUDE CODE ALWAYS DO THESE

- Update documentation if necessary
- git COMMIT and PUSH changes you have done (DO NOT commit .claude/settings.local.json)
- If DB schema changed, migrate SupaBase remote side too
- If new column/table added to DB, seed the initial data
- FOR DB RELATED TASKS, DO ALL CLI CALLS BY YOURSELF, DO NOT GIVE ME INSTRUCTIONS IF YOU CAN DO IT BY CLI
