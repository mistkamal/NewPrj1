// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
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