import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up form.component";

import { useState } from "react";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user /*destructured fromresponce*/ } =
      await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign IN</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>

      <SignUpForm />
    </div>
  );
};
export default SignIn;
