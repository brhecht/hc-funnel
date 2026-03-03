import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

/**
 * Save a new lead to Firestore. Returns the document ID.
 */
export async function saveLead(data) {
  const docRef = await addDoc(collection(db, "leads"), {
    ...data,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

/**
 * Update an existing lead (e.g., add deep dive answers or waitlist flag).
 */
export async function updateLead(docId, data) {
  await updateDoc(doc(db, "leads", docId), {
    ...data,
    updatedAt: new Date().toISOString(),
  })
}
