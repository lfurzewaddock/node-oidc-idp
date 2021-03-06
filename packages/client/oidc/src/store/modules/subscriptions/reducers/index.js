import { SESSION_TERMINATED, USER_EXPIRED } from "redux-oidc";

import { LOAD_SUBSCRIPTIONS_SUCCESS } from "../actions";

const initialState = {
  channels: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return {
        ...state,
        channels: [],
      };
    case LOAD_SUBSCRIPTIONS_SUCCESS:
      return { ...state, channels: action.payload };
    default:
      return state;
  }
}
