import * as admin from "firebase-admin";

/**
 * Parse service account JSON from env.
 * Accepts both snake_case (Google JSON) and camelCase.
 */
function readServiceAccountFromEnv() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  const obj = JSON.parse(raw);

  const sa = {
    project_id: obj.project_id ?? obj.projectId,
    client_email: obj.client_email ?? obj.clientEmail,
    private_key: (obj.private_key ?? obj.privateKey)?.replace(/\\n/g, "\n"),
  };

  if (typeof sa.project_id !== "string" || !sa.project_id) {
    throw new Error('Service account must contain string "project_id".');
  }
  if (typeof sa.client_email !== "string" || !sa.client_email) {
    throw new Error('Service account must contain string "client_email".');
  }
  if (typeof sa.private_key !== "string" || !sa.private_key) {
    throw new Error('Service account must contain string "private_key".');
  }

  return sa;
}

/**
 * Lazy init: only initializes when actually needed at runtime.
 * This prevents Next.js build (next build) from crashing on import.
 */
export function getFirebaseAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.app();

  const sa = readServiceAccountFromEnv();

  // Important: Do NOT initialize during build if creds are missing.
  // If something calls this during build, we want a clear error.
  if (!sa) {
    throw new Error(
      "Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON at runtime."
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert(sa as any),
  });

  return admin.app();
}

// Convenience helpers (optional)
export const adminAuth = () => getFirebaseAdminApp().auth();
export const adminDb = () => getFirebaseAdminApp().firestore();

// If you have existing imports expecting default admin, keep this:
export default admin;
