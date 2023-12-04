import { createContext, useEffect, useState } from "react";
import { getRequest } from "../utils/service";

const ChatContext = createContext();

const ChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        setUserLoading(true);
        const userJson = JSON.parse(user);
        if (userJson._id) {
          const response = await getRequest(`/chat/${userJson?.id}`);
          setUserChats(response);
        }
        setUserLoading(false);
      } catch (error) {
        setUserLoading(false);
        setUserError(error);
      }
    };
    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider value={{ userChats, userLoading, userError }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
