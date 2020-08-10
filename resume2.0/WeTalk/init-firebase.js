// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCB4bOvmTciqFZXCb1IMtgmkFol2cLJgEk",
  authDomain: "wetalk-1d635.firebaseapp.com",
  databaseURL: "https://wetalk-1d635.firebaseio.com",
  projectId: "wetalk-1d635",
  storageBucket: "wetalk-1d635.appspot.com",
  messagingSenderId: "524339141573",
  appId: "1:524339141573:web:b29c44973e901cb89a89ac",
  measurementId: "G-NV1ZK9CQZB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
