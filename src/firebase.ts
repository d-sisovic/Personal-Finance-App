import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPKBrPeWGp-F5zL8DkIZx1e30Osbt4pMs',
  authDomain: 'personal-finance-app-69ddf.firebaseapp.com',
  projectId: 'personal-finance-app-69ddf',
  storageBucket: 'personal-finance-app-69ddf.firebasestorage.app',
  messagingSenderId: '923030838354',
  appId: '1:923030838354:web:2dad95913d431fb850138b',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
