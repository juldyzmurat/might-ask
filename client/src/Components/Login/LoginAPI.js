//we are starting from scratch 
import {GoogleLogin} from 'react-google-login'; 

const clientID = "613216441734-0c8nmpfakholp4jm5v5jp14occlu232i.apps.googleusercontent.com";

function LoginButton(){

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS Current user: ", res);
    }

    

    const onFailure = (res) => {
        console.log("LOGIN Fail");
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )

}

export default LoginButton; 