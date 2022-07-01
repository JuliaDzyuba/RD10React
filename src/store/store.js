import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './slices/user.slice';
import movieReducer from './slices/movie.slice';

const store = configureStore({
  reducer: {
    userReducer,
    movieReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    logger,
  ],
  devTools: true,
});

export default store;
