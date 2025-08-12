import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIESNTveu9LXNEFmqOqPUalbNfFuUDnIA",
  authDomain: "english-speaking-friend.firebaseapp.com",
  projectId: "english-speaking-friend",
  storageBucket: "english-speaking-friend.firebasestorage.app",
  messagingSenderId: "586741332889",
  appId: "1:586741332889:web:8373691dc869de57bc7108",
  measurementId: "G-85Z2V9S8SD"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const googleprovider =new GoogleAuthProvider()
