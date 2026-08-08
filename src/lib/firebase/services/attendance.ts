import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { AttendanceRecord } from "@/types";
import { toISO } from "./_converters";

const COL = "attendance";

/**
 * Attendance document IDs are "${practiceId}_${playerId}".
 * This allows O(1) lookup of any specific record without a compound query.
 */
export function attendanceDocId(practiceId: string, playerId: string): string {
  return `${practiceId}_${playerId}`;
}

function docToRecord(id: string, data: Record<string, unknown>): AttendanceRecord {
  return {
    id,
    practiceId: data.practiceId as string,
    practiceDate: data.practiceDate as string,
    playerId: data.playerId as string,
    playerName: data.playerName as string,
    present: data.present as boolean,
    markedAt: toISO(data.markedAt as never),
    markedById: data.markedById as string,
  };
}

/**
 * Saves attendance for a whole practice session in a single batch write.
 * Pass the full roster — existing records for the same practice are overwritten.
 */
export async function saveAttendance(records: Omit<AttendanceRecord, "id">[]): Promise<void> {
  const batch = writeBatch(db);
  const now = new Date().toISOString();

  for (const record of records) {
    const id = attendanceDocId(record.practiceId, record.playerId);
    const ref = doc(db, COL, id);
    batch.set(ref, { ...record, markedAt: now });
  }

  await batch.commit();
}

/** Fetches a single attendance record for one player at one practice. */
export async function getAttendanceRecord(
  practiceId: string,
  playerId: string
): Promise<AttendanceRecord | null> {
  const id = attendanceDocId(practiceId, playerId);
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToRecord(snap.id, snap.data());
}

/** Fetches all attendance records for a practice session. */
export async function getAttendanceByPractice(
  practiceId: string
): Promise<AttendanceRecord[]> {
  const q = query(
    collection(db, COL),
    where("practiceId", "==", practiceId),
    orderBy("playerName")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToRecord(d.id, d.data()));
}

/** Fetches the full attendance history for a single player. */
export async function getAttendanceByPlayer(
  playerId: string
): Promise<AttendanceRecord[]> {
  const q = query(
    collection(db, COL),
    where("playerId", "==", playerId),
    orderBy("practiceDate", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToRecord(d.id, d.data()));
}

/**
 * Returns a summary { attended, total, rate } for a player.
 * Useful for the parent attendance screen.
 */
export async function getAttendanceSummary(
  playerId: string
): Promise<{ attended: number; total: number; rate: number }> {
  const records = await getAttendanceByPlayer(playerId);
  const attended = records.filter((r) => r.present).length;
  const total = records.length;
  const rate = total === 0 ? 0 : Math.round((attended / total) * 100);
  return { attended, total, rate };
}
