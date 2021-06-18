import firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAsoM4fk7DqN4Zdkagjfhr2BKT2meXU1UQ",
    authDomain: "ideal-shere.firebaseapp.com",
    projectId: "ideal-shere",
    storageBucket: "ideal-shere.appspot.com",
    messagingSenderId: "1002295757034",
    appId: "1:1002295757034:web:2eced3f232fcd4f3136f93",
    databaseURL: "https://ideal-shere-default-rtdb.firebaseio.com/",
    measurementId: "G-CZKK6LCKCB"
};
// Initialize Firebase
const firebase_api = firebase.initializeApp(firebaseConfig);
export default firebase_api;
