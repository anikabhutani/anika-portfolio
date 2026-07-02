# Anika Bhutani — Portfolio (Next.js)

Rebuilt from the original single-file HTML site (hosted through GitHub) into a Next.js 14 App Router
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
