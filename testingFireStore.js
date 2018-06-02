const firebase = require('firebase');

require('firebase/firestore');

const fireBaseCredential = require('./fireBaseKeys.json');

firebase.initializeApp(fireBaseCredential);
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();