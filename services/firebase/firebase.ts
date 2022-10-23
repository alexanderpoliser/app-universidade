import { initializeApp } from "firebase/app";
 // Your web app's Firebase configuration

import { getFirestore } from "firebase/firestore";


require("dotenv").config();

const env = process.env;


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw97Wm6xXofNnsgk_JPpBf1d6oMtUTu68",
  authDomain: "appuniversidade-a14c3.firebaseapp.com",
  projectId: "appuniversidade-a14c3",
  storageBucket: "appuniversidade-a14c3.appspot.com",
  messagingSenderId: "683827131889",
  appId: "1:683827131889:web:608584b5cc15aa99108050",
  measurementId: "G-Y1DS4D4S8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
export default db;
