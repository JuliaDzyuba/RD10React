import { combineReducers } from 'redux';
import movieReducer from './reducers/movieReducer';

const rootReducer = combineReducers({
  movieReducer,
});

export default rootReducer;
