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
import { CoachPayment } from "@/types";
import { toISO } from "./_converters";

const COL = "coachPayments";

function docToPayment(id: string, data: Record<string, unknown>): CoachPayment {
  return {
    id,
    coachId: data.coachId as string,
    coachName: data.coachName as string,
    amount: data.amount as number,
    periodStart: data.periodStart as string,
    periodEnd: data.periodEnd as string,
    status: data.status as "pending" | "paid",
    paidAt: data.paidAt ? toISO(data.paidAt as never) : undefined,
    notes: data.notes as string | undefined,
    createdAt: toISO(data.createdAt as never),
  };
}

/** Creates a new payment record with status "pending". */
export async function createCoachPayment(
  data: Omit<CoachPayment, "id" | "createdAt" | "status" | "paidAt">
): Promise<CoachPayment> {
  const payload = { ...data, status: "pending" as const, createdAt: serverTimestamp() };
  const ref = await addDoc(collection(db, COL), payload);
  return {
    id: ref.id,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

/** Fetches a single payment record by document ID. Returns null if not found. */
export async function getCoachPaymentById(id: string): Promise<CoachPayment | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return docToPayment(snap.id, snap.data());
}

/** Fetches all payment records, newest first. */
export async function getAllCoachPayments(): Promise<CoachPayment[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPayment(d.id, d.data()));
}

/** Fetches all payment records for a specific coach. */
export async function getPaymentsByCoach(coachId: string): Promise<CoachPayment[]> {
  const q = query(
    collection(db, COL),
    where("coachId", "==", coachId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPayment(d.id, d.data()));
}

/** Fetches all pending (unpaid) payment records. */
export async function getPendingPayments(): Promise<CoachPayment[]> {
  const q = query(
    collection(db, COL),
    where("status", "==", "pending"),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPayment(d.id, d.data()));
}

/**
 * Marks a payment as paid and records the payment timestamp.
 * Defaults to right now if no date is provided.
 */
export async function markAsPaid(id: string, paidAt?: string): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    status: "paid",
    paidAt: paidAt ?? new Date().toISOString(),
  });
}

/** Updates notes or amount on a payment record. */
export async function updateCoachPayment(
  id: string,
  data: Partial<Pick<CoachPayment, "amount" | "notes" | "periodStart" | "periodEnd">>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

/** Deletes a payment record. */
export async function deleteCoachPayment(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
