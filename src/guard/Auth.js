import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectRouteAPI = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();
  if (!isAuthenticate) {
    return navigate("/login-api");
  }
  return children;
};
