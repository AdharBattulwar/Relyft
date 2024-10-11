import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../ForgotPass/firebaseConfig";

const provider = new GithubAuthProvider();

const githubAuth = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log({object: { token: token, user: user, credential: credential }});
    return { token: token, user: user, credential: credential };
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
    console.log({ errorCode: errorCode, errorMessage: errorMessage, email: email, credential: credential });
    return { errorCode: errorCode, errorMessage: errorMessage, email: email, credential: credential };
  });
}

export default githubAuth;