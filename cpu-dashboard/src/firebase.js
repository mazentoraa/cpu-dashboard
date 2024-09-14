// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
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

const firebaseConfigPublic = {
  apiKey: "AIzaSyAtK-v5vGTaBJuyX6S9naQ-v9DuT-wEvGY",
  authDomain: "cpu-dashboard.firebaseapp.com",
  databaseURL: "https://cpu-dashboard-default-rtdb.firebaseio.com",
  projectId: "cpu-dashboard",
  storageBucket: "cpu-dashboard.appspot.com",
  messagingSenderId: "148599994561",
  appId: "1:148599994561:web:78da6c121df33784047c40"
};
  
// Function to initialize Firebase App safely
function initializeFirebaseApp(config, name) {
  // Check if the app with this name already exists
  if (!getApps().some(app => app.name === name)) {
    return initializeApp(config, name);
  } else {
    return getApp(name); // Return the already initialized app
  }
}

const app = initializeFirebaseApp(firebaseConfig, "app");
const appPublic = initializeFirebaseApp(firebaseConfigPublic, "appPublic");
const databaseSenior = getDatabase(app);
const databasePublic = getDatabase(appPublic);

export { databaseSenior, databasePublic };
