import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import useAuth from "./hooks/useAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoom from "./pages/chatRoom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

const ProtectRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!!currentUser) {
    return children;
  }
  return children;
  // return <Navigate to="/login" />;
};

export default function App() {
  // const context = useContext(AuthContext);
  // console.log(context);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route path="chat-room" element={<ChatRoom />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
