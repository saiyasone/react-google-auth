import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7slYP8qHURsTl9MZoraeJcOxgF9_yX4M",
  authDomain: "react-tutorial-67de5.firebaseapp.com",
  databaseURL:
    "https://react-tutorial-67de5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-tutorial-67de5",
  storageBucket: "react-tutorial-67de5.appspot.com",
  messagingSenderId: "793739793565",
  appId: "1:793739793565:web:33a137bf135b8a939ff074",
  measurementId: "G-BGRTWTT5H9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const dbFire = getFirestore();