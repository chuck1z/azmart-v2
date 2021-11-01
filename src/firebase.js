import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDYIgATNMNIUWjCHwfwYdRIqVXtUZvjD-g",
  authDomain: "azmart-203e3.firebaseapp.com",
  databaseURL:
    "https://azmart-203e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "azmart-203e3",
  storageBucket: "azmart-203e3.appspot.com",
  messagingSenderId: "73793091326",
  appId: "1:73793091326:web:fec98af4646088f8e3d7af",
  measurementId: "G-RTMKY7JF4M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
