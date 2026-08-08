// TODO Phase 2: Full authentication implementation
//   - signInWithEmailAndPassword
//   - signOut
//   - onAuthStateChanged listener (called in AuthContext)
//   - password reset email
//   - first-time user setup (assign role in Firestore users/{uid})

import { getAuth } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);
