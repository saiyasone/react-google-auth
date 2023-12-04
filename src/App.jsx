import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAPI from "./components/chatAPI/register";
import LoginAPI from "./components/chatAPI/login";
import ChatRoom from "./pages/chatRoom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ChatAPI from "./pages/ChatAPI/ChatAPI";
import { ChatProvider } from "./context/ChatContext";

import { ProtectRouteAPI } from "./guard/Auth";
import useAuth from "./hooks/useAuth";

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
  const { user } = useAuth();
  return (
    <ChatProvider user={user}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route
          path="chat-api"
          element={
            <ProtectRouteAPI>
              <ChatAPI />
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
    </ChatProvider>
  );
}
