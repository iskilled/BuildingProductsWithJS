// import enzyme methods
import React from 'react';
import {shallow, render, mount} from 'enzyme';
// import complete rxjs
import 'rxjs';

// setup localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

// setup default API_HOST
global.API_HOST = 'http://localhost:8080';

// setup enzyme
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Skip createElement warnings but fail tests on any other warning
// const {error} = console;
// console.error = function(warning, ...args) {
//   if (/(React.createElement: type should not be null)/.test(warning)) {
//     throw new Error(warning);
//   }
//   error.apply(console, [warning, ...args]);
// };
console.warn = jest.genMockFunction();
console.error = console.warn;
