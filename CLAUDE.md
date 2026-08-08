# PBTSC App — Project Reference

**Palm Beach Tigers Sporting Club** — Kids soccer academy portal (ages 5–12) replacing Facebook Messenger coordination.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind CSS v3
- Firebase Auth (Email/Password) + Firestore
- Firebase project: `pbtsc-dev`

## Data model

| Collection | What it stores |
|---|---|
| `users/{uid}` | Login profiles — admin, coach, parent |
| `players/{id}` | Kids in the academy (not login accounts) |
| `coaches/{id}` | Coach records (linked to a `users` uid) |
| `practices/{id}` | Scheduled practice sessions |
| `announcements/{id}` | Posts visible to all parents |
| `attendance/{practiceId_playerId}` | Per-player attendance per practice |
| `coachPayments/{id}` | Payment records per coach |

## Roles
- `admin` — full access, manages everything
- `coach` — views their practices, marks attendance
- `parent` — views schedule, announcements, their kids' attendance

## Routes
- `/` — landing page
- `/login` — login page (role-based redirect after sign-in)
- `/admin` — admin dashboard
- `/admin/players` — manage players
- `/admin/coaches` — manage coaches
- `/admin/practices` — schedule practices
- `/admin/announcements` — post announcements
- `/admin/attendance` — view attendance records
- `/admin/coach-payments` — track coach payments
- `/coach` — coach dashboard
- `/coach/practices` — coach's practice schedule
- `/coach/attendance` — mark attendance
- `/parent` — parent dashboard
- `/parent/schedule` — upcoming practices
- `/parent/announcements` — announcements feed
- `/parent/attendance` — kids' attendance history

---

## Phase 1 — Complete

- Full folder/route structure, all pages as placeholder UI
- Role-based `AuthContext` with `useAuth()` hook
- Firebase config wired via `.env.local`
- Real Firebase Email/Password auth (`onAuthStateChanged`, `signInWithEmailAndPassword`, `signOut`)
- Role-based redirect on login (reads `role` from Firestore `users/{uid}`)
- Typed service layer stubbed for all collections (`src/lib/firebase/services/`)
- Seed script (`scripts/seed.mjs`) — populates Firestore with dev data

### Seed data (run once against `pbtsc-dev`)
- 1 admin user (your real Firebase Auth UID)
- 2 coaches (Firestore only — no Firebase Auth accounts yet)
- 2 parents (Firestore only — no Firebase Auth accounts yet)
- 6 players (kids — not login accounts)
- 4 practices (2 past, 2 upcoming)
- 12 attendance records
- 3 announcements
- 2 coach payment records

---

## Phase 2 — In Progress

### Done
- [x] Firebase Auth replacing demo localStorage auth
- [x] Firestore database created (test mode rules)
- [x] Seed data loaded

### Pending — connect pages to Firestore

Each page below is stubbed with placeholder/skeleton UI. The service functions already exist in `src/lib/firebase/services/` — pages just need to call them.

#### Admin
- [ ] `/admin` — replace `—` stat cards with real Firestore counts
- [ ] `/admin/players` — list players, add player form, edit, deactivate
- [ ] `/admin/coaches` — list coaches, add coach form, edit
- [ ] `/admin/practices` — list practices, add/edit/cancel practice
- [ ] `/admin/announcements` — list announcements, create/pin/delete
- [ ] `/admin/attendance` — view attendance by practice
- [ ] `/admin/coach-payments` — list payments, mark as paid

#### Coach
- [ ] `/coach` — dashboard with upcoming practices count
- [ ] `/coach/practices` — list their assigned practices
- [ ] `/coach/attendance` — mark players present/absent for a practice

#### Parent
- [ ] `/parent` — dashboard with next practice and player count
- [ ] `/parent/schedule` — upcoming practices list
- [ ] `/parent/announcements` — announcements feed
- [ ] `/parent/attendance` — their kids' attendance history

### Pending — auth for coaches and parents
- [ ] Create real Firebase Auth accounts for coaches (currently Firestore-only with fake UIDs)
- [ ] Create real Firebase Auth accounts for parents (same)
- [ ] Or build an invite/onboarding flow so they can self-register

---

## Phase 3 — Future

- PWA service worker (`next-pwa`)
- Push notifications

## Out of scope (all phases)
- Parent payments / Stripe
- Photo gallery
- Chat
- Waiver forms

---

## Key files

| File | Purpose |
|---|---|
| `src/context/AuthContext.tsx` | Auth state, login, logout |
| `src/lib/firebase/config.ts` | Firebase app init |
| `src/lib/firebase/auth.ts` | Firebase Auth instance |
| `src/lib/firebase/firestore.ts` | Firestore instance + collection notes |
| `src/lib/firebase/services/` | CRUD service functions per collection |
| `src/lib/firebase/seed.ts` | Seed data (TypeScript version, for reference) |
| `scripts/seed.mjs` | Runnable seed script: `node scripts/seed.mjs <adminUID>` |
| `src/types/index.ts` | All TypeScript types |
| `.env.local` | Firebase config values (not committed) |
| `.env.local.example` | Template for env vars |
