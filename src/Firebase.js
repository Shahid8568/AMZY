import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQGW-7YYROnRmVeb__fwbIOsapQJ5t3Cg",
  authDomain: "amzy-4be53.firebaseapp.com",
  projectId: "amzy-4be53",
  storageBucket: "amzy-4be53.appspot.com",
  messagingSenderId: "404935944987",
  appId: "1:404935944987:web:1b60443d9438b9d32a81be",
  measurementId: "G-W0SRMWSPQ6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(app)

// try to add analytics
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, db, analytics }