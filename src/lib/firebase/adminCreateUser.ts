import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

/**
 * Creates a Firebase Auth account without affecting the currently
 * signed-in (admin) session. Uses a throwaway secondary app instance
 * since this is a static export with no backend to run the Admin SDK.
 */
export async function createAuthAccount(email: string, password: string): Promise<string> {
  const secondaryApp = initializeApp(firebaseConfig, `secondary-${Date.now()}`);
  try {
    const cred = await createUserWithEmailAndPassword(getAuth(secondaryApp), email, password);
    return cred.user.uid;
  } finally {
    await deleteApp(secondaryApp);
  }
}
