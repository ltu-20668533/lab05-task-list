// ## TaskList.js ##
//
// The TaskList component renders a view for a list of tasks.

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

/**
 * The TaskList component renders a view for a list
 * of tasks.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.createTaskComponent = this.createTaskComponent.bind(this);
  }

  createTaskComponent(task) {
    // Note: {...task} is a shortcut for setting properties with
    // names that match keys in the object. The following line is
    // equivalent to:
    //    <Task key={task.id} id={task.id} description={task.description}
    //      completed={task.completed} />
    return <Task key={task.id} {...task} />;
  }

  render() {
    const onInsertButtonClick = () => {
      this.props.insertTask('Another one');
    };

    return (
      <div>
        <button onClick={onInsertButtonClick}>Insert</button>
        <ul>
          { _.map(this.props.tasks, this.createTaskComponent) }
        </ul>
      </div>
    );
  }
}

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
