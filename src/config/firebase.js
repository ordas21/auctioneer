import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Use your own configs!
const app = firebase.initializeApp({
  apiKey: "AIzaSyDxQwtTBvwc98loi5LlBBDIL34iiSOL10E",
  authDomain: "lex-c62a6.firebaseapp.com",
  projectId: "lex-c62a6",
  storageBucket: "lex-c62a6.appspot.com",
  messagingSenderId: "821876437446",
  appId: "1:821876437446:web:e4916d55c3f682a365c2c7",
  measurementId: "G-5BK9HSMSEY"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();
