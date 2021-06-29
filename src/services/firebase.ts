import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORANGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  
  apiKey: "AIzaSyA-ZyDmXytimfk2621Xc-fJZJd2_v53DNs",
  authDomain: "nlw-together-38638.firebaseapp.com",
  databaseURL: "https://nlw-together-38638-default-rtdb.firebaseio.com",
  projectId: "nlw-together-38638",
  storageBucket: "nlw-together-38638.appspot.com",
  messagingSenderId: "5344737928",
  appId: "1:5344737928:web:a76f9ed182b3b27f9e3d3d",
  measurementId: "G-FF6C87QZB0"


};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}