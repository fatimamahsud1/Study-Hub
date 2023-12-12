// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth} from 'firebase/auth'

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCkZOh_tPwLbF3kI99jxgPIpOGrpHm1VI4",
//   authDomain: "study-hub-fad47.firebaseapp.com",
//   projectId: "study-hub-fad47",
//   storageBucket: "study-hub-fad47.appspot.com",
//   messagingSenderId: "1045597541780",
//   appId: "1:1045597541780:web:dcf0cfb1ca1c694357eb81",
//   measurementId: "G-NZ664CS44G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = firebase.auth();



import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   getDoc,
//   doc,
//   query,
//   where,
//   orderBy,
//   limit,
//   updateDoc,
// } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkZOh_tPwLbF3kI99jxgPIpOGrpHm1VI4",
  authDomain: "study-hub-fad47.firebaseapp.com",
  projectId: "study-hub-fad47",
  storageBucket: "study-hub-fad47.appspot.com",
  messagingSenderId: "1045597541780",
  appId: "1:1045597541780:web:dcf0cfb1ca1c694357eb81",
  measurementId: "G-NZ664CS44G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
export const auth = getAuth(app);
// export {
//   app,
//   db,
//   storage,
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   getDoc,
//   query,
//   where,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   orderBy,
//   limit,
//   updateDoc,
// };