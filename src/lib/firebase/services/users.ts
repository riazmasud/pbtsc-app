import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { UserProfile, UserRole } from "@/types";
import { toISO, clean } from "./_converters";

const COL = "users";

function docToUserProfile(id: string, data: Record<string, unknown>): UserProfile {
  return {
    uid: id,
    email: data.email as string,
    displayName: data.displayName as string,
    role: data.role as UserRole,
    phone: data.phone as string | undefined,
    createdAt: toISO(data.createdAt as never),
  };
}

/**
 * Creates or overwrites a user profile document.
 * Call this after Firebase Auth creates the account.
 */
export async function createUserProfile(
  uid: string,
  data: Omit<UserProfile, "uid" | "createdAt">
): Promise<UserProfile> {
  const payload = { ...clean(data), createdAt: serverTimestamp() };
  await setDoc(doc(db, COL, uid), payload);
  return { uid, ...data, createdAt: new Date().toISOString() };
}

/** Fetches a single user profile by uid. Returns null if not found. */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, COL, uid));
  if (!snap.exists()) return null;
  return docToUserProfile(snap.id, snap.data());
}

/** Fetches all user profiles. */
export async function getAllUsers(): Promise<UserProfile[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => docToUserProfile(d.id, d.data()));
}

/** Fetches all users with a specific role. */
export async function getUsersByRole(role: UserRole): Promise<UserProfile[]> {
  const q = query(collection(db, COL), where("role", "==", role));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToUserProfile(d.id, d.data()));
}

/** Updates editable fields on a user profile. */
export async function updateUserProfile(
  uid: string,
  data: Partial<Pick<UserProfile, "displayName" | "phone" | "role">>
): Promise<void> {
  await updateDoc(doc(db, COL, uid), data);
}
