import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBgJdHIUwBZGHCrXaB6lYonIGHpK20Fr4A',
  authDomain: 'todo-15c15.firebaseapp.com',
  projectId: 'todo-15c15',
  storageBucket: 'todo-15c15.appspot.com',
  messagingSenderId: '54589800411',
  appId: '1:54589800411:web:4177eb6cf377274f3ff1fe',
  measurementId: 'G-46762TG58V',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
