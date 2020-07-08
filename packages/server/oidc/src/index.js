import fastify from "fastify";
import { Provider } from "oidc-provider";
import fs from "fs";
import path from "path";

import jwks from "./jwks.json";

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
      redirect_uris: ["https://127.0.0.1:8080/callback"],
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

const oidc = new Provider("https://localhost:3000", configuration);

const apiServer = fastify({
  logger: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, "../server.key")),
    cert: fs.readFileSync(path.join(__dirname, "../server.cert")),
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
