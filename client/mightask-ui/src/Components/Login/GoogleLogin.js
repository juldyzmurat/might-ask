import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "1051622212201-vgnvmtvfqjgi5ot3vsqp0rmsnd71uf02.apps.googleusercontent.com"; // Replace with your Google API Client ID

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const onSuccess = (response) => {
    console.log('Login successful! User profile:', response.profileObj);
    if (onLoginSuccess) {
      onLoginSuccess(response.profileObj);
    }
  };

  const onFailure = (response) => {
    console.log('Login failed. Response:', response);
    if (onLoginFailure) {
      onLoginFailure(response);
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
    />
  );
};

export default GoogleLoginButton;
