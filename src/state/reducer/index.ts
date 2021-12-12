import { combineReducers } from 'redux';
import { videoReducer } from './video';
import { commentReducer } from './comment';
export const rootReducer = combineReducers({
  video: videoReducer,
  comment: commentReducer,
});
