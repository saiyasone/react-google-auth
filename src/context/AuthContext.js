import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useCallback } from "react";
import { postRequest } from "../utils/service";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  // setUser => accessToken, user: {_id, name, email}
  const [errMsg, setErrMsg] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (user) => {
    try {
      const result = await postRequest("/login", user);
      setUser(result);
      setToken(result?.accessToken);
      setIsAuthenticate(true);
      localStorage.setItem("token", result?.accessToken);
      localStorage.setItem("userId", result?.user?._id);
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
      localStorage.setItem("user", result?.user);
      localStorage.setItem("userId", result?.user?._id);
      setErrMsg("");
      navigate("/chat-api");
    } catch (error) {
      setErrMsg(error.response.data?.message);
    }
  };

  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    navigate("/login-api");
  };

  useEffect(() => {
    // const unsub = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setCurrentUser(user);
    //     setIsAuth(true);
    //   }
    // });

    const autoSignIn = () => {
      let tokenJson = window.localStorage.getItem("token");
      let userId = window.localStorage.getItem("userId");
      let userJson = window.localStorage.getItem("user");
      if (tokenJson && userJson) {
        setIsAuthenticate(true);
        setToken(tokenJson);
        setUser(userJson);
        setUserId(userId);
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
        currentUser,
        user,
        isAuthenticate,
        token,
        errMsg,
        userId,
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
