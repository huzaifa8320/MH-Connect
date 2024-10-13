import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAVymLX3z2GYj_ZISLKxjUmF_jPFeqecdw",
  authDomain: "react-projects-9240a.firebaseapp.com",
  projectId: "react-projects-9240a",
  storageBucket: "react-projects-9240a.appspot.com",
  messagingSenderId: "944739034295",
  appId: "1:944739034295:web:e6d7eb4ce895e658e31932",
  measurementId: "G-GJMM7HL25D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);