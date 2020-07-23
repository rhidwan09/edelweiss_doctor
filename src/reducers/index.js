import { combineReducers } from 'redux';
import auth from './auth';
import encounter from './encounter';

export default combineReducers({
  authReducer: auth,
  encounterReducer: encounter
});
