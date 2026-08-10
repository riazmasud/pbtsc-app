/**
 * Seed script — writes initial Firestore data for local development.
 *
 * Usage:
 *   node scripts/seed.mjs <adminUID>
 *
 * Where <adminUID> is the Firebase Auth UID of the admin account you created
 * in the Firebase console (Authentication → Users → copy the UID column).
 *
 * Example:
 *   node scripts/seed.mjs abc123XYZ
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

// ─── Parse .env.local ─────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

let envContent;
try {
  envContent = readFileSync(envPath, "utf8");
} catch {
  console.error("ERROR: .env.local not found. Run from the project root.");
  process.exit(1);
}

const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .map((line) => {
      const [key, ...rest] = line.split("=");
      return [key.trim(), rest.join("=").trim()];
    })
);

// ─── Firebase init ────────────────────────────────────────────────────────────

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

// ─── Admin UID from CLI ───────────────────────────────────────────────────────

const adminUID = process.argv[2];
if (!adminUID) {
  console.error(
    "ERROR: Pass your admin Firebase Auth UID as the first argument.\n" +
    "  node scripts/seed.mjs <adminUID>"
  );
  process.exit(1);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const now = new Date().toISOString();

// ─── Seed data ────────────────────────────────────────────────────────────────

// Placeholder UIDs for coaches and parents — these are Firestore-only records
// (no real Firebase Auth accounts needed until Phase 2 coach/parent onboarding).
const COACH_1_UID = "seed-coach-uid-001";
const COACH_2_UID = "seed-coach-uid-002";
const PARENT_1_UID = "seed-parent-uid-001";
const PARENT_2_UID = "seed-parent-uid-002";

const USERS = [
  { uid: adminUID,      email: "admin@pbtsc.com",               displayName: "Academy Admin",    role: "admin",  phone: "561-000-0001" },
  { uid: COACH_1_UID,   email: "coach.thompson@pbtsc.com",       displayName: "Marcus Thompson",  role: "coach",  phone: "561-000-0002" },
  { uid: COACH_2_UID,   email: "coach.rivera@pbtsc.com",         displayName: "Sofia Rivera",     role: "coach",  phone: "561-000-0003" },
  { uid: PARENT_1_UID,  email: "david.johnson@example.com",      displayName: "David Johnson",    role: "parent", phone: "561-000-0004" },
  { uid: PARENT_2_UID,  email: "maria.garcia@example.com",       displayName: "Maria Garcia",     role: "parent", phone: "561-000-0005" },
];

const COACHES = [
  { uid: COACH_1_UID, firstName: "Marcus",  lastName: "Thompson", email: "coach.thompson@pbtsc.com", phone: "561-000-0002", active: true },
  { uid: COACH_2_UID, firstName: "Sofia",   lastName: "Rivera",   email: "coach.rivera@pbtsc.com",   phone: "561-000-0003", active: true },
];

const PLAYERS = [
  { firstName: "Jaylen",   lastName: "Johnson", dateOfBirth: "2016-03-12", age: 8,  ageGroup: "U8",  parentId: PARENT_1_UID, parentName: "David Johnson", active: true },
  { firstName: "Brianna",  lastName: "Johnson", dateOfBirth: "2018-07-22", age: 6,  ageGroup: "U6",  parentId: PARENT_1_UID, parentName: "David Johnson", active: true },
  { firstName: "Lucas",    lastName: "Garcia",  dateOfBirth: "2015-11-05", age: 9,  ageGroup: "U10", parentId: PARENT_2_UID, parentName: "Maria Garcia",  active: true },
  { firstName: "Isabella", lastName: "Garcia",  dateOfBirth: "2017-04-18", age: 7,  ageGroup: "U8",  parentId: PARENT_2_UID, parentName: "Maria Garcia",  active: true },
  { firstName: "Elijah",   lastName: "Thompson",dateOfBirth: "2014-09-30", age: 10, ageGroup: "U10", parentId: PARENT_1_UID, parentName: "David Johnson", active: true, notes: "Goalkeeper" },
  { firstName: "Amara",    lastName: "Williams",dateOfBirth: "2019-01-14", age: 5,  ageGroup: "U6",  parentId: PARENT_2_UID, parentName: "Maria Garcia",  active: true },
];

const PRACTICES = [
  { date: daysFromNow(-7), startTime: "09:00", endTime: "10:30", location: "Palm Beach Soccer Complex — Field A", coachId: COACH_1_UID, coachName: "Marcus Thompson", cancelled: false, notes: "Dribbling and passing drills" },
  { date: daysFromNow(-3), startTime: "09:00", endTime: "10:30", location: "Palm Beach Soccer Complex — Field A", coachId: COACH_2_UID, coachName: "Sofia Rivera",    cancelled: false, notes: "Scrimmage — bring pennies" },
  { date: daysFromNow(4),  startTime: "09:00", endTime: "10:30", location: "Palm Beach Soccer Complex — Field A", coachId: COACH_1_UID, coachName: "Marcus Thompson", cancelled: false },
  { date: daysFromNow(11), startTime: "09:00", endTime: "10:30", location: "Palm Beach Soccer Complex — Field B", coachId: COACH_2_UID, coachName: "Sofia Rivera",    cancelled: false, notes: "Shooting practice" },
];

const ANNOUNCEMENTS = [
  { title: "Welcome to the 2025 PBTSC Soccer Academy Season!", body: "We are thrilled to kick off another exciting season. Practices are every Saturday at 9:00 AM at Palm Beach Soccer Complex. Please arrive 10 minutes early and bring water and cleats.", authorId: adminUID, authorName: "Academy Admin", pinned: true },
  { title: "Reminder: Uniform pickup this Saturday",           body: "Team uniforms are ready for pickup this Saturday before practice. Please bring your confirmation email. If you have any sizing issues, see Coach Marcus at the field.",                   authorId: adminUID, authorName: "Academy Admin", pinned: false },
  { title: "Field change for next week's practice",            body: "Due to scheduled maintenance, next Saturday's practice will be on Field B instead of Field A. All other details remain the same. See you on the field!",                               authorId: adminUID, authorName: "Academy Admin", pinned: false },
];

// ─── Runner ───────────────────────────────────────────────────────────────────

async function run() {
  console.log(`Seeding project: ${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
  console.log(`Admin UID: ${adminUID}\n`);

  // Users
  process.stdout.write("  users ...");
  for (const u of USERS) {
    await setDoc(doc(db, "users", u.uid), { ...u, createdAt: now });
  }
  console.log(` ${USERS.length} done`);

  // Coaches
  process.stdout.write("  coaches ...");
  const coachDocs = [];
  for (const c of COACHES) {
    const ref = await addDoc(collection(db, "coaches"), { ...c, createdAt: now });
    coachDocs.push({ id: ref.id, ...c });
  }
  console.log(` ${COACHES.length} done`);

  // Players
  process.stdout.write("  players ...");
  const playerDocs = [];
  for (const p of PLAYERS) {
    const ref = await addDoc(collection(db, "players"), { ...p, createdAt: now });
    playerDocs.push({ id: ref.id, ...p });
  }
  console.log(` ${PLAYERS.length} done`);

  // Practices
  process.stdout.write("  practices ...");
  const practiceDocs = [];
  for (const pr of PRACTICES) {
    const ref = await addDoc(collection(db, "practices"), { ...pr, createdAt: now });
    practiceDocs.push({ id: ref.id, ...pr });
  }
  console.log(` ${PRACTICES.length} done`);

  // Attendance — mark the two past practices
  process.stdout.write("  attendance ...");
  const [past1, past2] = practiceDocs;
  const attendanceBatch = [];
  playerDocs.forEach((p, i) => {
    attendanceBatch.push({ practiceId: past1.id, practiceDate: past1.date, playerId: p.id, playerName: `${p.firstName} ${p.lastName}`, present: i !== 2, markedAt: now, markedById: COACH_1_UID });
    attendanceBatch.push({ practiceId: past2.id, practiceDate: past2.date, playerId: p.id, playerName: `${p.firstName} ${p.lastName}`, present: i !== 4, markedAt: now, markedById: COACH_2_UID });
  });
  for (const a of attendanceBatch) {
    await setDoc(doc(db, "attendance", `${a.practiceId}_${a.playerId}`), { ...a, id: `${a.practiceId}_${a.playerId}` });
  }
  console.log(` ${attendanceBatch.length} done`);

  // Announcements
  process.stdout.write("  announcements ...");
  for (const a of ANNOUNCEMENTS) {
    await addDoc(collection(db, "announcements"), { ...a, createdAt: now });
  }
  console.log(` ${ANNOUNCEMENTS.length} done`);

  // Coach payments
  process.stdout.write("  coachPayments ...");
  await addDoc(collection(db, "coachPayments"), { coachId: COACH_1_UID, coachName: "Marcus Thompson", amount: 200, periodStart: daysFromNow(-14), periodEnd: daysFromNow(-1), status: "pending", notes: "2 sessions × $100", createdAt: now });
  await addDoc(collection(db, "coachPayments"), { coachId: COACH_2_UID, coachName: "Sofia Rivera",    amount: 200, periodStart: daysFromNow(-14), periodEnd: daysFromNow(-1), status: "pending", notes: "2 sessions × $100", createdAt: now });
  console.log(" 2 done");

  console.log("\nSeed complete.");
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
