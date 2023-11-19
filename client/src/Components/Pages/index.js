import React from 'react';
import Google from "../Login/LoginAPI";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import gif from '../../80cat.gif';
 
const Home = () => {
    return (
        <div>
            <img src={gif} className="App-logo" alt="gif" />
            <GoogleOAuthProvider clientId="599824373793-o5aoosfc8ndecst0jq232s9qjqdhmr83.apps.googleusercontent.com">
                <Google />
            </GoogleOAuthProvider>
        </div>
    );
};
 
export default Home;