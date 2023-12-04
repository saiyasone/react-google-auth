import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { dbFire } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(dbFire, "userChats", currentUser?.uid),
        (docData) => {
          setChats(docData.data());
        }
      );

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  // console.log(chats);

  return (
    <div className="chat">
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
        <div className="userChat">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
        </div>
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
        <div className="userChat">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
        </div>
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
        <div className="userChat">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
