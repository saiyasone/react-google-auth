import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function Navbar() {
  async function logout() {
    await signOut(auth)
  }

  return (
    <div className="navbar">
      <span className="logo">Firebase chat</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="firebase"
        />
        <span>John</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
