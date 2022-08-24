// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAohTrVlqyb8784ip1d1PT-_-vVngdPPsU",
  authDomain: "video-bba7c.firebaseapp.com",
  projectId: "video-bba7c",
  storageBucket: "video-bba7c.appspot.com",
  messagingSenderId: "117695607950",
  appId: "1:117695607950:web:8f8e4e52595bbff93c45df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export default app;