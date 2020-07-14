import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBEh7I5rNZcWGPBr7p6qn2QDQOfRkFF8FQ",
  authDomain: "react-firebase-auth-a26ad.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-a26ad.firebaseio.com",
  projectId: "react-firebase-auth-a26ad",
  storageBucket: "react-firebase-auth-a26ad.appspot.com",
  messagingSenderId: "640299685332",
  appId: "1:640299685332:web:f21c545831c999dd5e3241",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
