/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (store, action) => {
      store.user = action.payload;
    },
    register: (store, action) => {
      store.user = action.payload;
    },
    logout: (store) => {
      store.user = null;
    },
  },
});

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
