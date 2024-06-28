import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDaAXUYoz_z325RVBEdnzaEV35snMioQ40",
  authDomain: "expansetracker-795b4.firebaseapp.com",
  projectId: "expansetracker-795b4",
  storageBucket: "expansetracker-795b4.appspot.com",
  messagingSenderId: "269645429920",
  appId: "1:269645429920:web:800e75982fc042ee6d9dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)