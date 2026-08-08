/**
 * Internal utilities for converting Firestore Timestamps to ISO strings.
 * Import these only from within service files — never from UI components.
 */

import { Timestamp, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

/** Safely converts a Firestore Timestamp (or any date-like value) to an ISO string. */
export function toISO(value: Timestamp | Date | string | null | undefined): string {
  if (!value) return new Date().toISOString();
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Timestamp) return value.toDate().toISOString();
  return new Date().toISOString();
}

/** Strips undefined fields so Firestore doesn't reject them. */
export function clean<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

/** Type for a Firestore withConverter shape. */
export type SnapConverter<T> = (snap: QueryDocumentSnapshot<DocumentData>) => T;
