import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCiR66mMQJdBhSsfrSqUIULglfjikglMsk",
    authDomain: "hacktivgram-6b94c.firebaseapp.com",
    databaseURL: "https://hacktivgram-6b94c.firebaseio.com",
    projectId: "hacktivgram-6b94c",
    storageBucket: "hacktivgram-6b94c.appspot.com",
    messagingSenderId: "685596511244",
    appId: "1:685596511244:web:52c44801c78fdd8fb1f229",
    measurementId: "G-F87BQHEWXQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
  //firebase.analytics();

  export  {
    storage, firebase as default
  }