import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMZXzb0vl37s9_m1xqBudlLhVm4k6pYGw",
  authDomain: "e-learn-app-53b7a.firebaseapp.com",
  projectId: "e-learn-app-53b7a",
  storageBucket: "e-learn-app-53b7a.appspot.com",
  messagingSenderId: "186564348808",
  appId: "1:186564348808:web:ca7f2c8c48b86bf7c8483d",
  measurementId: "G-F2KJBWN143"
};
const firebase_app = initializeApp(firebaseConfig);

const firebase_db = getFirestore(firebase_app);

const firebase_storage = getStorage(firebase_app); 

const firebase_auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firebase_app, firebase_auth, firebase_db, firebase_storage };
