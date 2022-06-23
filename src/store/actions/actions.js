import * as actionTypes from '../constants/constants';

export const setMoviesListToStore = (moviesList) => ({
  type: actionTypes.SET_MOVIES_LIST,
  payload: moviesList,
});

export const setCurrentMovie = (movie) => ({
  type: actionTypes.SET_CURRENT_MOVIE,
  payload: movie,
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
