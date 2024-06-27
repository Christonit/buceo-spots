import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAz8btkA8OEb4OiXudeciwdWiwoaihoiQE",
  authDomain: "buceo-thing.firebaseapp.com",
  projectId: "buceo-thing",
  storageBucket: "buceo-thing.appspot.com",
  messagingSenderId: "288689388687",
  appId: "1:288689388687:web:d3b7d16eff7e8e6673c4fa",
  measurementId: "G-YYM0DNW9ZY",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore();

console.log({ app });
const auth = getAuth(app);

export { app, db, auth };
