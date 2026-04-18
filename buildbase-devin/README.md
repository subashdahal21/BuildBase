# Buildbase

Hackathon scaffold for the Buildbase app — a platform where **builders** find their team and **investors** find what's worth backing.

## Flow

1. `/auth` — role select → sign up / sign in (your existing screens)
2. `/onboarding` — multi-step profile (skills + interests for builders, focus + ticket size for investors)
3. `/home` — role-aware feed: builders see projects to **collaborate** on, investors see projects to **invest** in
4. `/` — redirects based on your session state (no auth → `/auth`, no profile → `/onboarding`, done → `/home`)

> Auth and profile are mocked in `localStorage` for the hackathon — swap `lib/session.ts` for real auth when you're ready.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  auth/           # role select, sign in, sign up
  onboarding/     # multi-step profile builder
  home/           # role-aware project feed
  layout.tsx
  page.tsx        # root redirect
components/       # shared UI (TopNav, ProjectCard, etc.)
lib/              # session + mock project data
```
