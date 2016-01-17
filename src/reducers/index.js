import { combineReducers } from 'redux';
import redditPosts from './posts';

const rootReducer = combineReducers({
  redditPosts
});

export default rootReducer;
