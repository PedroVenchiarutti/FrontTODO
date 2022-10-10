import axios from "axios";
import firebase from "firebase";
import "firebase/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STOREGA_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SERENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseDB = firebase.auth();
