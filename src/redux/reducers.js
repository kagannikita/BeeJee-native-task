import {ADD_TASK, EDIT_TASK, GET_TASKS, MARK_TASK} from './types';

const initialState = {
  tasks: [],
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(todo =>
          todo.id === action.payload.id
            ? {...todo, text: action.payload.text}
            : todo,
        ),
      };
    case MARK_TASK:
      return {
        ...state,
        tasks: state.tasks.map(todo =>
          todo.id === action.payload.id
            ? {...todo, status: action.payload.status}
            : todo,
        ),
      };
    default:
      return state;
  }
};
export default taskReducer;
