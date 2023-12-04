import { Container, Stack } from "react-bootstrap";
import Header from "../../components/header";
import useAuth from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import UserChat from "../../components/chatAPI/chat/UserChat";

export default function ChatAPI() {
  const { user } = useAuth();
  const { userChats, userLoading, userError } = useChat();
  return (
    <>
      <Header />
      <Container className="mt-3">
        <h2>ChatAPI</h2>
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3">
              {userLoading && <p>Loading...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <UserChat key={index} chat={chat} user={user}></UserChat>
                );
              })}
            </Stack>
            <p>ChatBox</p>
          </Stack>
        )}
      </Container>
    </>
  );
}
