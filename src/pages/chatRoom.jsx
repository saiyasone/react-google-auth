import SideBar from "../components/chatRoom/sideBar";
import Chat from "../components/chatRoom/chat";

export default function ChatRoom() {
  return (
    <div className="home">
      <div className="container-info">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}
