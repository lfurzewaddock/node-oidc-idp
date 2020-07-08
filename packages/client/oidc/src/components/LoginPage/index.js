import React from "react";
import userManager from "../../utils/user-manager";

function LoginPage() {
  const onLoginButtonClick = event => {
    event.preventDefault();
    userManager.signinRedirect();
  };

  return (
    <div>
      <h3>Welcome to the redux-oidc sample app!</h3>
      <p>Please log in to continue</p>
      <button type="button" onClick={onLoginButtonClick}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
