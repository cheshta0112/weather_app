import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAnKJKqchq4Kk6wSsCFmEnk_eBx1p1Hgw",
  authDomain: "weather-app-2c647.firebaseapp.com",
  projectId: "weather-app-2c647",
  storageBucket: "weather-app-2c647.appspot.com",
  messagingSenderId: "427063323940",
  appId: "1:427063323940:web:4350be6a830e4e866197b1",
  measurementId: "G-FDB42MXM07",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
