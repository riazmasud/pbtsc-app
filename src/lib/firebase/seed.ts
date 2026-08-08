/**
 * Seed / mock data for local development and testing.
 *
 * HOW TO USE
 * ----------
 * Option A — paste into the browser console while the app is running:
 *   import { runSeed } from "@/lib/firebase/seed"; runSeed();
 *
 * Option B — call runSeed() from a temporary admin page or a one-off script.
 *
 * WARNING: runSeed() writes real documents to your Firestore database.
 * Only run it against a development/test project, never against production.
 */

import { createUserProfile } from "./services/users";
import { createPlayer } from "./services/players";
import { createCoach } from "./services/coaches";
import { createPractice } from "./services/practices";
import { saveAttendance } from "./services/attendance";
import { createAnnouncement } from "./services/announcements";
import { createCoachPayment } from "./services/coachPayments";
import {
  UserProfile,
  Player,
  Coach,
  Practice,
  Announcement,
} from "@/types";

// ─── Static mock IDs ──────────────────────────────────────────────────────────
// Using fixed strings so attendance records can reference the right IDs
// even before the real documents are returned from Firestore.

const COACH_1_UID = "seed-coach-uid-001";
const COACH_2_UID = "seed-coach-uid-002";
const PARENT_1_UID = "seed-parent-uid-001";
const PARENT_2_UID = "seed-parent-uid-002";
const ADMIN_UID = "seed-admin-uid-001";

// Dates relative to today so the seed data stays "upcoming"
function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function daysAgo(n: number): string {
  return daysFromNow(-n);
}

// ─── User profiles ────────────────────────────────────────────────────────────

const SEED_USERS: Array<Omit<UserProfile, "createdAt">> = [
  {
    uid: ADMIN_UID,
    email: "admin@pbtsc.com",
    displayName: "Academy Admin",
    role: "admin",
    phone: "561-000-0001",
  },
  {
    uid: COACH_1_UID,
    email: "coach.thompson@pbtsc.com",
    displayName: "Marcus Thompson",
    role: "coach",
    phone: "561-000-0002",
  },
  {
    uid: COACH_2_UID,
    email: "coach.rivera@pbtsc.com",
    displayName: "Sofia Rivera",
    role: "coach",
    phone: "561-000-0003",
  },
  {
    uid: PARENT_1_UID,
    email: "david.johnson@example.com",
    displayName: "David Johnson",
    role: "parent",
    phone: "561-000-0004",
  },
  {
    uid: PARENT_2_UID,
    email: "maria.garcia@example.com",
    displayName: "Maria Garcia",
    role: "parent",
    phone: "561-000-0005",
  },
];

// ─── Coaches ──────────────────────────────────────────────────────────────────

const SEED_COACHES: Array<Omit<Coach, "id" | "createdAt">> = [
  {
    firstName: "Marcus",
    lastName: "Thompson",
    email: "coach.thompson@pbtsc.com",
    phone: "561-000-0002",
    uid: COACH_1_UID,
    active: true,
  },
  {
    firstName: "Sofia",
    lastName: "Rivera",
    email: "coach.rivera@pbtsc.com",
    phone: "561-000-0003",
    uid: COACH_2_UID,
    active: true,
  },
];

// ─── Players ──────────────────────────────────────────────────────────────────

const SEED_PLAYERS: Array<Omit<Player, "id" | "createdAt">> = [
  {
    firstName: "Jaylen",
    lastName: "Johnson",
    dateOfBirth: "2016-03-12",
    age: 8,
    parentId: PARENT_1_UID,
    parentName: "David Johnson",
    active: true,
  },
  {
    firstName: "Brianna",
    lastName: "Johnson",
    dateOfBirth: "2018-07-22",
    age: 6,
    parentId: PARENT_1_UID,
    parentName: "David Johnson",
    active: true,
  },
  {
    firstName: "Lucas",
    lastName: "Garcia",
    dateOfBirth: "2015-11-05",
    age: 9,
    parentId: PARENT_2_UID,
    parentName: "Maria Garcia",
    active: true,
  },
  {
    firstName: "Isabella",
    lastName: "Garcia",
    dateOfBirth: "2017-04-18",
    age: 7,
    parentId: PARENT_2_UID,
    parentName: "Maria Garcia",
    active: true,
  },
  {
    firstName: "Elijah",
    lastName: "Thompson",
    dateOfBirth: "2014-09-30",
    age: 10,
    parentId: PARENT_1_UID,
    parentName: "David Johnson",
    active: true,
    notes: "Goalkeeper",
  },
  {
    firstName: "Amara",
    lastName: "Williams",
    dateOfBirth: "2019-01-14",
    age: 5,
    parentId: PARENT_2_UID,
    parentName: "Maria Garcia",
    active: true,
  },
];

// ─── Practices ────────────────────────────────────────────────────────────────

