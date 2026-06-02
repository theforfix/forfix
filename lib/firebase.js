import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKFZo3GWh-qh9qMnWlWws7zOxPMHDuG3U",
  authDomain: "the-forfix-project.firebaseapp.com",
  projectId: "the-forfix-project",
  storageBucket: "the-forfix-project.appspot.com",
  messagingSenderId: "294753411250",
  appId: "1:294753411250:web:c8be49fea374485296e9ab",
  measurementId: "G-QZ0441Q6KT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);