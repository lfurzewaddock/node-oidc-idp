import fastify from "fastify";
import { Provider } from "oidc-provider";
import fs from "fs";
import path from "path";

import jwks from "./jwks.json";

const {
  OIDC_CLIENT_REDIRECT_BASE_URL_HOST,
  OIDC_CLIENT_REDIRECT_BASE_URL_PORT,
  OIDC_SERVER_BASE_URL_HOST,
  OIDC_SERVER_BASE_URL_PORT,
} = process.env;

const configuration = {
  // ... see the available options in Configuration options section
  features: {
    encryption: { enabled: true },
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
  formats: {
    AccessToken: "jwt",
  },
  clients: [
    {
      client_id: "foo",
      client_secret: "bar",
      redirect_uris: [
        `https://${OIDC_CLIENT_REDIRECT_BASE_URL_HOST}:${OIDC_CLIENT_REDIRECT_BASE_URL_PORT}/callback`,
      ],
      grant_types: ["refresh_token", "authorization_code", "implicit"],
      response_types: ["id_token token", "code id_token", "code", "id_token"],
      // + other client properties
    },
  ],
  responseTypes: [
    "code id_token token",
    "code id_token",
    "code token",
    "code",
    "id_token token",
    "id_token",
  ],

  jwks,
};

const oidc = new Provider(
  `https://${OIDC_SERVER_BASE_URL_HOST}:${OIDC_SERVER_BASE_URL_PORT}`,
  configuration
);

const apiServer = fastify({
  logger: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, "../localhost_key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../localhost.pem")),
  },
});

apiServer.get("/", async () => {
  return { hello: "world" };
});

// Mount oidc-provider
const prefix = "/oidc";
apiServer.use(prefix, oidc.callback);

const start = async () => {
  try {
    await apiServer.listen(3000);
    apiServer.log.info(
      `server listening on ${apiServer.server.address().port}`
    );
  } catch (err) {
    apiServer.log.error(err);
    process.exit(1);
  }
};
start();
