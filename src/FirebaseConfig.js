// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuXWXtI2U_aNKdI1OM9TSW6IdBAdfyXxI",
  authDomain: "chatapp-007-688c8.firebaseapp.com",
  databaseURL: "https://chatapp-007-688c8.firebaseio.com",
  projectId: "chatapp-007-688c8",
  storageBucket: "chatapp-007-688c8.appspot.com",
  messagingSenderId: "606557043257",
  appId: "1:606557043257:web:dafef2be21f1c80d83ebe8",
  measurementId: "G-ZNVQGKG3NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore();