import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext is not provided");

  return context;
};
