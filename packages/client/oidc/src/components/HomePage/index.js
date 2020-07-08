import React from "react";
import PropTypes, { shape } from "prop-types";
import { connect } from "react-redux";
import LoginPage from "../LoginPage";
import MainPage from "../MainPage";

function HomePage(props) {
  const { user } = props;

  return !user || user.expired ? <LoginPage /> : <MainPage />;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

HomePage.propTypes = {
  user: shape({
    id_token: PropTypes.string.isRequired,
    access_token: PropTypes.string.isRequired,
    token_type: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
    expires_at: PropTypes.number.isRequired,
    profile: shape({
      sub: PropTypes.string.isRequired,
      s_hash: PropTypes.string.isRequired,
    }),
  }),
};

HomePage.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
