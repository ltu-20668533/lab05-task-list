const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

const reducer = require('./state/reducer');
const Root = require('./components/Root');

// Create a Redux store
const store = Redux.createStore(reducer);

// Mount our React root component in the DOM
const mountPoint = document.getElementById('root');
const rootComponent = <Root store={store} />;
ReactDOM.render(rootComponent, mountPoint);
