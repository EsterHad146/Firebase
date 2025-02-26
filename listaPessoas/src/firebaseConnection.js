//npx expo install firebase (Se usar o expo)https://docs.expo.dev/guides/using-firebase/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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
const bd = getStorage(app)
export {bd}
