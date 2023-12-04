import { createContext, useState, useEffect, useCallback } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { postRequest } from "../utils/service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  // setUser => accessToken, user: {_id, name, email}
  const [errMsg, setErrMsg] = useState("");

  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (user) => {
    try {
      const result = await postRequest("/login", user);
      setUser(result);
      setToken(result?.accessToken);
      setIsAuthenticate(true);
      localStorage.setItem("token", result?.accessToken);
      localStorage.setItem("user", JSON.stringify(result?.user));
      setErrMsg("");
      navigate("/chat-api");
    } catch (error) {
      setErrMsg(error.response?.data?.message);
    }
  };

  const registerUser = async (user) => {
    try {
      const result = await postRequest("/register", user);
      setUser(result);
      setToken(result?.accessToken);
      setIsAuthenticate(true);
      localStorage.setItem("token", result?.accessToken);
      localStorage.setItem("user", JSON.stringify(result?.user));
      setErrMsg("");
      navigate("/chat-api");
    } catch (error) {
      setErrMsg(error.response.data?.message);
    }
  };

  const logoutUser = useCallback(() => {
    setUser(null);
    setToken("");
    navigate("/login-api");
    localStorage.clear();
  }, []);

  useEffect(() => {
    // const unsub = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setCurrentUser(user);
    //     setIsAuth(true);
    //   }
    // });

    const autoSignIn = () => {
      const tokenJson = localStorage.getItem("token") ?? "";
      const userJson = localStorage.getItem("user") ?? "";
      if (tokenJson && userJson) {
        setToken(JSON.parse(tokenJson));
        setUser(JSON.parse(userJson));
        setIsAuthenticate(true);
      }
    };
    autoSignIn();
    // return () => {
    //   unsub();
    // };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        currentUser,
        user,
        isAuthenticate,
        errMsg,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
