import { Link, NavLink } from "react-router-dom";
import "../css/header.css";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { logoutUser, isAuthenticate, user } = useAuth();
  return (
    <header>
      <div className="header-container">
        <nav>
          <div className="logo">
            <Link>Chat App</Link>
          </div>
          <ul style={{ marginBottom: "0" }}>
            <li>
              <NavLink to="/">Room</NavLink>
            </li>
            <li>
              <NavLink to="/chat-room">Chat</NavLink>
            </li>
            <li>
              <NavLink to="/chat-api">Gmail</NavLink>
            </li>
            {!user && (
              <>
                <li>
                  <NavLink to="/login-api" className="btn-action">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register-api" className="btn-action">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <button className="btn-action" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
