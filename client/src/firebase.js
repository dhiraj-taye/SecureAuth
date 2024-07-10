// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9fb37.firebaseapp.com",
  projectId: "mern-auth-9fb37",
  storageBucket: "mern-auth-9fb37.appspot.com",
  messagingSenderId: "288083019597",
  appId: "1:288083019597:web:3af2763dc89ceaf2655904"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);