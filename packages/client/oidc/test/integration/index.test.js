// eslint-disable-next-line import/no-extraneous-dependencies
import test from "tape";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import CompApp from "../../src/CompApp";
import reducers from "../../src/modules/reducers";
import "../enzyme-setup";

test("index.js", t => {
  t.test("App renders", assert => {
    const div = document.createElement("div");
    const middleware = [thunk];
    const store = createStore(
      reducers,
      compose(applyMiddleware(...middleware))
    );

    ReactDOM.render(
      <Provider store={store}>
        <CompApp />
      </Provider>,
      div,
      () => {
        // eslint-disable-next-line no-console
        // console.log(div.innerHTML);
      }
    );
    ReactDOM.unmountComponentAtNode(div);

    assert.pass("renders without crashing");
    assert.end();
  });
});
