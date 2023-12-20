import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBzyNF5U8MF_0nTEuCRKwcS3H077fdGIdU",
    authDomain: "resumebuilder-93c12.firebaseapp.com",
    projectId: "resumebuilder-93c12",
    storageBucket: "resumebuilder-93c12.appspot.com",
    messagingSenderId: "489041093785",
    appId: "1:489041093785:web:b1112dc32e5ba376014408",
    measurementId: "G-LNTE0631VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);