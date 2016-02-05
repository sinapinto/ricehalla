import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';
import battle from './battle';

function errorMessage(state = null, action) {
  const { type, message } = action;

  if (type === ActionTypes.RESET_ERROR) {
    return null;
  }
  if (message) {
    return message;
  }
  return state;
}

// keep in sync with the initial state used on the server.
const rootReducer = combineReducers({
  errorMessage,
  battle,
});

export default rootReducer;
