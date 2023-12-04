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
        if (user?._id) {
          const response = await getRequest(`/chat/${user?.id}`);

          setUserChats(response);
          setUserLoading(false);
        }
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
