// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCfT43K8Z1n1TDTEi0DNwxkWocog8M51qM",
  authDomain: "password-data-c2835.firebaseapp.com",
  projectId: "password-data-c2835",
  storageBucket: "password-data-c2835.appspot.com",
  messagingSenderId: "62360160184",
  appId: "1:62360160184:web:881f06923766ac3096b14d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);