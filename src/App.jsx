import { useRef, useState } from "react";
import Auth from "./Auth";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";
import ChatApp from "./chatapp";
// import GoogleAuth from "./googleAuth";

function App() {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(
    cookies.get("auth-token") ? true : false
  );
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);

  function submitRoom(evt) {
    evt.preventDefault();

    if (inputRef.current.value) {
      setRoom(inputRef.current.value);
    }
  }

  async function signOutGoogle() {
    await signOut(auth);
    await cookies.remove("auth-token");
    setIsAuth(false);
  }

  return (
    <div className="container my-3">
      {isAuth ? (
        <>
          {room ? (
            <div>
              <ChatApp room={room} />
            </div>
          ) : (
            <div className="room">
              <form onSubmit={submitRoom}>
                <div className="my-3">
                  <label htmlFor="">Enter room name</label>
                  <input ref={inputRef} type="text" className="form-control" />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary me-3">
                    Enter Chat
                  </button>
                  <button
                    onClick={signOutGoogle}
                    type="button"
                    className="btn btn-danger"
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="App container mt-4">
          {/* <GoogleAuth /> */}
          <Auth setAuth={setIsAuth} />
        </div>
      )}
    </div>
  );
}

export default App;
