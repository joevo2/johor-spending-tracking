import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBft9TeGQN0Wh0xd3el0Z4XH7uzidfArE8",
  authDomain: "johor-spending-app.firebaseapp.com",
  databaseURL: "https://johor-spending-app.firebaseio.com",
  projectId: "johor-spending-app",
  storageBucket: "johor-spending-app.appspot.com",
  messagingSenderId: "1082152511010"
};

firebase.initializeApp(config);

const Firebase = firebase

export default Firebase
