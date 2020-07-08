import React from "react";
import PropTypes, { shape } from "prop-types";
import { connect } from "react-redux";
import userManager from "../../utils/user-manager";

function MainPage({ user }) {
  return (
    <div>
      <div>
        <p>Hello {user.profile.sub}</p>
      </div>
      <button
        type="button"
        onClick={event => {
          event.preventDefault();
          userManager.removeUser(); // removes the user data from sessionStorage
        }}
      >
        Logout
      </button>
    </div>
  );
}

MainPage.propTypes = {
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
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(MainPage);
