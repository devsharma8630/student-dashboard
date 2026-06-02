# LearnOS — Futuristic Student Learning Dashboard

A production-grade Next.js 15 student learning dashboard with a premium dark UI, Supabase data fetching, and Framer Motion animations.

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Database | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## ✦ Folder Structure

```
student-dashboard/
├── app/
│   ├── globals.css              # Global styles, CSS variables
│   ├── layout.tsx               # Root layout + metadata
│   ├── page.tsx                 # Redirects to /dashboard
│   ├── dashboard/
│   │   ├── layout.tsx           # Shell with sidebar
│   │   ├── page.tsx             # Main dashboard (Server Component)
│   │   ├── loading.tsx          # Skeleton loading state
│   │   └── error.tsx            # Error boundary UI
│   ├── courses/page.tsx
│   ├── analytics/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── sidebar/
│   │   ├── DashboardShell.tsx   # Client shell (manages collapse state)
│   │   ├── Sidebar.tsx          # Animated desktop sidebar
│   │   └── BottomNav.tsx        # Mobile bottom navigation
│   ├── cards/
│   │   ├── HeroTile.tsx         # Welcome hero with streak badges
│   │   ├── StatsRow.tsx         # Stats overview row
│   │   ├── CourseGrid.tsx       # Staggered grid of course cards
│   │   ├── CourseCard.tsx       # Individual course card
│   │   ├── ActivityTile.tsx     # GitHub-style activity heatmap
│   │   └── StreakTile.tsx       # Circular streak progress
│   └── ui/
│       ├── Skeletons.tsx        # Animated skeleton loaders
│       └── CourseErrorFallback.tsx
├── lib/
│   ├── supabase.ts              # Supabase clients + data fetchers
│   ├── utils.ts                 # cn(), activity data, helpers
│   └── mock-data.ts             # Nav items, stats
├── types/
│   └── index.ts                 # All TypeScript interfaces
├── middleware.ts                 # Supabase session middleware
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── .env.example
└── README.md
```

---

## ✦ Supabase Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) → New Project.

### 2. Create the `courses` table

Run this in your **Supabase SQL Editor**:

```sql
-- Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id         uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text          NOT NULL,
  progress   integer       NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name  text          NOT NULL DEFAULT 'BookOpen',
  created_at timestamptz   NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (dashboard fetches without auth)
CREATE POLICY "Public read access"
  ON public.courses
  FOR SELECT
  USING (true);
```

### 3. Seed with sample data

```sql
INSERT INTO public.courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75,  'Atom'),
  ('Next.js Fundamentals',    60,  'Zap'),
  ('Database Design',         90,  'Database'),
  ('Node.js Mastery',         45,  'Server');
```

### 4. Get your API credentials

Supabase Dashboard → Project Settings → API:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ✦ Local Development

```bash
# 1. Clone the repo
git clone https://github.com/your-org/student-dashboard.git
cd student-dashboard

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run dev server
npm run dev
# → http://localhost:3000
```

---

## ✦ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anonymous key |
| `NEXT_PUBLIC_APP_NAME` | ❌ | App display name (default: LearnOS) |
| `NEXT_PUBLIC_STUDENT_NAME` | ❌ | Student name in hero (default: Alex) |

---

## ✦ Deployment on Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add environment variables in Vercel dashboard:
#    Settings → Environment Variables
#    Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Redeploy
vercel --prod
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new) for automatic deployments.

**Build settings** (auto-detected):
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

---

## ✦ Architecture Decisions

### Server vs Client Components

| Component | Type | Reason |
|-----------|------|--------|
| `app/dashboard/page.tsx` | Server | Supabase fetch at request time |
| `DashboardShell` | Client | Manages sidebar collapse state |
| `Sidebar` | Client | Framer Motion animations, usePathname |
| `CourseCard` | Client | Framer Motion animated counter |
| `ActivityTile` | Client | Motion stagger animations |
| `HeroTile` | Client | Motion animations |

### Data Fetching

- All Supabase queries use `@supabase/ssr` `createServerClient`
- Cookie store is passed through for future auth support
- Revalidation set to `60` seconds via `export const revalidate = 60`
- Parallel fetching with `Promise.all` in the dashboard page

### Animations

All spring animations use consistent physics:
```ts
{ type: "spring", stiffness: 300, damping: 20 }
```

Stagger delay: `index * 0.08s`

---

## ✦ Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check (no emit)
```

---

## ✦ Responsive Breakpoints

| Viewport | Sidebar | Grid |
|----------|---------|------|
| Mobile (<768px) | Hidden (Bottom Nav) | 1 column |
| Tablet (768–1280px) | Full sidebar | 2 columns |
| Desktop (>1280px) | Full/Collapsible | 12-col Bento |