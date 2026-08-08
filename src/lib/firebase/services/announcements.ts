import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { Announcement } from "@/types";
import { toISO } from "./_converters";

const COL = "announcements";

function docToAnnouncement(id: string, data: Record<string, unknown>): Announcement {
  return {
    id,
    title: data.title as string,
    body: data.body as string,
    authorId: data.authorId as string,
    authorName: data.authorName as string,
    pinned: data.pinned as boolean,
    createdAt: toISO(data.createdAt as never),
  };
}

/** Creates a new announcement. */
export async function createAnnouncement(
  data: Omit<Announcement, "id" | "createdAt">
): Promise<Announcement> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...data, createdAt: new Date().toISOString() };
}

/** Fetches a single announcement by document ID. Returns null if not found. */
export async function getAnnouncementById(id: string): Promise<Announcement | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToAnnouncement(snap.id, snap.data());
}

/**
 * Fetches all announcements ordered by: pinned first, then newest.
 * Firestore requires a composite index on (pinned DESC, createdAt DESC).
 * Create it in Firebase Console → Firestore → Indexes when prompted.
 */
export async function getAllAnnouncements(): Promise<Announcement[]> {
  const q = query(
    collection(db, COL),
    orderBy("pinned", "desc"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToAnnouncement(d.id, d.data()));
}

/** Fetches the N most recent announcements (for dashboard previews). */
export async function getRecentAnnouncements(n = 3): Promise<Announcement[]> {
  const q = query(
    collection(db, COL),
    orderBy("createdAt", "desc"),
    limit(n)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToAnnouncement(d.id, d.data()));
}

/** Updates an announcement's title, body, or pinned status. */
export async function updateAnnouncement(
  id: string,
  data: Partial<Pick<Announcement, "title" | "body" | "pinned">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

/** Toggles the pinned flag on an announcement. */
export async function pinAnnouncement(id: string, pinned: boolean): Promise<void> {
  await updateDoc(doc(db, COL, id), { pinned });
}

/** Permanently deletes an announcement. */
export async function deleteAnnouncement(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
