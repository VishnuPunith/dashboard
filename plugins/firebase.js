// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyCevm8FXlUYNnwnhb0prG4YQup3mmpw0oo",
//     authDomain: "firestorenotify-18950.firebaseapp.com",
//     projectId: "firestorenotify-18950",
//     storageBucket: "firestorenotify-18950.appspot.com",
//     messagingSenderId: "25988846759",
//     appId: "1:25988846759:web:9fcd13c71d1ebace633782",
//     measurementId: "G-KK5WHM59DH"
//   };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// auth.languageCode = 'en';
// const provider = new GoogleAuthProvider();

// export { auth, provider };


// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD8y84n0QcBffWi45YmvE3EmR5tpyfb-xs',
  authDomain: 'vlearning-e7dae.firebaseapp.com',
  databaseURL: 'https://sign-11111.firebaseio.com',
  projectId: 'vlearning-e7dae',
  storageBucket: 'vlearning-e7dae.appspot.com',
  messagingSenderId: '528784283470',
  appId: '1:528784283470:web:3b828000ed2d01749af01f',
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


export { firestore, auth };  // Export the getFirestore function directly
