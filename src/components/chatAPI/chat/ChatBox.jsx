import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
import { useFetchReceipt } from "../../../hooks/useFetchReceipt";
import { Stack } from "react-bootstrap";

function ChatBox() {
  const { userId } = useAuth();
  const { currentChat, messages, messageLoading } = useChat();
  const { receiptUser } = useFetchReceipt(currentChat, userId);

  if (!receiptUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );

  if (messageLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      ChatBox
    </Stack>
  );
}

export default ChatBox;
