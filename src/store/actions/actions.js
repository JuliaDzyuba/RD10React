import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import movieServices from '../../services/movieServices';

export const getMoviesList = createAsyncThunk(
  'movies/getMoviesList',
  async (thunk) => {
    try {
      const movies = await movieServices.getAll();
      return movies;
    } catch (error) {
      return thunk.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

export const getCurrentMovie = createAsyncThunk(
  'movies/getCurrentMovie',
  async (movieId, thunk) => {
    try {
      const movie = await movieServices.getDetailById(movieId);
      const credits = await movieServices.getCastById(movieId);
      return { ...movie, ...credits };
    } catch (error) {
      return thunk.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

export const getCurrentActor = createAsyncThunk(
  'movies/getCurrentActor',
  async (actorId, thunk) => {
    try {
      const actor = await movieServices.getActorById(actorId);
      return actor;
    } catch (error) {
      return thunk.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

export const setCurrentMovie = createAction('movies/setCurrentMovie');
export const editMovie = createAction('movies/editMovie');
export const deleteMovie = createAction('movies/deleteMovie');
export const addLikes = createAction('movies/addLikes');
export const addRating = createAction('movies/addRating');
export const login = createAction('user/login');
export const register = createAction('user/register');
export const logout = createAction('user/logout');
export const changeLang = createAction('user/changeLang');
