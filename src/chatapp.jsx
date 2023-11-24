import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, dbFire } from "./firebase-config";
import "./chat.css";

export default function ChatApp(props) {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(dbFire, "message");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", props?.room));
    const unsubscrbe = onSnapshot(queryMessage, (snap) => {
      let messages = [];
      snap.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscrbe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!!newMessage) {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room: props?.room,
      });

      setNewMessage("");
    }
  }
  return (
    <>
      <div className="header py-2">
        <h2>Welcome to: ROOM-{props?.room}</h2>
      </div>
      <div className="py-2">
        {messages.map((msg) => (
          <div className="message" key={msg.id}>
            <span className="user">
              {" "}
              {msg.user}
            </span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-app">
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
