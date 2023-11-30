import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import React from "react";

const clientID =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

let GoogleData;

function LoginButton() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS Current user: ", res);
    GoogleData = res;
    navigate("/task-views");

    // check user with database
    var currentUser = false;
    const fetchCurrentUser = async () => {
      const request = "http://localhost:5200/users/".concat(
        GoogleData.profileObj.email,
      );
      const response = await fetch(request);
      const jsonData = await response.json();
      currentUser = jsonData;
      console.log("usernameee");
      console.log(currentUser);
      return currentUser;
    };

    fetchCurrentUser().then(
      (onResolved) => {
        console.log("user");
        console.log(currentUser);
        console.log("name");
      },
      (onRejection) => {
        console.log("user");
        console.log(currentUser);
        console.log("name");

        // create categories for user if user is new, also add user to DB
        const userFormData = {
          firstname: GoogleData.profileObj.givenName,
          lastname: GoogleData.profileObj.familyName,
          email: GoogleData.profileObj.email,
          access: "normal",
          profile_path: "path/name",
        };

        const fetchNewUser = async () => {
          try {
            const request = "http://localhost:5200/users/";
            const data = JSON.stringify(userFormData);
            const response = await fetch(request, {
              method: "post",
              // mode: "cors",
              headers: { "Content-Type": "application/json" },
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

        const categoryNames = [
          "Personal",
          "School",
          "Work",
          "Household",
          "Social",
          "Other",
        ];
        const categoryColors = [
          "#DF536B",
          "#61D04F",
          "#2297E6",
          "#CD0BBC",
          "#F5C710",
          "#9E9E9E",
        ];
        const categoryDescriptions = [
          "You have to do this alone, but Pamuk believes in you!",
          "Schoolwork, schmoolwork.",
          "Time to adult.",
          "Live well!",
          ":)",
          "Cuddletime with Pamuk.",
        ];
        for (let i = 0; i < categoryNames.length; i++) {
          const categoryFormData = {
            name: categoryNames[i],
            userid: GoogleData.profileObj.email,
            color: categoryColors[i],
            description: categoryDescriptions[i],
          };

          const fetchNewCategories = async () => {
            try {
              const request = "http://localhost:5200/categories/";
              const data = JSON.stringify(categoryFormData);
              const response = await fetch(request, {
                method: "post",
                // mode: "cors",
                headers: { "Content-Type": "application/json" },
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
          fetchNewCategories();
        }
      },
    );
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
