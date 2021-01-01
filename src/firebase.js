import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'

import 'firebase/firestore'
const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  apiKey: "AIzaSyBoyUHgvRYSRpcANdN3hVUM2AsDKOB58IU",
  authDomain: "isomorphic-dadb8.firebaseapp.com",
  databaseURL: "https://isomorphic-dadb8.firebaseio.com",
  projectId: "isomorphic-dadb8",
  storageBucket: "isomorphic-dadb8.appspot.com",
  messagingSenderId: "320675121395",
  appId: "1:320675121395:web:75a095eb7e53f73eeccf86",
  measurementId: "G-H9LMPGFTZ8"
})

export const auth = app.auth()
export const storage = app.storage()

export const firestore = app.firestore()
export default app
// console.log(auth, "auth");
// console.log(storage, "sto");