const SEED_PRACTICES: Array<Omit<Practice, "id" | "createdAt">> = [
  {
    date: daysAgo(7),
    startTime: "09:00",
    endTime: "10:30",
    location: "Palm Beach Soccer Complex — Field A",
    coachId: COACH_1_UID,
    coachName: "Marcus Thompson",
    cancelled: false,
    notes: "Dribbling and passing drills",
  },
  {
    date: daysAgo(3),
    startTime: "09:00",
    endTime: "10:30",
    location: "Palm Beach Soccer Complex — Field A",
    coachId: COACH_2_UID,
    coachName: "Sofia Rivera",
    cancelled: false,
    notes: "Scrimmage — bring pennies",
  },
  {
    date: daysFromNow(4),
    startTime: "09:00",
    endTime: "10:30",
    location: "Palm Beach Soccer Complex — Field A",
    coachId: COACH_1_UID,
    coachName: "Marcus Thompson",
    cancelled: false,
  },
  {
    date: daysFromNow(11),
    startTime: "09:00",
    endTime: "10:30",
    location: "Palm Beach Soccer Complex — Field B",
    coachId: COACH_2_UID,
    coachName: "Sofia Rivera",
    cancelled: false,
    notes: "Shooting practice",
  },
];

// ─── Announcements ────────────────────────────────────────────────────────────

const SEED_ANNOUNCEMENTS: Array<Omit<Announcement, "id" | "createdAt">> = [
  {
    title: "Welcome to the 2025 PBTSC Soccer Academy Season!",
    body: "We are thrilled to kick off another exciting season of Palm Beach Tigers Soccer Academy. Practices will be held every Saturday at 9:00 AM at Palm Beach Soccer Complex. Please arrive 10 minutes early and bring water and cleats.",
    authorId: ADMIN_UID,
    authorName: "Academy Admin",
    pinned: true,
  },
  {
    title: "Reminder: Uniform pickup this Saturday",
    body: "Team uniforms are ready for pickup this Saturday before practice. Please bring your confirmation email. If you have any sizing issues, see Coach Marcus at the field.",
    authorId: ADMIN_UID,
    authorName: "Academy Admin",
    pinned: false,
  },
  {
    title: "Field change for next week's practice",
    body: "Due to scheduled maintenance, next Saturday's practice will be on Field B instead of Field A. All other details remain the same. See you on the field!",
    authorId: ADMIN_UID,
    authorName: "Academy Admin",
    pinned: false,
  },
];

// ─── Seed runner ─────────────────────────────────────────────────────────────

export async function runSeed(): Promise<void> {
  console.log("🌱 Starting PBTSC seed...");

  // 1. User profiles
  console.log("  → Creating user profiles...");
  for (const u of SEED_USERS) {
    await createUserProfile(u.uid, {
      email: u.email,
      displayName: u.displayName,
      role: u.role,
      phone: u.phone,
    });
  }

  // 2. Coaches
  console.log("  → Creating coaches...");
  for (const c of SEED_COACHES) {
    await createCoach(c);
  }

  // 3. Players
  console.log("  → Creating players...");
  const createdPlayers: Player[] = [];
  for (const p of SEED_PLAYERS) {
    const player = await createPlayer(p);
    createdPlayers.push(player);
  }

  // 4. Practices
  console.log("  → Creating practices...");
  const createdPractices: Practice[] = [];
  for (const pr of SEED_PRACTICES) {
    const practice = await createPractice(pr);
    createdPractices.push(practice);
  }

  // 5. Attendance — mark the two past practices
  console.log("  → Saving attendance records...");
  const [pastPractice1, pastPractice2] = createdPractices;

  await saveAttendance(
    createdPlayers.map((p, i) => ({
      practiceId: pastPractice1.id,
      practiceDate: pastPractice1.date,
      playerId: p.id,
      playerName: `${p.firstName} ${p.lastName}`,
      present: i !== 2, // Lucas was absent
      markedAt: new Date().toISOString(),
      markedById: COACH_1_UID,
    }))
  );

  await saveAttendance(
    createdPlayers.map((p, i) => ({
      practiceId: pastPractice2.id,
      practiceDate: pastPractice2.date,
      playerId: p.id,
      playerName: `${p.firstName} ${p.lastName}`,
      present: i !== 4, // Elijah was absent
      markedAt: new Date().toISOString(),
      markedById: COACH_2_UID,
    }))
  );

  // 6. Announcements
  console.log("  → Creating announcements...");
  for (const a of SEED_ANNOUNCEMENTS) {
    await createAnnouncement(a);
  }

  // 7. Coach payments
  console.log("  → Creating coach payment records...");
  await createCoachPayment({
    coachId: COACH_1_UID,
    coachName: "Marcus Thompson",
    amount: 200,
    periodStart: daysAgo(14),
    periodEnd: daysAgo(1),
    notes: "2 sessions × $100",
  });

  await createCoachPayment({
    coachId: COACH_2_UID,
    coachName: "Sofia Rivera",
    amount: 200,
    periodStart: daysAgo(14),
    periodEnd: daysAgo(1),
    notes: "2 sessions × $100",
  });

  console.log("✅ Seed complete!");
  console.log(`   ${SEED_USERS.length} users`);
  console.log(`   ${SEED_COACHES.length} coaches`);
  console.log(`   ${createdPlayers.length} players`);
  console.log(`   ${createdPractices.length} practices`);
  console.log(`   ${SEED_ANNOUNCEMENTS.length} announcements`);
  console.log("   2 coach payments");
}
