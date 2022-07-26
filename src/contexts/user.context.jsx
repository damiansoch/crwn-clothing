// useEffect needed for onAuthStateCHanged
import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //onAuthStateCHanged, only run when component mounts, empty []
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);
  //this is an open listener: it always listen for auth to change#
  //so you need to tell it to stop listening whenever component unmounts
  //it return back an unsubscribe function

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
