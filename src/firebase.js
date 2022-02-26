import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBk8EQBlCRSOl80zT_o9QyoufD0dLDtN5o",
  authDomain: "chatapp-46938.firebaseapp.com",
  projectId: "chatapp-46938",
  storageBucket: "chatapp-46938.appspot.com",
  messagingSenderId: "787313131978",
  appId: "1:787313131978:web:8d68ed33cf73373bed4f33"
}).auth();
