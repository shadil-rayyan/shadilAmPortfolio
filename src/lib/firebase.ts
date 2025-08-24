"use client"
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQl1sz_K0gWhBEopV3AU2RJzHd-09gBZE",
  authDomain: "devfolio-ie7n0.firebaseapp.com",
  projectId: "devfolio-ie7n0",
  storageBucket: "devfolio-ie7n0.appspot.com",
  messagingSenderId: "671611287466",
  appId: "1:671611287466:web:8c29376f4303f221675dd3",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
