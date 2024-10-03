// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqOu4rm47AkP0rs0AtDTOwhW4qw13JI8s",
  authDomain: "ewits-storage.firebaseapp.com",
  projectId: "ewits-storage",
  storageBucket: "ewits-storage.appspot.com",
  messagingSenderId: "829716601623",
  appId: "1:829716601623:web:c57122a5c083dbe695b552",
  measurementId: "G-BRT9KSR9K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage, app }