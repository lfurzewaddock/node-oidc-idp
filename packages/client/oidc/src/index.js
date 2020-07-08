// Map & Set required for React 16.x, but not natively provided by IE < 11
// or have non-compliant implementations (e.g. IE 11)
// https://reactjs.org/docs/javascript-environment-requirements.html
// import { map, set } from "core-js"; // eslint-disable-line no-unused-vars
// // React also depends on requestAnimationFrame (even in test environments). IE < 10
// import { polyfill } from "raf"; // eslint-disable-line no-unused-vars

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { OidcProvider, loadUser } from "redux-oidc";
import { routerMiddleware } from "connected-react-router";

import CompApp from "./CompApp";
import reducers from "./store/reducers";
import userManager from "./utils/user-manager";

import "./index.css";

const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
        })) ||
      compose
    : compose;
/* eslint-enable no-underscore-dangle */

const middleware =
  process.env.NODE_ENV === "development" ? [thunk].concat(logger) : [thunk];

const store = createStore(
  reducers(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), ...middleware))
);
loadUser(store, userManager);

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <CompApp history={history} />
    </OidcProvider>
  </Provider>,
  document.getElementById("root") || document.createElement("div")
);
