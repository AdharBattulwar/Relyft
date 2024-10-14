import { auth } from "../ForgotPass/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();

const googleAuth = async () => {
  return signInWithPopup(auth, provider)
};

export default googleAuth;
