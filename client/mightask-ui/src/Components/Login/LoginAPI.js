import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
//import { BrowserRouter as Router } from 'react-router-dom';



const GoogleLoginComponent = () => {

    const navigate = useNavigate();

    const redirectToPage = () => {
        // Redirect to another page when the Google Login button is clicked
        navigate("../../App"); // Change 'dashboard' to your desired path
      };

      
    return (

        <GoogleLogin
                //onSuccess={credentialResponse => {
                //    console.log(credentialResponse);
                //}}
                //onError={() => {
            //    console.log('Login Failed');
                //}}
            onClick = {redirectToPage}
        />

    );
};

export default GoogleLoginComponent;
