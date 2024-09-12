// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCscSSo3ssFpJSUPYo1cplb-YDgWjQFqt8",
  authDomain: "react-apple-tv-ed5af.firebaseapp.com",
  projectId: "react-apple-tv-ed5af",
  storageBucket: "react-apple-tv-ed5af.appspot.com",
  messagingSenderId: "328492541779",
  appId: "1:328492541779:web:eb1f597da06364b1c363a6",
  measurementId: "G-NWRY58QRT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;