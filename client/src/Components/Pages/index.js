import React from "react";
import gif from "../../Assets/80cat.gif";
import logo from "../../Assets/mightasklogo.png";
import text from "../../Assets/mightasktext_2.png";
import { LoginButton } from "../Login/LoginAPI";
import LogoutButton from "../Login/LogoutAPI";

import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

function Home() {
  useEffect(() => {
    function start() {
      if (!gapi.auth2.getAuthInstance()) {
        gapi.auth2.init({
          client_id: clientId,
          scope: "profile email",
        });
      }
    }
    gapi.load("client: auth2", start);
  });

  return (
     <div>
      <img src={gif} className="App-logo" alt="gif" />
      <LoginButton />
      {/* <LogoutButton /> */}
    </div>
  );
}

export default Home;
