# Park Personal Training — Web

A Turkish personal training studio website with a Supabase-backed content management system. The public site is a single-page marketing site; the admin dashboard at `/admin` lets the business owner edit all dynamic content without touching code.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL + Auth) |
| Deployment | Vercel |

## Project Structure

```
app/
  page.tsx                    # Public homepage (server component, fetches all data)
  layout.tsx                  # Root layout
  admin/
    page.tsx                  # Admin dashboard (server component)
    login/page.tsx            # Login page
    actions.ts                # Server actions: auth + all CRUD operations
    components/
      SiteInfoForm.tsx        # Edit site-wide info (contact details, stats)
      ServicesPanel.tsx       # Add / edit / delete services
      TeachersPanel.tsx       # Add / edit / delete trainers
      styles.ts               # Shared Tailwind class strings
components/                   # Public page sections
  Navbar.tsx                  # Fixed top nav with mobile drawer
  Hero.tsx                    # Full-screen hero (static)
  About.tsx                   # Stats grid (data from DB)
  Services.tsx                # Services grid (data from DB)
  Teachers.tsx                # Trainer cards (data from DB)
  Contact.tsx                 # Contact info + placeholder form
  Footer.tsx                  # Footer with Instagram link
lib/
  types.ts                    # Shared TypeScript types (SiteInfo, Service, Teacher)
  supabase-server.ts          # Supabase clients: session (SSR) + admin (service key)
proxy.ts                      # Auth guard — redirects unauthenticated /admin/* to /admin/login
supabase/
  config.toml                 # Supabase project reference
  migrations/                 # Versioned SQL migrations
  seed.sql                    # Initial data for site_info, services, teachers
```

## Database Schema

Three tables, all with RLS enabled and a public read policy.

| Table | Purpose |
|---|---|
| `site_info` | Single-row table: contact details, working hours, Instagram handle, stats |
| `services` | Offered services: emoji icon, title, description, display order |
| `teachers` | Trainers: name, Instagram handle, initials, display order |

The admin user is created directly in the Supabase dashboard (Authentication → Users). There is no public sign-up.

## Authentication

- Supabase email/password auth
- `proxy.ts` (Next.js 16's middleware convention) checks the session cookie on every `/admin/*` request and redirects to `/admin/login` if unauthenticated
- All server actions additionally call `requireAuth()` as a second check before touching the database
- The admin dashboard uses the Supabase **service key** (`SUPABASE_SECRET_KEY`) to bypass RLS for reads and writes; public pages use it too since they only read public data

## Prerequisites

- Node.js 18+
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
RESEND_API_KEY=re_your_resend_api_key
CONTACT_FORM_EMAIL=your-email@example.com
```

Get these from your Supabase project → Settings → API:
- **Project URL**
- **Publishable key** — safe for client bundles
- **Secret key** — server-only, never expose to the browser

For the contact form email functionality:
- **RESEND_API_KEY** — Get from [resend.com](https://resend.com) (free tier available)
- **CONTACT_FORM_EMAIL** — Email address where contact form submissions will be sent (defaults to `admin@parkpersonaltraining.com`)

`.env.local` is git-ignored and will never be committed.

### 3. Apply database migrations

Using the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref <your-project-id>
npx supabase db push
```

Or paste the SQL from `supabase/migrations/` directly in the Supabase SQL editor.

### 4. Seed initial data

```bash
npx supabase db push --include-seed
```

Or run `supabase/seed.sql` in the Supabase SQL editor.

### 5. Create the admin user

In the Supabase dashboard → Authentication → Users → **Add user**.  
Use whatever email and password you want — these are the credentials for `/admin/login`.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

## Adding a database migration

```bash
npx supabase migration new <migration_name>
# edit the generated file in supabase/migrations/
npx supabase db push
```

## Contact Form

The contact form at the bottom of the homepage uses [Resend](https://resend.com) to send emails.

**Features:**
- Frontend and backend validation
- Honeypot spam protection
- Loading and success/error states
- Replies go to the sender's email (from the contact field)

## Deployment

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `SUPABASE_SECRET_KEY` — for database access
   - `RESEND_API_KEY` — for sending emails
   - `CONTACT_FORM_EMAIL` — where to receive contact form submissions (optional, defaults to admin email)
4. Deploy — Vercel detects Next.js automatically

The `SUPABASE_SECRET_KEY` must be present in Vercel's environment for server-side data fetching and admin actions to work. The `RESEND_API_KEY` is required for the contact form to send emails.
