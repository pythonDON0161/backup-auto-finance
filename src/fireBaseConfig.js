import firebase from "firebase/app";
import "firebase/storage";
 
// Initialize Firebase
const firebaseConfig =  ({
    apiKey: "AIzaSyAtoObWfNz-tWgHfWML8qC754zPQC3AI60",
    authDomain: "auto-fianance.firebaseapp.com",
    projectId: "auto-fianance",
    storageBucket: "auto-fianance.appspot.com",
    messagingSenderId: "194142126267",
    appId: "1:194142126267:web:4be1151be43157d4eca99e",
    measurementId: "G-MQ0C34F6ED"
});
 

firebase.initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage().ref();

export default storage;