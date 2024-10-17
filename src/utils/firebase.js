import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1_qJP7zdG48p30MifonTDb6WdID7ERMU",
  authDomain: "mh-connect-5ac30.firebaseapp.com",
  projectId: "mh-connect-5ac30",
  storageBucket: "mh-connect-5ac30.appspot.com",
  messagingSenderId: "341857611870",
  appId: "1:341857611870:web:c671b668fc1af5261cc4cf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{
  app,
  auth,
  db
}