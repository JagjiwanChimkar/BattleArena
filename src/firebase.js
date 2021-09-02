import  firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDxECYxA07N_7tsoKQYvhl1tCKWt8dOeKo",
    authDomain: "homdeep-f855d.firebaseapp.com",
    projectId: "homdeep-f855d",
    storageBucket: "homdeep-f855d.appspot.com",
    messagingSenderId: "213945235580",
    appId: "1:213945235580:web:6d5dbcc1c2575cde8d31f9",
    measurementId: "G-8B6MTYN5JQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.default.auth();

export { db, auth };