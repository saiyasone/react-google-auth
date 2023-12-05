import { useEffect, useState } from "react";
import { getRequest } from "../utils/service";

export const useFetchReceipt = (chat, userId) => {
  const [receiptUser, setReceiptUser] = useState(null);
  const receiptId = chat?.members.find((id) => id[0] !== userId);
  
  useEffect(() => {
    const getUser = async () => {
      if (!receiptId) return null;

      const res = await getRequest(`/find/${receiptId}`);
      console.log(res);
      setReceiptUser(res);
    };

    getUser();
  }, [receiptId]);

  return {
    receiptUser,
  };
};
