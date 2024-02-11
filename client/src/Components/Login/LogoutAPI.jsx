import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId = "YOUR_API_KEY";

function LogoutButton() {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("Log out successfull!");

    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("currentUser");
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
