import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authentication-86177.firebaseapp.com",
  projectId: "mern-authentication-86177",
  storageBucket: "mern-authentication-86177.appspot.com",
  messagingSenderId: "601689106875",
  appId: "1:601689106875:web:2759913bd9b40569a1bc9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
