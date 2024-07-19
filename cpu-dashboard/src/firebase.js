// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyChZQsRl7EHK_BZLGJXJhOBxXle-lzu2v0",
    authDomain: "cpu-dashboard-9ddb7.firebaseapp.com",
    databaseURL: "https://cpu-dashboard-9ddb7-default-rtdb.firebaseio.com/",
    projectId: "cpu-dashboard-9ddb7",
    storageBucket: "cpu-dashboard-9ddb7.appspot.com",
    messagingSenderId: "147174268783",
    appId: "1:147174268783:web:9f813b3418413dfc53129a"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
