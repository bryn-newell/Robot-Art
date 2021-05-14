// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC15CaKzudOi-4BPR5IqQP43XF-PLZ0i7k',
  authDomain: 'robot-art.firebaseapp.com',
  projectId: 'robot-art',
  storageBucket: 'robot-art.appspot.com',
  messagingSenderId: '713689526284',
  appId: '1:713689526284:web:3549eff6daba88273b7e29',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const fbStorage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

// collection references
const usersCollection = db.collection('users');
const robotsCollection = db.collection('robots');

// export utils/refs
export {
  db,
  auth,
  fbStorage,
  provider,
  usersCollection,
  robotsCollection,
};
