import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie";
import useAuth from "../hooks/useAuth";

export default function Auth({ setAuth }) {
  const cookies = new Cookies();
  const { isAuthenticated } = useAuth();

  async function signInGoogle() {
    const res = await signInWithPopup(auth, provider);
    cookies.set("auth-token", res.user.refreshToken);
    setAuth(true);
  }

  return (
    <div className="auth">
      <p>Sign in With Google T Continue with {isAuthenticated} </p>
      <button className="btn btn-primary" onClick={signInGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}
