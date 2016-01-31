const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const actionCreators = require('../state/reducer');

/**
 * The Task component renders a view for a single task.
 */
const Task = (props) => {
  return (
    <li>{props.description}</li>
  );
};

const createTaskComponent = (task) => {
  return <Task key={task.id} {...task} />;
};

/**
 * The TaskList component renders a view for a list
 * of tasks.
 */
const TaskList = React.createClass({
  // Display name (useful for debugging)
  displayName: 'TaskList',

  // Describe how to render the component
  render: function() {
    const onInsertButtonClick = () => {
      this.props.insertTask('Another one');
    };

    return (
      <div>
        <button onClick={onInsertButtonClick}>Insert</button>
        <ul>
          { _.map(this.props.tasks, createTaskComponent) }
        </ul>
      </div>
    );
  }
});


// Connect TaskList component to the Redux store. That is, we will use
// parts of the store to pass props to the TaskList component.
const ConnectedTaskList = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    tasks: state.tasks
  }),
  // Map action dispatchers to props
  // NOTE: _.flow(f, g) returns a function equivalent to g(f(args...))
  (dispatch) => ({
    insertTask: _.flow(actionCreators.insertTask, dispatch)
  })
)(TaskList);

// Export the connected TaskList component
module.exports = ConnectedTaskList;
