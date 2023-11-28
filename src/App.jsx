import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./pages/chatRoom";

const ProtectRoute = async ({ children }) => {};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="chat-room" element={<ChatRoom />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
