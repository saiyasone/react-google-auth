import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const SIGN_IN = "signIn";

const AuthContext = createContext(null);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      break;

    default:
      break;
  }
};

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuth(true);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
