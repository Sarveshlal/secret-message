import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const NewMessage = () => {
  const history = useHistory();
  const [randomString, setRandomString] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [targetMail, setTargetMail] = useState("");
  const [rootUrl, setRootUrl] = useState("");
  const [password2,setPassword2] = useState("");
  const [buttonHidden, setButtonHidden] = useState(true);

  useEffect(() => {
    setRandomString(Math.random().toString(36).substring(5).toUpperCase());
    setPassword2(Math.random().toString(36).substring(7).toLowerCase());
    setRootUrl(`${window.location.href}message/`);
  }, []);

  useEffect(() => {
    if (
      randomString.length > 0 &&
      password.length > 0 &&
      message.length > 0 &&
      targetMail.length > 0 &&
      rootUrl.length > 0 && 
      password2.length >0
    ) {
      setButtonHidden(false);
    } else {
      setButtonHidden(true);
    }
  }, [randomString, password, message, targetMail, rootUrl,password2]);

  const handleMessageSubmit = () => {
    fetch("https://secret-msg-server.herokuapp.com/create-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        randomKey: randomString,
        password: password,
        message: message,
        targetMail: targetMail,
        password2 : password2,
        targetURL: rootUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => history.go(0));
  };

  return (
    <div className="App container mt-4">
      <div>
        <h1 className="mt-2 mb-3 d-inline-block">SECRET MESSAGING APP</h1>
        <button
          className="btn btn-danger float-right mt-3"
          onClick={() => {
            history.push("/delete");
          }}
        >
          Delete A Message
        </button>
      </div>
      <label className="input-group" htmlFor="rs">
        Random string :{" "}
      </label>
      <input
        className=" input-group"
        type="text"
        id="rs"
        value={randomString}
        placeholder="Random String"
        onChange={(e) => setRandomString(e.target.value)}
      />
      <br />
      <label className="input-group" htmlFor="password">
        Password :{" "}
      </label>
      <input
        className=" input-group"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="Enter new password here..."
      />
      <br />
      <label className="input-group" htmlFor="message">
        Message :{" "}
      </label>
      <textarea
        className=" input-group"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter the secret message here..."
        rows="6"
      />
      <br />
      <label htmlFor="target" className="input-group">
        Target Mail :{" "}
      </label>
      <input
        type="text"
        id="target"
        className="input-group"
        value={targetMail}
        onChange={(e) => setTargetMail(e.target.value)}
        placeholder="Enter the target email"
      />
      <br />
      <label className="input-group" htmlFor="password2">
        Reciever Password :{" "}
      </label>
      <input
        className=" input-group"
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        id="password2"
        placeholder="Enter Reciever password here..."
      />
      <br />
      <label htmlFor="url" className="input-group">
        Root URL :{" "}
      </label>
      <input
        type="text"
        id="url"
        className="input-group"
        value={rootUrl}
        onChange={(e) => setRootUrl(e.target.value)}
        placeholder="Enter the url for message"
      />
      <button
        type="button"
        disabled={buttonHidden}
        className="btn btn-primary mt-3 mb-3"
        onClick={handleMessageSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default NewMessage;
