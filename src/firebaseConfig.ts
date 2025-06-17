// filepath: src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWJYpjWEUZ_WqVrrDJr1o8fy_BooattFA",
  authDomain: "study-catcher.firebaseapp.com",
  projectId: "study-catcher",
  storageBucket: "study-catcher.firebasestorage.app",
  messagingSenderId: "807282374879",
  appId: "1:807282374879:web:44174cfc3cdbf36c2a916a",
  measurementId: "G-HEY91M633Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };