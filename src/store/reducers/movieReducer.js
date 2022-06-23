import {
  ADD_LIKES,
  ADD_RATINGS,
  SET_MOVIES_LIST,
  SET_CURRENT_MOVIE,
} from '../constants/constants';

const initialState = {
  moviesList: [],
  currentMovie: null,
};

// eslint-disable-next-line default-param-last
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
    case ADD_LIKES: {
      const movie = state.moviesList.find((item) => item.id === action.payload.movieId);
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      movie.likes = action.payload.likes;
      state.moviesList.splice(idx, 1, movie);
      return {
        ...state,
        moviesList: [...state.moviesList],
      };
    }
    case ADD_RATINGS: {
      const movie = state.moviesList.find((item) => item.id === action.payload.movieId);
      const idx = state.moviesList.findIndex((item) => item.id === action.payload.movieId);
      movie.rating = action.payload.rating;
      state.moviesList.splice(idx, 1, movie);
      return {
        ...state,
        moviesList: [...state.moviesList],
      };
    }
    default:
      return state;
  }
};

export default movieReducer;
