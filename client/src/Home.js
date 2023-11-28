import React from "react";
import "./index.css";
import Google from "./Components/Login/LoginAPI";
import { GoogleOAuthProvider } from "@react-oauth/google";
import gif from "./20cat.gif";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={gif} className="App-logo" alt="gif" />
        <GoogleOAuthProvider clientId="599824373793-o5aoosfc8ndecst0jq232s9qjqdhmr83.apps.googleusercontent.com">
          <Google />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default Home;
