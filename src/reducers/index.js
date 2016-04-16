import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import rice from './rice';
import upload from './upload';

const rootReducer = combineReducers({
  auth,
  user,
  rice,
  upload,
});

export default rootReducer;
