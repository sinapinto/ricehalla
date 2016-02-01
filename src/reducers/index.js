import { combineReducers } from 'redux';
import battle from './battle';

// keep in sync with the initial state used on the server.
const rootReducer = combineReducers({
  battle,
});

export default rootReducer;
