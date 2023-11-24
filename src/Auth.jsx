import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase-config";
import Cookies from "universal-cookie";

export default function Auth({ setAuth }) {
  const cookies = new Cookies();
  async function signInGoogle() {
    const res = await signInWithPopup(auth, provider);
    cookies.set("auth-token", res.user.refreshToken);
    setAuth(true);
  }

  return (
    <div className="auth">
      <p>Sign in With Google T Continue</p>
      <button className="btn btn-primary" onClick={signInGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}
