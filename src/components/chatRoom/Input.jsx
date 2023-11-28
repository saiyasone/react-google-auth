import React from "react";
import logo from "../../assets/icons/icon_img.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src={logo} alt="" />
        <input type="file" name="" id="file" hidden={true} />
        <label htmlFor="file">
          <img src={logo} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
