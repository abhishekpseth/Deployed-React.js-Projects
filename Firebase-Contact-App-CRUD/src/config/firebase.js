// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCukl9oAKxgWNF3hD3uvad6oJ9Qj4mpZWg",
  authDomain: "vite-contact-2d4cb.firebaseapp.com",
  projectId: "vite-contact-2d4cb",
  storageBucket: "vite-contact-2d4cb.appspot.com",
  messagingSenderId: "937849175825",
  appId: "1:937849175825:web:06fd98c6fd52a318e596b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
