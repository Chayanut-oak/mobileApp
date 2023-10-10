// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore" 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzMh91LjVspPJwKjmtEH8kSaW3j6g6okw",
  authDomain: "wongnok-aaa51.firebaseapp.com",
  projectId: "wongnok-aaa51",
  storageBucket: "wongnok-aaa51.appspot.com",
  messagingSenderId: "400008242642",
  appId: "1:400008242642:web:e1df9d5137e744fbf5140b",
  measurementId: "G-H83E9P07YJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIRE_STORAGE = getStorage(app)
export const FIREBASE_AUTH = getAuth(app);
export const FIRE_STORE = getFirestore(app)