import * as actionType from '../actions/auth/authActions';

const initialState = {
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.status,
      };
    default:
      return state;
  }
};

export default auth;
