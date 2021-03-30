import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const DeleteMessage = () => {
  const history = useHistory();

  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [editsecretKey, editsetSecretKey] = useState("");
  const [editpassword, editsetPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [editbtnDisable, editsetBtnDisable] = useState(true);
  const [response, setResponse] = useState("");
  const [edit, setEdit] = useState("");
  useEffect(() => {
    if (secretKey.length > 0 && password.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [secretKey, password]);
  useEffect(() => {
    if (editsecretKey.length > 0 && editpassword.length > 0) {
      editsetBtnDisable(false);
    } else {
      editsetBtnDisable(true);
    }
  }, [editsecretKey, editpassword]);

  const handleDeleteMessage = () => {
    fetch("https://secret-msg-server.herokuapp.com/delete-message", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: secretKey,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.message);
        setBtnDisable(true);
        history.go(0)
      });
  };

  const handleEditMessage = () => {
    fetch("https://secret-msg-server.herokuapp.com/edit-message",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        message: edit,
        secretKey: editsecretKey,
        password: editpassword
      })
    }).then((res)=>res.json())
    .then((res)=>{
      setResponse(res.message);
      editsetBtnDisable(true);
      history.go(0)
    })
  };

  return (
    <div className="container mt-4">
      <div>
        <h1 className="mb-5 d-inline-block">Delete Message</h1>
        <button
          className="btn btn-primary float-right mt-3"
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </button>
      </div>
      <label htmlFor="key">Secret Key : </label>
      <input
        type="text"
        className="input-group"
        id="key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />
      <br />
      <label htmlFor="pwd">Password : </label>
      <input
        type="password"
        className="input-group"
        id="pwd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {response.length > 0 && (
        <h5 className="mt-2 mb-4">Message : {response}</h5>
      )}
      <button
        className="btn btn-danger"
        disabled={btnDisable}
        onClick={handleDeleteMessage}
      >
        Delete
      </button>
      <br />
      <div>
        <h3>EDIT a Message</h3>
        <label htmlFor="edit">Message:</label>
        <input
          type="text"
          id="edit"
          className="input-group"
          value={edit}
          onChange={(event) => setEdit(event.target.value)}
        />
        <label htmlFor="editkey">Secret Key :</label>
        <input
          type="text"
          id="editkey"
          className="input-group"
          value={editsecretKey}
          onChange={(e) => editsetSecretKey(e.target.value)}
        />
        <label htmlFor="editpassword">Password:</label>
        <input
          type="password"
          id="editpassword"
          className="input-group"
          value={editpassword}
          onChange={(e) => editsetPassword(e.target.value)}
        />
        <br />
        {response.length > 0 && (
        <h5 className="mt-2 mb-4">Message : {response}</h5>
        )}
        <button className="btn btn-secondary" disabled={editbtnDisable} onClick={handleEditMessage}>
          Edit Message
        </button>
      </div>
    </div>
  );
};

export default DeleteMessage;
