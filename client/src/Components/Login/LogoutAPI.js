import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

const clientId =
  "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

function LogoutButton() {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("Log out successfull!");
    navigate("/");
  };

  return (
    <div id="signoutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutButton;
