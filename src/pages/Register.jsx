import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import addImg from "../assets/icons/icon_img.png";
import imgList from "../assets/icons/icon_img-list.png";
import "../css/chat.css";

export default function Register() {
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  function submitForm(event) {
    event.preventDefault();
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!!file) {
      setFile(file);
    }
  }

  function clearFile() {
    setFile(null);
    fileRef.current.value = "";
  }

  function imageContainer() {
    return (
      <>
        {file ? (
          <div className="file-list-container">
            <div className="file-list">
              <div className="data">
                <img src={imgList} alt="file-list" />
                <span> {file?.name} </span>
              </div>
              <div onClick={clearFile} className="clear">
                <span>x</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="img-upload">
            <label htmlFor="inputFile">
              <img src={addImg} alt="add-img" />+ Add Image
            </label>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Firebase Chat</span>
          <span className="title">Register</span>
          <form onSubmit={submitForm}>
            <input type="text" placeholder="display Name" />
            <input type="email" placeholder="example@gmail.com" />
            <input type="password" placeholder="password" />
            {imageContainer()}
            <input
              type="file"
              id="inputFile"
              onChange={handleFileUpload}
              hidden={true}
              ref={fileRef}
            />

            <button type="submit">Sign up</button>
          </form>

          <p>
            You do have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
