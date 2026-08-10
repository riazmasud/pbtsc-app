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

### Public (no login required)
- `/` — welcome page (placeholder intro text) with a public nav (Players/Coaches/Announcements/Sign In) and quick-link cards
- `/players` — public roster (first/last name, age group, avatar placeholder)
- `/players/view?id=` — public player profile
- `/coaches` — public coaching staff list (first/last name, bio snippet, avatar placeholder)
- `/coaches/view?id=` — public coach profile (full bio)
- `/announcements` — public announcements feed
- `/login` — login page (role-based redirect after sign-in)

### Behind login
- `/admin` — admin dashboard
- `/admin/users` — create/manage login accounts (admin, coach, parent)
- `/admin/players` — manage players
- `/admin/coaches` — list coaches, edit phone/bio (accounts are created via `/admin/users`)
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
- [x] `/admin/users` — list accounts, add user form (admin/coach/parent), creates real Firebase Auth account
- [x] `/admin/players` — list players, add player form (pick an existing parent account, set age group), deactivate/reactivate. Editing existing fields is still pending.
- [x] `/admin/coaches` — list coaches, inline edit for phone/bio. No separate "add coach" — coach accounts (and their linked `coaches` doc) are created via `/admin/users`.
- [ ] `/admin/practices` — list practices, add/edit/cancel practice
- [x] `/admin/announcements` — list announcements, create/pin/delete
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

### Public-facing pages (added this round)
- [x] `/`, `/players`, `/players/view`, `/coaches`, `/coaches/view`, `/announcements` — public, no login required
- [x] `src/components/layout/PublicHeader.tsx` — shared nav (Players/Coaches/Announcements/Sign In) used on every public page
- `players`, `coaches`, and `announcements` Firestore collections are readable by anyone (`allow read: if true` in `firestore.rules`) so these pages work without auth. Writes are still admin-only.
- **Known, deliberate tradeoff**: Firestore rules can only allow/deny a whole document, not individual fields. So `dateOfBirth`/`notes`/`parentId`/`parentName` (on `players`) and `email`/`phone` (on `coaches`) are technically fetchable by anyone who queries Firestore directly (e.g. via browser devtools), even though no public page renders them. Decided against splitting into public/private documents to keep this simple for a small trusted community — see the NOTE comments on the `Player`/`Coach` types in `src/types/index.ts`. Revisit if the club's needs change (e.g. if this grows beyond a small trusted community).
- `photoUrl` field exists on both `Player` and `Coach` but is unpopulated — real headshots need Firebase Storage, which requires upgrading `pbtsc-dev` to the Blaze plan first (see below). Both public and admin pages currently show an initials avatar (`src/components/ui/Avatar.tsx`) as a placeholder.

### Pending — auth for coaches and parents
- [x] Admin-driven account creation — `/admin/users` lets an admin create a real Firebase Auth account + Firestore `users/{uid}` profile (and, for coaches, a linked `coaches/{id}` doc) in one step. Uses a secondary Firebase App instance (`src/lib/firebase/adminCreateUser.ts`) so creating another person's account doesn't sign the admin out — needed since this is a static export with no backend to run the Admin SDK.
- [ ] Convert the placeholder `seed-coach-uid-00x` / `seed-parent-uid-00x` Firestore-only records (from `scripts/seed.mjs`) to real accounts via `/admin/users`, then update the `coaches`/`players` documents that still reference those fake UIDs
- [ ] Self-serve invite/onboarding flow (not needed now that admin-driven creation exists, but still an option later)

---

## Phase 3 — Future

- PWA service worker (`next-pwa`)
- Push notifications
- Player/coach photo uploads, practice session photos — blocked on upgrading `pbtsc-dev` to the Firebase **Blaze** plan (Cloud Storage for Firebase requires it to even enable the bucket, as of Google's Oct 2024 policy change — actual usage would stay within the free quota either way). User is deciding when to do this.

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
| `src/lib/firebase/adminCreateUser.ts` | Creates another user's Firebase Auth account from the admin UI without ending the admin's session |
| `src/lib/firebase/services/` | CRUD service functions per collection |
| `src/lib/firebase/seed.ts` | Seed data (TypeScript version, for reference) |
| `scripts/seed.mjs` | Runnable seed script: `node scripts/seed.mjs <adminUID>` |
| `src/types/index.ts` | All TypeScript types |
| `.env.local` | Firebase config values (not committed) |
| `.env.local.example` | Template for env vars |
