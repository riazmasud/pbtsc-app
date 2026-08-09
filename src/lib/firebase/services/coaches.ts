import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { Coach } from "@/types";
import { toISO, clean } from "./_converters";

const COL = "coaches";

function docToCoach(id: string, data: Record<string, unknown>): Coach {
  return {
    id,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    email: data.email as string,
    phone: data.phone as string | undefined,
    uid: data.uid as string,
    active: data.active as boolean,
    createdAt: toISO(data.createdAt as never),
  };
}

/** Creates a new coach document. */
export async function createCoach(
  data: Omit<Coach, "id" | "createdAt">
): Promise<Coach> {
  const ref = await addDoc(collection(db, COL), {
    ...clean(data),
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...data, createdAt: new Date().toISOString() };
}

/** Fetches a single coach by document ID. Returns null if not found. */
export async function getCoachById(id: string): Promise<Coach | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToCoach(snap.id, snap.data());
}

/** Fetches a coach by their Firebase Auth uid. Returns null if not found. */
export async function getCoachByUid(uid: string): Promise<Coach | null> {
  const q = query(collection(db, COL), where("uid", "==", uid));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return docToCoach(d.id, d.data());
}

/** Fetches all coaches, ordered by last name. */
export async function getAllCoaches(): Promise<Coach[]> {
  const q = query(collection(db, COL), orderBy("lastName"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToCoach(d.id, d.data()));
}

/** Fetches active coaches only. */
export async function getActiveCoaches(): Promise<Coach[]> {
  const q = query(
    collection(db, COL),
    where("active", "==", true),
    orderBy("lastName")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToCoach(d.id, d.data()));
}

/** Updates editable fields on a coach document. */
export async function updateCoach(
  id: string,
  data: Partial<Omit<Coach, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

/** Soft-deletes a coach by setting active = false. */
export async function deactivateCoach(id: string): Promise<void> {
  await updateDoc(doc(db, COL, id), { active: false });
}

/** Re-activates a previously deactivated coach. */
export async function reactivateCoach(id: string): Promise<void> {
  await updateDoc(doc(db, COL, id), { active: true });
}
