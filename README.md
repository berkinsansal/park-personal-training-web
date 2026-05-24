# Park Personal Training — Web

A personal training business website with a content management system backed by Supabase.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

## Project Structure

```
app/                  # Next.js App Router pages and API routes
components/           # Page section components (Hero, About, Services, etc.)
lib/                  # Shared utilities (Supabase client)
supabase/
  config.toml         # Supabase project reference
  migrations/         # Database schema migrations (versioned)
public/               # Static assets (logo, images)
```

## Prerequisites

- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`npm install -g supabase`)
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

Get these values from your Supabase project:
- Dashboard → Settings → API → **Project URL**
- Dashboard → Settings → API → **Publishable** key (safe for client-side)
- Dashboard → Settings → API → **Secret** key (server-side only, never expose)

> `.env.local` is git-ignored and will never be committed.

### 3. Link Supabase project

```bash
npx supabase login
npx supabase link --project-ref <your-project-id>
```

### 4. Apply database migrations

```bash
npx supabase db push
```

This creates all required tables in your Supabase project.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Schema

Migrations live in `supabase/migrations/`. Apply them with `npx supabase db push`.

| Table | Purpose |
|---|---|
| `hero` | Hero section: title, subtitle, CTA button |
| `about` | About section: description, image |
| `services` | Services list: name, description, price |
| `teachers` | Trainers: name, bio, specialty, image |
| `contact` | Contact section: email, phone, address |

All tables have Row Level Security (RLS) enabled with public read access.

### Adding a new migration

```bash
npx supabase migration new <migration_name>
# edit the generated file in supabase/migrations/
npx supabase db push
```

## Deployment

### Vercel

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add the environment variables from `.env.local` in Vercel project settings
4. Deploy

> The `SUPABASE_SECRET_KEY` must also be added to Vercel's environment variables for server-side API routes to work.
