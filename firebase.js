// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTrJP-EC8LGviGlzbXWOTsMXxZk4B1wCc",
  authDomain: "inventory-tracker-app-220.firebaseapp.com",
  projectId: "inventory-tracker-app-220",
  storageBucket: "inventory-tracker-app-220.appspot.com",
  messagingSenderId: "359243982620",
  appId: "1:359243982620:web:fe19d51a103e0fb32ebcd9",
  measurementId: "G-DBXK7RRPJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export { firestore }