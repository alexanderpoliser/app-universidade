import { initializeApp } from "firebase/app";

require("dotenv").config();

const env = process.env;

if (!env.REACT_APP_API_KEY)
  throw new Error("Não foi encontrada uma API KEY para o firebase");

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,

  authDomain: env.REACT_APP_AUTH_DOMAIN,

  projectId: env.REACT_APP_PROJECT_ID,

  storageBucket: env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,

  appId: env.REACT_APP_APP_ID,

  measurementId: env.REACT_APP_MEASUREMENT_ID,
};

const initializeFirebase = initializeApp(firebaseConfig);
