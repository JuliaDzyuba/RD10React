/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMoviesList, getCurrentMovie } from '../actions/actions';

const initialState = {
  moviesList: [],
  currentMovie: null,
  isError: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    editMovie: (state, action) => {
      const idx = state.moviesList.findIndex((item) => item.id === +action.payload.movieId);
      const newObj = {
        ...state.moviesList[idx],
        ...action.payload.formValue,
        genres: action.payload.formValue.genres.split(',').map((item) => {
          const newGenresObject = { id: `${Date.now()}-${item.name}}`, name: item };
          return newGenresObject;
        }),
      };
      state.moviesList[idx] = newObj;
      state.currentMovie = newObj;
    },
    deleteMovie: (state, action) => {
      const idx = state.moviesList.findIndex((item) => item.id === +action.payload);
      state.moviesList.splice(idx, 1);
    },
    addLikes: (state, action) => {
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      state.moviesList[idx].likes = action.payload.likes;
    },
    addRating: (state, action) => {
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      state.moviesList[idx].rating = action.payload.rating;
    },
  },
  extraReducers: {
    [getMoviesList.pending]: (state) => {
      state.isLoading = true;
    },
    [getMoviesList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.moviesList = action.payload;
    },
    [getMoviesList.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [getCurrentMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getCurrentMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentMovie = action.payload;
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.id);
      state.moviesList[idx] = { ...action.payload, isChanged: true };
    },
    [getCurrentMovie.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  editMovie,
  deleteMovie,
  addLikes,
  addRating,
  addInfo,
} = userSlice.actions;

export default userSlice.reducer;
