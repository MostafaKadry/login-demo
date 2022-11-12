import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "firebase/auth";
// import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDg7hTWE0CLIvA4i0hKSGIeRHkhWVzD_Zw",
  authDomain: "login-demo-7e4eb.firebaseapp.com",
  projectId: "login-demo-7e4eb",
  storageBucket: "login-demo-7e4eb.appspot.com",
  messagingSenderId: "608222895408",
  appId: "1:608222895408:web:f6d5977e45a2eebc3cfcf5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
