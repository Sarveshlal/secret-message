import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ShowMessage = () => {
  const history = useHistory();

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [recieverkey,setRecieverkey] = useState("")
  const [recieverpassword,setRecieverpassword] = useState("")
  const [button,setButton]= useState(true);
  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    setId(url.searchParams.get("rs"));
  }, []);
  useEffect(()=>{
    if(recieverkey.length>0 && recieverpassword.length>0)
        setButton(false)
    else 
        setButton(true)
  },[recieverkey,recieverpassword])
    const handleRecieverclick = ()=>{
      fetch(`https://secret-msg-server.herokuapp.com/message-by-id/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setMessage(res.result[0]?.message);
          setPageLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  return (
    <React.Fragment>
      <div>
          <label htmlFor="recieverkey">Secret Key:</label>
          <input type="text" value={recieverkey} id="recieverkey" onChange={(eve)=>setRecieverkey(eve.target.value)}/>
          <br/>
          <label htmlFor="recieverpassword">Password:</label>
          <input type="password" value={recieverpassword} onChange={(e)=>setRecieverpassword(e.target.value)}/>
          <br/>
          <button className="btn btn-success" disabled={button} onClick={handleRecieverclick}>Confirm</button>
      </div> 
      {message && pageLoaded ? (
        <div className="container mt-3">
          <h1>Message</h1>
          <div className="text-center px-5 mx-5 mt-3">
            <h4>This is a creepy and secret message for you!!!</h4>
          </div>
          <div className="bg-warning border rounded text-center p-5 m-5">
            <h3>{message}</h3>
          </div>
          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => history.push("/")}
            >
              Create a Secret Message
            </button>
          </div>
        </div>
      ) : (
        pageLoaded && (
          <div className="container mt-3">
            <h1>OOPS!!!</h1>
            <div className="text-center px-5 mx-5 mt-3">
              <h4>The message has been deleted by the creator...</h4>
            </div>
          </div>
        )
      )}
    </React.Fragment>
  );
};

export default ShowMessage;
