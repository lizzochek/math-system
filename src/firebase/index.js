import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBXP-I0jcw1gxyUI7sNHHRejC-iqh2Qmao",
    authDomain: "math-system-55907.firebaseapp.com",
    projectId: "math-system-55907",
    storageBucket: "math-system-55907.appspot.com",
    messagingSenderId: "361289639168",
    appId: "1:361289639168:web:f20692dc2733f7739effe5",
    measurementId: "G-9V1KLNF35Y",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
