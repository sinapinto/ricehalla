import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import rice from './rice';

const rootReducer = combineReducers({
  auth,
  user,
  rice,
});

export default rootReducer;
