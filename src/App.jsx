import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAPI from "./components/chatAPI/register";
import LoginAPI from "./components/chatAPI/login";
import ChatRoom from "./pages/chatRoom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import ChatAPI from "./pages/ChatAPI";
import useAuth from "./hooks/useAuth";
import { ChatContext, ChatProvider } from "./context/ChatContext";

const ProtectRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  if (!!currentUser) {
    return children;
  }
  return children;
  // return <Navigate to="/login" />;
};

export default function App() {
  const navigate = useNavigate();
  const {} = useContext(AuthContext);

  const ProtectRouteAPI = ({ children }) => {
    const { isAuthenticate } = useAuth();
    if (!isAuthenticate) {
      return navigate("/login-api");
    }
    return children;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Home />} />
        <Route
          path="chat-api"
          element={
            <ProtectRouteAPI>
              {/* <ChatProvider> */}
              <ChatAPI />
              {/* </ChatProvider> */}
            </ProtectRouteAPI>
          }
        />
        <Route
          path="chat-room"
          element={
            <ProtectRoute>
              <ChatRoom />
            </ProtectRoute>
          }
        />
        <Route path="login-api" element={<LoginAPI />} />
        <Route path="register-api" element={<RegisterAPI />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}
