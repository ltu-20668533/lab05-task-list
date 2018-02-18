const _ = require('lodash');

// The initial state is filled with some dummy data for debugging purposes
const initialState = {
  tasks: [
    { id: 1, description: 'Mow the lawn', completed: false },
    { id: 2, description: 'Unbench the Kench', completed: true },
  ]
};

// Action type constant for inserting a new task
const INSERT = 'task-list/insert';

// The reducer function takes the current state and an action, and returns
// the new state after applying the action.
function reducer(state, action) {
  // Defaults for when state/action are not defined
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INSERT: {
      // Copy current state
      const newState = _.clone(state);
      // Find next available task ID
      const id = 1 + _.max(state.tasks.map(task => task.id));
      // Construct new task from the details provided via the action
      // and the next available ID
      const newTask = _.assign({}, action.task, { id });
      // Set the new array of tasks to be the old array with the
      // new task included
      newState.tasks = state.tasks.concat(newTask);
      // Return the new state
      return newState;
    }

    // If we don't recognise the action type, just return the store
    // state unchanged
    default: return state;
  }

  throw new Error('Reducer switch statement should always return');
}

// Action creator for inserting a new task
reducer.insertTask = (description) => {
  return { type: INSERT, task: { description, completed: false } };
};

// Export the reducer function along with the action creators attached
// to it.
module.exports = reducer;
