import React from "react";
import { useFetchReceipt } from "../../../hooks/useFetchReceipt";
import { Stack } from "react-bootstrap";
import avatar from "../../../assets/icons/icon_avatar.png";

function UserChat(props) {
  const { chat, userId } = props;
  const { receiptUser } = useFetchReceipt(chat, userId);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center justify-content-between p-2"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="avartar" height={35} />
        </div>
        <div className="text-content">
          <div className="name"> {receiptUser?.email} </div>
          <div className="text">Text Message</div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2023</div>
        <div className="this-user-notifications">2</div>
        <div className="user-online"></div>
      </div>
    </Stack>
  );
}

export default UserChat;
