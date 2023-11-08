// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  books: bookReducer,
  // ...other reducers if any
});

export default rootReducer;
