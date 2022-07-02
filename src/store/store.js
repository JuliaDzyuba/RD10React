import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import movieReducer from './slices/movie.slice';
import logger from '../utils/myLogger';

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
