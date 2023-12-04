import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("ChatContext must be place withing Provider");

  return context;
};
