import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const ProtectRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!!currentUser) {
    return children;
  }
  return children;
  // return <Navigate to="/login" />;
};

export const ProtectRouteAPI = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login-api" />;
  }
  return children;
};
