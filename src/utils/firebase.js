import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-wqWzrTc9QhQ1yMyXHWmGCrqCVed679Q",
  authDomain: "mh-connect-b4a9c.firebaseapp.com",
  projectId: "mh-connect-b4a9c",
  storageBucket: "mh-connect-b4a9c.appspot.com",
  messagingSenderId: "435799975612",
  appId: "1:435799975612:web:4254e6092d188c403152b9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{
  app,
  auth,
  db
}