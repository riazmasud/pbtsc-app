import { initializeFirestore, getFirestore, Firestore } from "firebase/firestore";
import { app } from "./config";

// experimentalAutoDetectLongPolling works around a known Firestore issue on
// Safari/iOS (and some WiFi networks/proxies) where the default WebChannel
// streaming connection stalls for several seconds before falling back —
// this detects that case and uses long-polling immediately instead.
// Guarded with try/catch since initializeFirestore throws if called twice
// on the same app (can happen during dev-mode hot reload).
let db: Firestore;
try {
  db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch {
  db = getFirestore(app);
}

export { db };

// All Firestore reads and writes go through the typed service layer:
//   src/lib/firebase/services/users.ts
//   src/lib/firebase/services/players.ts
//   src/lib/firebase/services/coaches.ts
//   src/lib/firebase/services/practices.ts
//   src/lib/firebase/services/attendance.ts
//   src/lib/firebase/services/announcements.ts
//   src/lib/firebase/services/coachPayments.ts
//
// Import from the barrel: import { createPlayer, ... } from "@/lib/firebase/services";
//
// Firestore collections:
//   users/{uid}             → UserProfile
//   players/{id}            → Player
//   coaches/{id}            → Coach
//   practices/{id}          → Practice
//   announcements/{id}      → Announcement
//   attendance/{pid_plid}   → AttendanceRecord  (id = practiceId_playerId)
//   coachPayments/{id}      → CoachPayment
