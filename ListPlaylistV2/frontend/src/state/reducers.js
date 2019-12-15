import { combineReducers } from 'redux';
import authenticationReducer from './authentication/authenticationReducer';
import migrationReducer from "./migration/migrationReducer";

export default combineReducers({
     authentication: authenticationReducer,
     migration: migrationReducer
});
