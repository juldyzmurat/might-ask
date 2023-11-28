import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const clientID =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

let GoogleData;

function LoginButton() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS Current user: ", res);
    GoogleData = res;
    navigate("/TasksViewPage");
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
