import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getDatabase } from 'firebase/database'
import firebaseConfig from "../firebaseConfig.js";

// FIREBASE SETUP
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const firebaseDb = getDatabase(firebaseApp)

 
export { firebaseAuth, firestore,firebaseDb};