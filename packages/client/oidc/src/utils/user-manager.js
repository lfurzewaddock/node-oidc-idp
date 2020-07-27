import { createUserManager } from "redux-oidc";

// Note: dotenv-webpack does not expect destructuring
/* eslint-disable prefer-destructuring */
const OIDC_SERVER_BASE_URL_HOST = process.env.OIDC_SERVER_BASE_URL_HOST;
const OIDC_SERVER_BASE_URL_PORT = process.env.OIDC_SERVER_BASE_URL_PORT;
/* eslint-enable prefer-destructuring */

const userManagerConfig = {
  client_id: "foo",
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/callback`,
  response_type: "token id_token",
  scope: "openid",
  authority: `https://${OIDC_SERVER_BASE_URL_HOST}:${OIDC_SERVER_BASE_URL_PORT}/oidc`,
  // silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  // automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
