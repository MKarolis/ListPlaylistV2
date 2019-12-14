import { combineReducers } from 'redux';
import authenticationReducer from './authentication/authenticationReducer';

export default combineReducers({
     authentication: authenticationReducer
});
