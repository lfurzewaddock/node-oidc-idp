import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { push } from "connected-react-router";
import userManager from "./utils/user-manager";

const CallbackPage = ({ dispatch }) => {
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={() => dispatch(push("/"))}
      errorCallback={error => {
        dispatch(push("/"));
        // eslint-disable-next-line no-console
        console.error(error);
      }}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};

CallbackPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CallbackPage);
