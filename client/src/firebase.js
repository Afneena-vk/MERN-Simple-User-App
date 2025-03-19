// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-895eb.firebaseapp.com",
  projectId: "mern-auth-895eb",
  storageBucket: "mern-auth-895eb.firebasestorage.app",
  messagingSenderId: "926433164387",
  appId: "1:926433164387:web:575fb7621a43e0078a4c56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);