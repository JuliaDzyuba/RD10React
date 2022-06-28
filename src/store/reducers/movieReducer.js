import {
  ADD_LIKES,
  ADD_RATINGS,
  SET_MOVIES_LIST,
  SET_CURRENT_MOVIE,
  ADD_MOVIE_INFO,
  EDIT_MOVIE,
  DELETE_MOVIE,
} from '../constants/constants';

const initialState = {
  moviesList: [],
  currentMovie: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES_LIST:
      return {
        ...state,
        moviesList: [...action.payload],
      };
    case SET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: action.payload,
      };
    case ADD_MOVIE_INFO: {
      const movie = { ...state.moviesList.find((item) => item.id === +action.payload.movieId) };
      const idx = state.moviesList.findIndex((item) => item.id === +action.payload.movieId);
      const newObj = {
        ...movie,
        isChanged: true,
        ...action.payload.additions,
      };
      const newList = [...state.moviesList];
      newList.splice(idx, 1, newObj);
      return {
        ...state,
        currentMovie: newObj,
        moviesList: [...newList],
      };
    }
    case ADD_LIKES: {
      const movie = { ...state.moviesList.find((item) => item.id === action.payload.movieId) };
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      movie.likes = action.payload.likes;
      const newList = [...state.moviesList];
      newList.splice(idx, 1, movie);
      return {
        ...state,
        moviesList: [...newList],
      };
    }
    case ADD_RATINGS: {
      const movie = { ...state.moviesList.find((item) => item.id === action.payload.movieId) };
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      movie.rating = action.payload.rating;
      const newList = [...state.moviesList];
      newList.splice(idx, 1, movie);
      return {
        ...state,
        moviesList: [...newList],
      };
    }
    case EDIT_MOVIE: {
      const movie = { ...state.moviesList.find((item) => item.id === +action.payload.movieId) };
      const idx = state.moviesList.findIndex((item) => item.id === +action.payload.movieId);
      const newObj = {
        ...movie,
        ...action.payload.changes,
        genres: action.payload.changes.genres.split(',').map((item) => {
          const newGenresObject = { id: Date.now(), name: item };
          return newGenresObject;
        }),
      };
      const newList = [...state.moviesList];
      newList.splice(idx, 1, newObj);
      return {
        ...state,
        moviesList: [...newList],
        currentMovie: { ...newObj },
      };
    }
    case DELETE_MOVIE: {
      const idx = state.moviesList.findIndex((item) => item.id === +action.payload);
      const newList = [...state.moviesList];
      newList.splice(idx, 1);
      return {
        ...state,
        moviesList: [...newList],
        currentMovie: null,
      };
    }
    default:
      return state;
  }
};

export default movieReducer;
