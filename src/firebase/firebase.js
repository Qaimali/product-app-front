import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyDv5pHMEuGkaulOFX-9yEzPSGmfp8TW_dg",
  authDomain: "product-app-image-upload.firebaseapp.com",
  databaseURL: "https://product-app-image-upload.firebaseio.com",
  projectId: "product-app-image-upload",
  storageBucket: "product-app-image-upload.appspot.com",
  messagingSenderId: "1061301232271",
  appId: "1:1061301232271:web:8284c52bdd0285cc1cc6fa",
  measurementId: "G-4Q29T144CZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
