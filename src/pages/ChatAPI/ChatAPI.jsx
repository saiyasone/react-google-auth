import { Container, Stack } from "react-bootstrap";
import Header from "../../components/header";
import useAuth from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import UserChat from "../../components/chatAPI/chat/UserChat";
import PotentialChats from "../../components/chatAPI/chat/PotentialChats";
import "./style.css";
import ChatBox from "../../components/chatAPI/chat/ChatBox";

export default function ChatAPI() {
  const { userId } = useAuth();
  const { userChats, userLoading, updateCurrentChat } = useChat();
  return (
    <>
      <Header />
      <Container className="mt-3">
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3">
              {userLoading && <p>Loading...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} userId={userId}></UserChat>
                  </div>
                );
              })}
            </Stack>
            <ChatBox />
          </Stack>
        )}
      </Container>
    </>
  );
}
