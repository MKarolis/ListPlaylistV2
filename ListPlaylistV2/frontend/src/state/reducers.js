import { combineReducers } from 'redux';
import authenticationReducer from './authentication/authenticationReducer';
import migrationReducer from './migration/migrationReducer';
import playlistsReducer from './playlists/playlistsReducer';
import modalReducer from './modal/modalReducer';

export default combineReducers({
	authentication: authenticationReducer,
	migration: migrationReducer,
	playlists: playlistsReducer,
	modal: modalReducer
});
