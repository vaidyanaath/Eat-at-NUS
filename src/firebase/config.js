import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8vqpDJDN25sYDAYbg6BgzGJr5kaWTgOg",
    authDomain: "eat-at-nus.firebaseapp.com",
    databaseURL: "https://eat-at-nus-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eat-at-nus",
    storageBucket: "eat-at-nus.appspot.com",
    messagingSenderId: "995649684976",
    appId: "1:995649684976:web:7cc0c479843ef76e990935",
    measurementId: "G-MDH1QNYS7W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);