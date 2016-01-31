const _ = require('lodash');

const initialState = {
  tasks: [
    { id: 1, description: 'Mow the lawn', completed: false },
    { id: 2, description: 'Unbench the Kench', completed: true },
  ]
};

const INSERT = 'task-list/insert';

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

reducer.insertTask = (description) => {
  return { type: INSERT, task: { description, completed: false } };
};

module.exports = reducer;
