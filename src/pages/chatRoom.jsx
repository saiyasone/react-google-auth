import SideBar from "../components/chatRoom/SideBar";
import Chat from "../components/chatRoom/chat";
import "../css/chatRoom.css"

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
