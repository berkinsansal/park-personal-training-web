# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Context

This is a Next.js 16 App Router project using `next-intl` for i18n routing. The framework version has breaking changes — always read `node_modules/next/dist/docs/` before writing framework-specific code.

## What This Project Is

A Turkish personal training studio marketing site with an admin CMS. Two audiences:

- **Public** (`/`, `/en`): multi-page marketing site, fully server-rendered, reads from Supabase
- **Admin** (`/admin`): protected dashboard for editing all dynamic content

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Lint (ESLint) | `npm run lint` |
| Lint fix | `npm run lint:fix` |
| Format check | `npm run lint:prettier` |
| Format fix | `npm run lint:prettier:fix` |
| All lint checks | `npm run lint:all` |
| All lint fix | `npm run lint:all:fix` |

No test framework is configured.

## Architecture Decisions

**All data fetching is server-side.** No client-side data fetching, no React Query / SWR.

**i18n via `next-intl`.** The app uses `next-intl` with `[locale]` dynamic segment routing. Configuration lives in `i18n.config.ts` — locales are `tr` (default) and `en`, with `localePrefix: 'as-needed'` (no `/tr` prefix for Turkish). Pathnames are localized (e.g. `/hizmetler` for Turkish, `/services` for English). Translation strings live in `messages/tr.json` and `messages/en.json`. Use `getTranslations()` server-side and `useTranslations()` client-side from `next-intl`.

**Per-entity remote caching for data fetching.** Data functions in `lib/data.ts` each use `'use cache: remote'`, `cacheLife('max')`, and entity-specific `cacheTag` (e.g. `'siteinfo'`, `'services'`, `'trainers'`, `'gallery'`, `'playlists'`). Remote caching stores entries in Vercel's shared cache. Each function includes retry logic via `fetchWithRetry` (3 attempts with exponential backoff). Functions throw on Supabase errors to prevent rendering with empty data.

**Cache invalidation on mutation.** Server actions in `app/[locale]/(admin)/admin/actions.ts` call `updateTag(tagName)` after successful DB writes. `updateTag` is used (not `revalidateTag`) for immediate expiry. Each entity has its own cache tag — invalidate only the relevant tag(s).

**Multi-page public site.** The homepage (`app/[locale]/(home)/page.tsx`) shows preview sections, each linking to dedicated pages: `/about` (`/hakkimizda`), `/services` (`/hizmetler`), `/trainers` (`/egitmenler`), `/contact` (`/iletisim`), `/music` (`/muzik`). Three route groups under `[locale]`: `(home)` for the landing page, `(public)` for subpages, `(admin)` for the dashboard.

**Server Actions for all mutations.** CRUD in the admin panel uses `'use server'` actions in `app/[locale]/(admin)/admin/actions.ts`. No API routes exist.

**Two Supabase clients, never mix them:**

- `createSessionClient()` — SSR client, reads the session cookie, used for auth checks. Use in server actions that need to verify the user.
- `createAdminClient()` — uses the service key, bypasses RLS. Use for all data reads and writes (the tables have public read RLS, and the service key handles admin writes).

**Admin page stays dynamic.** `app/[locale]/(admin)/admin/page.tsx` has no `'use cache'` directive, so with `cacheComponents: true` it is dynamic by default — the dashboard always shows the latest DB state.

**Auth has two layers:**

1. `proxy.ts` at the project root — Next.js 16's middleware convention (renamed from `middleware.ts`). Integrates `next-intl` middleware and guards every `/admin/*` route at the edge.
2. `requireAuth()` in `app/[locale]/(admin)/admin/actions.ts` — called at the top of every mutating server action as a belt-and-suspenders check.

**Shared types live in `lib/types.ts`.** Never redefine `SiteInfo`, `Service`, `Trainer`, `Playlist`, or `GalleryPhoto` locally — import from there.

## File Locations

| What | Where |
| --- | --- |
| Shared TS types | `lib/types.ts` |
| Supabase clients | `lib/supabase-server.ts` |
| Cached data fetchers | `lib/data.ts` |
| i18n routing config | `i18n.config.ts` |
| Translation strings | `messages/tr.json`, `messages/en.json` |
| Auth middleware | `proxy.ts` (root) |
| All admin server actions | `app/[locale]/(admin)/admin/actions.ts` |
| Shared admin input style | `app/[locale]/(admin)/admin/_components/styles.ts` → `inputCls` |
| DB schema | `supabase/migrations/` (001–013) |
| Seed data | `supabase/seed.sql` |

## Database Tables

- `site_info` — single row, site-wide settings (contact info, stats, IG handle, coordinates, email)
- `services` — list of offered services with emoji icon, TR/EN titles/descriptions, and display order
- `trainers` — list of trainers with photo URL, IG handle, and display order
- `gallery` — gallery photos with image URL, alt text, and display order
- `playlists` — Spotify playlists with spotify_id, title, and display order

## Key Conventions

- Admin panel form inputs use `inputCls` from `app/[locale]/(admin)/admin/_components/styles.ts`
- Public section components live in `app/[locale]/(public)/<section>/_components/` and `app/[locale]/(home)/_components/`; they receive data as props from server-rendered pages — they are not aware of Supabase
- `app/[locale]/_components/` holds layout-level components (Navbar, Footer, AnimateIn, SectionShell)
- `app/_components/` holds root-level components shared across locales (LocaleSwitcher)
- The `Hero` component has no dynamic data; it is fully static
- DB content with TR/EN variants has `_en` suffixed columns (e.g. `title_en`, `description_en`, `address_line1_en`)
- Localized pathnames: use `next-intl`'s `Link` and `usePathname` for navigation, not raw `next/link`
- Gallery images are stored in Supabase Storage (`gallery` bucket)
- Trainer photos are stored in Supabase Storage (`trainer-photos` bucket)

## CLAUDE CODE ALWAYS DO THESE

- Update documentation if necessary
- git COMMIT and PUSH changes you have done (DO NOT commit .claude/settings.local.json)
- If DB schema changed, migrate Supabase remote side too
- If new column/table added to DB, seed the initial data
- FOR DB RELATED TASKS, DO ALL CLI CALLS BY YOURSELF, DO NOT GIVE ME INSTRUCTIONS IF YOU CAN DO IT BY CLI
