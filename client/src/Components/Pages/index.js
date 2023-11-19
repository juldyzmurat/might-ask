import React, { useState } from "react";
import Google from "../Login/LoginAPI";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import gif from '../../80cat.gif';
import { Nav, LoginButton} from "../NavBar/NavbarElements";
 
const Home = () => {

    const [navDisplay, setNavDisplay] = useState(false);

    const handleLoginClick = () => {
        // Toggle the navigation bar display
        setNavDisplay(!navDisplay);
    };

    return (
        <div>
            <img src={gif} className="App-logo" alt="gif" />
            <LoginButton onClick={handleLoginClick}>
                <GoogleOAuthProvider clientId="599824373793-o5aoosfc8ndecst0jq232s9qjqdhmr83.apps.googleusercontent.com">
                    <Google />
                </GoogleOAuthProvider>
            </LoginButton>
        </div>
        
    );
};
 
export default Home;