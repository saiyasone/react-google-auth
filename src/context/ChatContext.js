import { createContext, useCallback, useEffect, useId, useState } from "react";
import { getRequest, postRequest } from "../utils/service";

const ChatContext = createContext();

const ChatProvider = ({ children, user, userId }) => {
  const [userChats, setUserChats] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getRequest(`/get-users`);
      const pChats = res?.filter((u) => {
        let isChatCreated = false;

        if (userId === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        setUserLoading(true);
        if (userId) {
          const response = await getRequest(`/chat/${userId}`);
          setUserChats(response);
        }
        setUserLoading(false);
      } catch (error) {
        setUserLoading(false);
        setUserError(error);
      }
    };
    getUserChats();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setMessageLoading(true);
        const res = await getRequest(`/get-messages/${currentChat?._id}`);
        setMessageLoading(false);
        setMessages(res);
      } catch (error) {
        setMessageLoading(false);
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postRequest(`/create-chat`, {
        firstId,
        secondId,
      });
      setUserChats((prev) => [...prev, response]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        userLoading,
        userError,
        messages,
        messageLoading,
        potentialChats,
        createChat,
        updateCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
