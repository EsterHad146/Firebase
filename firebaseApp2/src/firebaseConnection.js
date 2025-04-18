// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlUppwzwkI_0zC5opnIA9xXWYKLaCl7iY",
  authDomain: "tii04-140c6.firebaseapp.com",
  projectId: "tii04-140c6",
  storageBucket: "tii04-140c6.firebasestorage.app",
  messagingSenderId: "568648488838",
  appId: "1:568648488838:web:0a54abaa4c2957e459fe07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(db)
const auth = getAuth(app)
export {db, auth}