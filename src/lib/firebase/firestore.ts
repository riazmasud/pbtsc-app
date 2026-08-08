import { getFirestore } from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);

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
