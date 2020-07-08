import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as oidcReducer } from "redux-oidc";

import subscriptionsReducer from "./modules/subscriptions/reducers";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    subscriptions: subscriptionsReducer,
  });

export default reducers;
