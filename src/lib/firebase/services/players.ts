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
import { Player } from "@/types";
import { toISO } from "./_converters";

const COL = "players";

function docToPlayer(id: string, data: Record<string, unknown>): Player {
  return {
    id,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    dateOfBirth: data.dateOfBirth as string,
    age: data.age as number,
    parentId: data.parentId as string,
    parentName: data.parentName as string,
    notes: data.notes as string | undefined,
    active: data.active as boolean,
    createdAt: toISO(data.createdAt as never),
  };
}

/** Creates a new player document. */
export async function createPlayer(
  data: Omit<Player, "id" | "createdAt">
): Promise<Player> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...data, createdAt: new Date().toISOString() };
}

/** Fetches a single player by document ID. Returns null if not found. */
export async function getPlayerById(id: string): Promise<Player | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToPlayer(snap.id, snap.data());
}

/** Fetches all players, ordered by last name. */
export async function getAllPlayers(): Promise<Player[]> {
  const q = query(collection(db, COL), orderBy("lastName"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPlayer(d.id, d.data()));
}

/** Fetches all active players only. */
export async function getActivePlayers(): Promise<Player[]> {
  const q = query(
    collection(db, COL),
    where("active", "==", true),
    orderBy("lastName")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPlayer(d.id, d.data()));
}

/** Fetches all players belonging to a specific parent uid. */
export async function getPlayersByParent(parentId: string): Promise<Player[]> {
  const q = query(
    collection(db, COL),
    where("parentId", "==", parentId),
    orderBy("firstName")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPlayer(d.id, d.data()));
}

/** Updates editable fields on a player document. */
export async function updatePlayer(
  id: string,
  data: Partial<Omit<Player, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

/** Soft-deletes a player by setting active = false. */
export async function deactivatePlayer(id: string): Promise<void> {
  await updateDoc(doc(db, COL, id), { active: false });
}

/** Re-activates a previously deactivated player. */
export async function reactivatePlayer(id: string): Promise<void> {
  await updateDoc(doc(db, COL, id), { active: true });
}
