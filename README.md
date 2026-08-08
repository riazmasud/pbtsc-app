# PBTSC App — Soccer Academy Portal

Mobile-first web app / PWA for Palm Beach Tigers Sporting Club Soccer Academy.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase** (Authentication + Firestore)
- **PWA-ready** (manifest + viewport meta; service worker comes in Phase 3)

---

## Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | App structure, auth placeholder, all routes | ✅ Complete |
| 2 | Firebase CRUD for all collections | 🔜 Next |
| 3 | PWA service worker + push notifications | 🔜 Future |

---

## Local Development Setup

### 1. Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- A Firebase project ([console.firebase.google.com](https://console.firebase.google.com))

### 2. Clone and install

```bash
cd pbtsc-app
npm install
```

### 3. Configure Firebase environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Firebase project credentials.  
Find them in **Firebase Console → Project Settings → General → Your Apps → SDK setup and configuration**.

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Demo login (Phase 1 only)

On the login screen use any of these email prefixes with any password:

| Email | Password | Role |
|-------|----------|------|
| admin@pbtsc.com | anything | Admin |
| coach@pbtsc.com | anything | Coach |
| parent@pbtsc.com | anything | Parent |

> **Remove the demo hint box from `/src/app/login/page.tsx` before deploying to production.**

---

## Project Structure

```
pbtsc-app/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons (add icon-192.png, icon-512.png)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout — wraps all routes with AuthProvider
│   │   ├── page.tsx           # Landing page ( / )
│   │   ├── login/
│   │   │   └── page.tsx       # Login page ( /login )
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Admin shell — nav + role guard
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   ├── players/
│   │   │   ├── coaches/
│   │   │   ├── practices/
│   │   │   ├── announcements/
│   │   │   ├── attendance/
│   │   │   └── coach-payments/
│   │   ├── coach/
│   │   │   ├── layout.tsx     # Coach shell — nav + role guard
│   │   │   ├── page.tsx       # Coach dashboard
│   │   │   ├── practices/
│   │   │   └── attendance/
│   │   └── parent/
│   │       ├── layout.tsx     # Parent shell — nav + role guard
│   │       ├── page.tsx       # Parent dashboard
│   │       ├── schedule/
│   │       ├── announcements/
│   │       └── attendance/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.tsx     # Top header bar
│   │   │   └── TabNav.tsx     # Horizontal scrollable tab navigation
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── PageHeader.tsx
│   │       └── StatCard.tsx
│   ├── context/
│   │   └── AuthContext.tsx    # Auth state + login/logout (placeholder → Firebase Phase 2)
│   ├── lib/
│   │   └── firebase/
│   │       ├── config.ts      # Firebase app initialization
│   │       ├── auth.ts        # Auth instance + TODO helpers
│   │       └── firestore.ts   # Firestore instance + TODO helpers
│   └── types/
│       └── index.ts           # TypeScript types for all data models
├── .env.local.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Firebase Setup (for Phase 2)

1. In Firebase Console, enable **Email/Password Authentication**.
2. Create a **Firestore** database in production mode.
3. Add the following security rules (starter — tighten before launch):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. Create the following Firestore collections:
   - `users` — one document per user, with `role` field
   - `players`
   - `coaches`
   - `practices`
   - `announcements`
   - `attendance`
   - `coachPayments`

---

## Available Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server (after build)
npm run lint     # Run ESLint
```

---

## PWA Icons

Add two PNG icons to `public/icons/`:
- `icon-192.png` — 192×192 px
- `icon-512.png` — 512×512 px

These are referenced in `public/manifest.json`. Without them the PWA install prompt will still work but icons will be missing.
