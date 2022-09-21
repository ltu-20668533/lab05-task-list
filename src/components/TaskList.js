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
  const onRemoveButtonClick = () => {
    props.onRemove(props.id);
  };
  const onCheckChange = () => {
    props.conCompletedChange(props.id, !props.completed)
  }
  return (
    <li>
      <input type="checkbox" checked={props.completed} />
      {props.description}
      <button onClick={onRemoveButtonClick} onChange={onCheckChange}>&times;</button>
    </li>
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
    this.state = { newTaskDescription: '', disabledAdd: true }
  }

  createTaskComponent(task) {
    // Note: {...task} is a shortcut for setting properties with
    // names that match keys in the object. The following line is
    // equivalent to:
    //    <Task key={task.id} id={task.id} description={task.description}
    //      completed={task.completed} />
    return <Task key={task.id} 
            onRemove={this.props.removeTask}
            onCompletedChange={this.props.setCompleted} 
            {...task} />;
  }

  render() {
    console.log('newTaskDescription="' + this.state.newTaskDescription + '"');

    const onInsertButtonClick = () => {
      this.props.insertTask(this.state.newTaskDescription);
      this.setState({ newTaskDescription: "", disabledAdd: true});
    };

    const onDescriptionInputChange = (event) => {
      const newTaskDescription = event.target.value;
      this.setState({ newTaskDescription, disabledAdd: false });   
     };

    return (
      <div>
        <input type="text" value={this.state.newTaskDescription} onChange={onDescriptionInputChange} />
        <button onClick={onInsertButtonClick} disabled={this.state.disabledAdd}>Insert</button>
        <ul>
          { this.props.tasks.map(this.createTaskComponent) }
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
  (dispatch) => ({
    // Define a function which creates and dispatches an "insert task" action
    insertTask: (desc) => dispatch(actionCreators.insertTask(desc)),
    removeTask: (id) => dispatch(actionCreators.removeTask(id)),
    setCompleted: (id, completed) => dispatch(actionCreators.setCompleted(id, completed))
  })
)(TaskList);

// Export the connected TaskList component
module.exports = ConnectedTaskList;
