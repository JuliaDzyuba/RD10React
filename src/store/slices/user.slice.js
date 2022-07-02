/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  lang: 'en',
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
    changeLang: (store, action) => {
      store.lang = action.payload;
    },
  },
});

export const {
  login,
  register,
  logout,
  changeLang,
} = userSlice.actions;

export default userSlice.reducer;
