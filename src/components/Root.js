const React = require('react');
const ReactRedux = require('react-redux');

const Provider = ReactRedux.Provider;
const TaskList = require('./TaskList');

/**
 * The root React component from which all other components
 * on the page are descended.
 */
const Root = React.createClass({
  // Display name (useful for debugging)
  displayName: 'Root',

  // Describe how to render the component
  render: function() {
    return (
      /* The Provider gives descendants the ability to
      connect to the Redux store */
      <Provider store={this.props.store}>
        <TaskList />
      </Provider>
    );
  }
});

module.exports = Root;
