// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu-2IWsbpA57YZUP0k325Xo22nBs19b_g",
  authDomain: "reserva-sala-mata62.firebaseapp.com",
  projectId: "reserva-sala-mata62",
  storageBucket: "reserva-sala-mata62.appspot.com",
  messagingSenderId: "343547436912",
  appId: "1:343547436912:web:5a4cfc1ecb0c071b43f9b5"
};

// Initialize Firebase

export const initFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(initFirebase);
export const googleProvider = new GoogleAuthProvider();
