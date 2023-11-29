import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import React, { useState, useEffect } from "react";

const clientID =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

let GoogleData;

function LoginButton() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS Current user: ", res);
    GoogleData = res;
    navigate("/TasksViewPage");

    // check user with database
    var currentUser = false;
    const fetchCurrentUser = async() => {
        try {
            const request = "http://localhost:5200/users/".concat(GoogleData.profileObj.email);
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            currentUser = jsonData;
        } catch (error) {
            console.error("Error fetching data: ", error.message);
            currentUser = false;
        }
    };
    fetchCurrentUser();
    if (!currentUser) {
        const userFormData = {
            firstname: GoogleData.profileObj.givenName,
            lastname: GoogleData.profileObj.familyName,
            email: GoogleData.profileObj.email,
            access: "normal",
            profile_path: "path/name",
        };

        const fetchNewUser = async() => {
            try {
                const request = "http://localhost:5200/users/";
                const data = JSON.stringify(userFormData);
                const response = await fetch(request, {
                    method: "post",
                    // mode: "cors",
                    headers: {'Content-Type': 'application/json'},
                    body: data,
                });
                // console.log(data);
                console.log("fetch");
                if (!response.ok) {
                    throw new Error("Failed to post data");
                }
            } catch (error) {
                console.error("Error fetching data: ", error.message);
            }
        };
        fetchNewUser();
    }

    // create categories for user
  };

  const onFailure = (res) => {
    console.log("LOGIN Fail");
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
  );
}

export { LoginButton, GoogleData };
