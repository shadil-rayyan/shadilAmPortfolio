import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccountKey = process.env.FIREBASE_ADMIN_SDK_KEY;

if (serviceAccountKey && !admin.apps.length) {
  const serviceAccount = JSON.parse(serviceAccountKey);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminFirestore = admin.apps.length ? admin.firestore() : null;
