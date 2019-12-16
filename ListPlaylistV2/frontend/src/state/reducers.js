import { combineReducers } from 'redux';
import authenticationReducer from './authentication/authenticationReducer';
import migrationReducer from './migration/migrationReducer';
import playlistsReducer from './playlists/playlistsReducer';

export default combineReducers({
	authentication: authenticationReducer,
	migration: migrationReducer,
	playlists: playlistsReducer
});
