


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-state-40a4f.firebaseapp.com",
  projectId: "mern-state-40a4f",
  storageBucket: "mern-state-40a4f.appspot.com",
  messagingSenderId: "798614973604",
  appId: "1:798614973604:web:308a1c41e64af4f9d0ca31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);