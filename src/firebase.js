import React from "react";
import firebase from 'firebase';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAtoObWfNz-tWgHfWML8qC754zPQC3AI60",
    authDomain: "auto-fianance.firebaseapp.com",
    projectId: "auto-fianance",
    storageBucket: "auto-fianance.appspot.com",
    messagingSenderId: "194142126267",
    appId: "1:194142126267:web:4be1151be43157d4eca99e",
    measurementId: "G-MQ0C34F6ED"

  };

const app = initializeApp(firebaseConfig);


var storage = firebase.storage();
export default storage;