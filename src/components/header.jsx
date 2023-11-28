import { Link, NavLink } from "react-router-dom";
import "../css/header.css";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <nav>
          <div className="logo">
            <Link>Chat App</Link>
          </div>
          <ul>
            <li>
              <NavLink to="/" activeClass="active">
                Room
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat-room" activeClass="active">
                Chat
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClass="active" className="btn-action">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                activeClass="active"
                className="btn-action"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
