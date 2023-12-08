import React, { useEffect } from "react";
import gif from "../../Assets/80cat.gif";
import { LoginButton } from "../Login/LoginAPI";
import "./../../Styles/Common.css";
import { gapi } from "gapi-script";
import img from "../../Assets/mighTASK1.png";

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
  }, []);

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        <div className="card bg-dark text-white" style={{ borderRadius: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="card-body p-5 text-center">
            <img src={img} className="App-logo mb-4" alt="img" style={{ width: "auto", height: "auto" }} />
            <div className="mb-md-5 mt-md-4 pb-5">
              <img src={gif} className="App-logo mb-4" alt="gif" />
            </div>
            <div>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
