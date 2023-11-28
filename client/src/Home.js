import React from "react";
import "./index.css";
import Google from "./Components/Login/LoginAPI";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoginButton, googleData } from "./Components/Login/LoginAPI";
import { GoogleOAuthProvider } from "@react-oauth/google";
import gif from "./Assets/20cat.gif";

var Google = LoginButton;

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
