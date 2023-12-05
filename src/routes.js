import { ProtectRoute, ProtectRouteAPI } from "./guard/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAPI from "./components/chatAPI/register";
import LoginAPI from "./components/chatAPI/login";
import ChatRoom from "./pages/chatRoom";
import ChatAPI from "./pages/ChatAPI/ChatAPI";

export const routes = [
  {
    path: "",
    element: <Home />,
  },

  {
    path: "/chat-api",
    element: (
      <ProtectRouteAPI>
        <ChatAPI />,
      </ProtectRouteAPI>
    ),
  },

  {
    path: "/chat-room",
    element: (
      <ProtectRoute>
        <ChatRoom />,
      </ProtectRoute>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/login-api",
    element: <LoginAPI />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/register-api",
    element: <RegisterAPI />,
  },
];
