import { LOGIN, LOGOUT, REGISTER } from '../constants/constants';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
