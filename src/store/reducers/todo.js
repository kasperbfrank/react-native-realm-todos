import {TodoAction} from '../actions/todo';

const INITIAL_STATE = [];

export default todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodoAction.ADD:
      return [...state, action.payload];
    case TodoAction.UPDATE:
      return state;
    case TodoAction.CLEAR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
