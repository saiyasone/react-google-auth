import { createContext } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const SIGN_IN = "signIn";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      break;

    default:
      break;
  }
};

const AuthProvider = ({ children }) => {
  const isAuthenticated = "auth-token";
  const counter = 0;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        counter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
