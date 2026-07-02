# Anika Bhutani — Portfolio (Next.js)

Rebuilt from the original single-file HTML site into a Next.js 14 App Router
project with the same design system (navy/blue palette, DM Serif Display +
DM Sans), plus the live/interactive features from the PRD.

## What's here

- **Interactive terminal** (`src/components/Terminal.tsx`) — opened via the
  floating terminal-icon button (bottom-right, always visible) or the
  `guest@portfolio:~$` button in the hero. Commands:
  - `help`, `cat resume.md`, `projects`, `clear`, `sudo hack` (matrix-rain
    easter egg)
  - `cd about|experience|projects|skills|education|contact`, `cd ~` / `cd home`,
    `ls`, `pwd` — navigate the site like a filesystem
  - `resume` — downloads the real PDF from `public/assets/resume.pdf`
  - `anika` — brings up an AI agent that answers as Anika in first person,
    grounded in her real resume/project/coursework data and aware of which
    "directory" (site section) you're currently in. Type `exit` to leave.
- **Interactive tech-stack filter** (`src/components/TechStackFilter.tsx`) — clicking
  a skill dims every timeline entry and project card that didn't use it.
- **Live GitHub stats** (`/api/github/stats`) — server-side fetch, cached 1 hour,
  falls back to realistic mock data if `GITHUB_TOKEN` isn't set.
- **"What I'm reading" widget** (`/api/reading`) — reads from Supabase, falls back
  to a static list if Supabase isn't configured or the query is slow/fails.
- **Secure contact form** (`/api/contact`) — Zod validation, honeypot field,
  in-memory rate limiting (3 requests/minute/IP), sends via Resend, and
  best-effort logs the submission to Supabase.

## 1. Install

```bash
npm install
cp .env.example .env.local
```

## 2. Set up Supabase (reading list + contact log)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard: **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates `reading_list` (public
   read-only) and `contact_submissions` (server-only) tables, with two sample
   books seeded so the widget isn't empty on first load.
3. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret —
     server-only, never exposed to the browser, never committed).
4. To update your reading list later, edit rows in the `reading_list` table
   directly from the Supabase table editor — no redeploy needed, the API
   route re-fetches (cached for 1 hour).

## 3. Create a GitHub token (for live stats)

1. Go to **github.com → Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token**.
2. Give it a name like `portfolio-readonly`, set an expiration, and under
   **Repository access** choose "Public Repositories (read-only)" — you don't
   need to grant write or private-repo access for this.
3. Copy the generated token (starts with `github_pat_...`) into `GITHUB_TOKEN`
   in `.env.local`. Set `GITHUB_USERNAME` to your GitHub handle.
4. Until you add a token, the stats panel shows clearly-labeled mock data
   instead of breaking — you can ship without this step and add it later.

## 4. Set up the terminal AI agent (the `anika` command) — free, no card

1. Go to [aistudio.google.com](https://aistudio.google.com), sign in, and click
   **Get API Key → Create API key**. No credit card required, and it's free
   indefinitely as long as you don't enable billing on the project.
2. Copy it into `GEMINI_API_KEY` in `.env.local`.
3. That's it — the `/api/terminal-agent` route grounds every reply in your
   real resume/project/coursework data (`src/lib/agentContext.ts`), and knows
   which section of the site ("directory") the visitor has `cd`-ed into, so
   answers stay contextual (e.g. asking about OOP while `cd`-ed into
   `education` surfaces the CS 61B connection even though "OOP" isn't
   written anywhere on the site).
4. Without a key, the `anika` command still works — it just replies with a
   note that the agent isn't configured yet, instead of erroring.
5. Free-tier notes: Gemini's free tier is generous (roughly 1,500
   requests/day on Flash) and needs no card, but one tradeoff — Google's
   terms allow using free-tier prompts/outputs to improve their models.
   Since the only data going through here is your public resume info, that's
   a low-stakes tradeoff for a portfolio site, but worth knowing. The
   in-memory rate limiter (3 requests/minute/IP, shared with the contact
   form) stays in place regardless, to keep usage well inside the free quota
   even if the site gets a traffic spike.
6. If you ever outgrow the free tier or want higher throughput, swap
   `GEMINI_MODEL` in the route file to `"gemini-flash-lite-latest"` for
   higher rate limits, or add billing on the Google Cloud project for
   production-tier limits.

## 5. Set up Resend (contact form emails)

1. Create a free account at [resend.com](https://resend.com).
2. **API Keys → Create API Key**, copy it into `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to where you want messages delivered
   (defaults to `abhutani@berkeley.edu`).
4. `CONTACT_FROM_EMAIL` defaults to Resend's shared `onboarding@resend.dev`
   sender, which works immediately with no setup. To send from your own
   domain (e.g. `hello@anikabhutani.dev`), verify that domain under
   **Domains** in the Resend dashboard first, then update this value.
5. If `RESEND_API_KEY` isn't set, the form still validates and (if Supabase
   is configured) logs submissions — it just won't email you until you add
   the key.

## 6. Add your real assets

Drop these into `public/assets/` (referenced by exact filename in the code):

- `anika_headshot.jpeg` — About section photo
- `smart_clinical_img.png` — Smart Clinical project screenshot
- `resume.pdf` — downloaded by the terminal's `resume` command
- `terminal-icon.png` (optional) — swap in for the built-in SVG glyph on the
  floating terminal button, see `src/components/FloatingTerminalButton.tsx`

For the other four projects (Kinkade Theater Acoustic Model, Energy Equity
Model, Justice Junction, Pneumonia Detection, TeenTaskForce), fill in the
`TODO` overview/detail text and optional `image`/`snippet` fields in
`src/lib/data.ts` — the original file had placeholders for these too.

## 7. Run locally

```bash
npm run dev
```

## 8. Deploy (Vercel recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add every variable from `.env.example` in the Vercel project's
   **Settings → Environment Variables**.
4. Deploy. `revalidate = 3600` on the API routes means GitHub/Supabase data
   refreshes at most once an hour, keeping page loads fast.

## Notes on scope decisions

- **Rate limiting** on `/api/contact` is in-memory, which is fine for a
  single Vercel instance on Hobby/Pro. If traffic grows enough that this
  matters, swap `src/lib/rateLimit.ts` for Upstash Redis's rate-limit SDK —
  the function signature is designed to drop in without touching the route.
- **GitHub streak/contributions** are real, pulled from GitHub's GraphQL
  `contributionsCollection.contributionCalendar` query (`src/lib/github.ts`).
  The streak is computed by walking the calendar backwards from today,
  counting consecutive days with at least one contribution — today itself
  doesn't break the streak if it's still at zero, since the day isn't over.
  Fine-grained PAT scopes are enough; no extra permissions needed for this.
