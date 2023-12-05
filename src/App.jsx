import { useRoutes } from "react-router";

import { ChatProvider } from "./context/ChatContext";

import useAuth from "./hooks/useAuth";
import { routes } from "./routes";

export default function App() {
  const routeCotent = useRoutes(routes);
  const { user, userId } = useAuth();
  return (
    <ChatProvider user={user} userId={userId}>
      {routeCotent}
    </ChatProvider>
  );
}
