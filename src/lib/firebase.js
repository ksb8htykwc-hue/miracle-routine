import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager, doc } from 'firebase/firestore'

// Ces valeurs identifient le projet Firebase mais ne sont pas secrètes : la clé
// API web Firebase est conçue pour être visible côté client (la sécurité réelle
// vient des règles Firestore et de l'authentification). Elles sont donc gardées
// ici en repli pour que le build GitHub Actions fonctionne sans configuration
// de secrets, tout en restant surchargeables via .env en local.
const FALLBACK_CONFIG = {
  apiKey: 'AIzaSyDA4sMVcGzfOQ0b89fmIMe7Mtg6V9dKinM',
  authDomain: 'miracle-routine-930d3.firebaseapp.com',
  projectId: 'miracle-routine-930d3',
  storageBucket: 'miracle-routine-930d3.firebasestorage.app',
  messagingSenderId: '506729230401',
  appId: '1:506729230401:web:c3214a76f47751687396c0',
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || FALLBACK_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || FALLBACK_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || FALLBACK_CONFIG.appId,
}

export const firebaseEnabled = Boolean(firebaseConfig.apiKey)

export const app = firebaseEnabled ? initializeApp(firebaseConfig) : null
export const auth = firebaseEnabled ? getAuth(app) : null

// Cache locale persistante : lecture/écriture hors ligne, synchro différée à la reconnexion.
export const db = firebaseEnabled
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentSingleTabManager({}) }),
    })
  : null

export function appStateDocRef(uid) {
  return doc(db, 'users', uid, 'appData', 'state')
}
