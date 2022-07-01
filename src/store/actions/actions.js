import * as actionTypes from '../constants/constants';

export const setMoviesListToStore = (moviesList) => ({
  type: actionTypes.SET_MOVIES_LIST,
  payload: moviesList,
});

export const setCurrentMovie = (movie) => ({
  type: actionTypes.SET_CURRENT_MOVIE,
  payload: movie,
});

export const addMovieInfo = (movieId, additions) => ({
  type: actionTypes.ADD_MOVIE_INFO,
  payload: {
    movieId,
    additions,
  },
});

export const editMovie = (movieId, changes) => ({
  type: actionTypes.EDIT_MOVIE,
  payload: {
    movieId,
    changes,
  },
});

export const deleteMovie = (movieId) => ({
  type: actionTypes.DELETE_MOVIE,
  payload: movieId,
});

export const addLikes = (movieId, likes) => ({
  type: actionTypes.ADD_LIKES,
  payload: {
    movieId,
    likes,
  },
});

export const addRating = (movieId, rating) => ({
  type: actionTypes.ADD_RATINGS,
  payload: {
    movieId,
    rating,
  },
});

export const login = (userData) => ({
  type: actionTypes.LOGIN,
  payload: userData,
});

export const register = (userData) => ({
  type: actionTypes.LOGIN,
  payload: userData,
});

export const logout = () => ({
  type: actionTypes.LOGIN,
});
