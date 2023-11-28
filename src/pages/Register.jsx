import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";
import addImg from "../assets/icons/icon_img.png";
import imgList from "../assets/icons/icon_img-list.png";
import "../css/chatRoom.css";
import { auth, dbFire, storage } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [err, setError] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  async function submitForm(event) {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (err) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (download) => {
            // console.log("File Available: " + download);
            await updateProfile(res.user, { displayName, photoURL: download });
            await setDoc(doc(dbFire, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: download,
            });
          });
        }
      );
    } catch (error) {
      setError(true);
    }
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
            {err && "Something went wrong"}
          </form>

          <p>
            You do have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
