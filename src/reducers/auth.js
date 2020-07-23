import * as actionType from '../actions/auth/authActions';

const initialState = {
  isLoggedIn: false,
  inboxLength: 0,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.status,
      };
    case 'SET_INBOX_LENGTH':
      return {
        ...state,
        inboxLength: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
