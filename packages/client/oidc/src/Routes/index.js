import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import HomePage from "../components/HomePage";
import CallbackPage from "../callback";

function Routes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" component={HomePage} />
      <Route path="/callback" component={CallbackPage} />
    </ConnectedRouter>
  );
}

Routes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Routes;
