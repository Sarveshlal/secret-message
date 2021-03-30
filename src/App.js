import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewMessage from "./Newmessage";
import ShowMessage from "./Showmessage";
import DeleteMessage from "./Deletemessage";
// import RecieveMessage from "./Recievermessage";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            return <NewMessage />;
          }}
        />
        <Route
          exact
          path="/delete"
          render={(props) => {
            return <DeleteMessage />;
          }}
        />
        <Route
          path="/message"
          render={(props) => {
            return <ShowMessage />;
          }}
        />
        {/* <Route
          path="/reciever"
          render={(props) => {
            return <RecieveMessage />;
          }}
        /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
