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
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INSERT: {
      const id = 1 + _.max(_.map(state.tasks, task => task.id));
      const newTask = _.assign({}, action.task, { id });
      const tasks = state.tasks.concat(newTask);
      return _.assign({}, state, { tasks });
    }

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
