import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz3fiOvA-Z3FfhaZ8GBXdUY74kLSYfa1Y",
  authDomain: "chatbot-5f9b6.firebaseapp.com",
  projectId: "chatbot-5f9b6",
  storageBucket: "chatbot-5f9b6.appspot.com",
  messagingSenderId: "871505661890",
  appId: "1:871505661890:web:5035d3fb4d9cc3f357905b",
  measurementId: "G-3VRXVPHQ6D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };