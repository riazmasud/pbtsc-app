// ─── Roles ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "coach" | "parent";

export const AGE_GROUPS = ["U6", "U8", "U10", "U12", "U14", "U16", "U18"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

// ─── Auth session (in-memory, used by AuthContext) ────────────────────────────

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

// ─── Firestore documents ──────────────────────────────────────────────────────
// All date fields are ISO-8601 strings in the app layer.
// The service layer converts Firestore Timestamps to/from strings transparently.

/** Firestore: users/{uid} */
export interface UserProfile {
  uid: string;          // same as the document ID
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

/**
 * Firestore: players/{id}
 * NOTE: this collection is publicly readable (see firestore.rules) so the
 * roster can be shown without login — dateOfBirth/notes/parentId/parentName
 * are still stored here (existing admin flows need them), just never
 * rendered on any public-facing page. Keep it that way; do not add more
 * sensitive fields to this doc without revisiting the public/private split.
 */
export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;  // YYYY-MM-DD
  age: number;
  ageGroup: AgeGroup;
  photoUrl?: string;     // placeholder for now — Storage upload is a future phase
  parentId: string;      // uid of the parent UserProfile
  parentName: string;    // denormalized for quick display
  notes?: string;
  active: boolean;
  createdAt: string;
}

/**
 * Firestore: coaches/{id}
 * NOTE: publicly readable (see firestore.rules) — email/phone are stored
 * here but never rendered on any public-facing page.
 */
export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  photoUrl?: string;     // placeholder for now — Storage upload is a future phase
  uid: string;           // Firebase Auth uid linked to this coach
  active: boolean;
  createdAt: string;
}

/** Firestore: practices/{id} */
export interface Practice {
  id: string;
  date: string;         // YYYY-MM-DD
  startTime: string;    // HH:MM (24-hour)
  endTime: string;      // HH:MM (24-hour)
  location: string;
  coachId: string;
  coachName: string;    // denormalized
  notes?: string;
  cancelled: boolean;
  createdAt: string;
}

/** Firestore: announcements/{id} */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;   // denormalized
  pinned: boolean;
  createdAt: string;
}

/**
 * Firestore: attendance/{practiceId_playerId}
 * Document ID is "${practiceId}_${playerId}" for O(1) lookup without a query.
 */
export interface AttendanceRecord {
  id: string;           // "${practiceId}_${playerId}"
  practiceId: string;
  practiceDate: string; // denormalized for display in parent/admin views
  playerId: string;
  playerName: string;   // denormalized
  present: boolean;
  markedAt: string;
  markedById: string;   // uid of the coach who marked attendance
}

/** Firestore: coachPayments/{id} */
export interface CoachPayment {
  id: string;
  coachId: string;
  coachName: string;    // denormalized
  amount: number;       // in dollars
  periodStart: string;  // YYYY-MM-DD
  periodEnd: string;    // YYYY-MM-DD
  status: "pending" | "paid";
  paidAt?: string;
  notes?: string;
  createdAt: string;
}
