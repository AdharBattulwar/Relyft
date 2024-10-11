import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "../ForgotPass/firebaseConfig";

const provider = new OAuthProvider('apple.com');

signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // Apple credential
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    const idToken = credential?.idToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...

    console.log({ user: user, credential: credential, accessToken: accessToken, idToken: idToken });
    return { user: user, credential: credential, accessToken: accessToken, idToken: idToken };
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The credential that was used.
    const credential = OAuthProvider.credentialFromError(error);

    // ...

    console.log({ errorCode: errorCode, errorMessage: errorMessage, email: email, credential: credential });
    return { errorCode: errorCode, errorMessage: errorMessage, email: email, credential: credential };
  });