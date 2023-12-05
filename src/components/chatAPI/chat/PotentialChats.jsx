import React from "react";
import { useChat } from "../../../hooks/useChat";
import useAuth from "../../../hooks/useAuth";

const PotentialChats = () => {
  const { potentialChats, createChat } = useChat();
  const { userId } = useAuth();
  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats?.map((user, index) => {
          return (
            <div
              className="single-user"
              key={index}
              onClick={() => createChat(userId, user?._id)}
            >
              {user.name}
              <span className="user-online"></span>
            </div>
          );
        })}
    </div>
  );
};
export default PotentialChats;
