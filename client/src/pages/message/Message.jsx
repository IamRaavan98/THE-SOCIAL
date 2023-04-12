import React, { useState } from "react";
import "./message.css";
const Message = () => {
  console.log("count");
  const [data, setData] = useState("please dont leave me");
  const [data1, setData1] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data1)
    setData1('')

  };
  return (
    <div className="message">
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/11665320/pexels-photo-11665320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p className="messageText">Hi its over you are not worthy to have me</p>
      </div>
      <div className="messageBottom">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/11665320/pexels-photo-11665320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p className="messageText">{data}</p>
      </div>
      <div className="send">
        <form className="form" onSubmit={handleSubmit}>
            
          <textarea
          name="sendMessage"
          className="input"
          type="text"
          value={data1}
          onChange={(e) => setData1(e.target.value)}
          placeholder="send a message"
          ></textarea>
          <button name="button" className="submitButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
