// Using enzyme with JSDOM
// Source: https://airbnb.io/enzyme/docs/guides/jsdom.html
// Use with Tape.js CLI;
// --require ./test/jsdom-setup.js

// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require("jsdom");
// React depends on requestAnimationFrame (even in test environments). IE < 10 & node.js
const raf = require("raf");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
raf.polyfill(window);
copyProps(window, global);
