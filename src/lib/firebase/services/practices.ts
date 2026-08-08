import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { Practice } from "@/types";
import { toISO } from "./_converters";

const COL = "practices";

function docToPractice(id: string, data: Record<string, unknown>): Practice {
  return {
    id,
    date: data.date as string,
    startTime: data.startTime as string,
    endTime: data.endTime as string,
    location: data.location as string,
    coachId: data.coachId as string,
    coachName: data.coachName as string,
    notes: data.notes as string | undefined,
    cancelled: data.cancelled as boolean,
    createdAt: toISO(data.createdAt as never),
  };
}

/** Creates a new practice session. */
export async function createPractice(
  data: Omit<Practice, "id" | "createdAt">
): Promise<Practice> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...data, createdAt: new Date().toISOString() };
}

/** Fetches a single practice by document ID. Returns null if not found. */
export async function getPracticeById(id: string): Promise<Practice | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToPractice(snap.id, snap.data());
}

/** Fetches all practices ordered by date ascending. */
export async function getAllPractices(): Promise<Practice[]> {
  const q = query(collection(db, COL), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPractice(d.id, d.data()));
}

/**
 * Fetches upcoming (today and future), non-cancelled practices.
 * Uses today's date string (YYYY-MM-DD) for the comparison.
 */
export async function getUpcomingPractices(): Promise<Practice[]> {
  const today = new Date().toISOString().slice(0, 10);
  const q = query(
    collection(db, COL),
    where("date", ">=", today),
    where("cancelled", "==", false),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPractice(d.id, d.data()));
}

/** Fetches all practices assigned to a specific coach. */
export async function getPracticesByCoach(coachId: string): Promise<Practice[]> {
  const q = query(
    collection(db, COL),
    where("coachId", "==", coachId),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPractice(d.id, d.data()));
}

/** Fetches upcoming practices for a specific coach. */
export async function getUpcomingPracticesByCoach(coachId: string): Promise<Practice[]> {
  const today = new Date().toISOString().slice(0, 10);
  const q = query(
    collection(db, COL),
    where("coachId", "==", coachId),
    where("date", ">=", today),
    where("cancelled", "==", false),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPractice(d.id, d.data()));
}

/** Updates editable fields on a practice document. */
export async function updatePractice(
  id: string,
  data: Partial<Omit<Practice, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

/** Marks a practice as cancelled without deleting it (preserves attendance records). */
export async function cancelPractice(id: string): Promise<void> {
  await updateDoc(doc(db, COL, id), { cancelled: true });
}

/** Hard-deletes a practice. Only use for practices with no attendance records. */
export async function deletePractice(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
