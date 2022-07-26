import { initializeApp } from "firebase/app";
//-----------authorisation
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, // this is for eamil and password uth only
  signInWithEmailAndPassword, // this is for eamil and password uth only
  signOut,
} from "firebase/auth";
//-------------setting up users
import {
  getFirestore,
  doc, //getting docs
  getDoc, //accessing docs
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3fhuX5px7HePm7pcRBeN4h-kA6EFcPLg",
  authDomain: "crwn-project-db-6f037.firebaseapp.com",
  projectId: "crwn-project-db-6f037",
  storageBucket: "crwn-project-db-6f037.appspot.com",
  messagingSenderId: "194987326032",
  appId: "1:194987326032:web:d3c8b2996f18450d3c6f55",
};

// Initialize Firebase
const firabaseApp = initializeApp(firebaseConfig);

//--------------authorisation

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//--------------setting up users

const db = getFirestore(); //this directly points to the database

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //checking if doc exist
  const userDocRef = doc(db, "users", userAuth.uid); //db, what are we storing(collection), and uid from the ruthentication responce

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist, we want to create it
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date(); // so we know when they are signing in

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, //if previously  display name wasnt provided, it will be added now
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if it exist

  return userDocRef;
};

// this is for email and password auth only, no provider

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
