import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2Mmu7ppSqOTT-MkKnGLnb07kQmsM_HT4",
  authDomain: "appweather-d0be8.firebaseapp.com",
  projectId: "appweather-d0be8",
  storageBucket: "appweather-d0be8.appspot.com",
  messagingSenderId: "1020863117148",
  appId: "1:1020863117148:web:c52bb40a31e928f6047399",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
