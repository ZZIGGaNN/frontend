// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Ваши настройки Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfWoWEsQVh5Fo8Bny7ejV0j-pflVw5ugI",
    authDomain: "buildingcare-test.firebaseapp.com",
    databaseURL: "https://buildingcare-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "buildingcare-test",
    storageBucket: "buildingcare-test.appspot.com",
    messagingSenderId: "127437707286",
    appId: "1:127437707286:web:d09e0163ff6c2a027f3d37",
    measurementId: "G-EMS226WSRE"
  };

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
