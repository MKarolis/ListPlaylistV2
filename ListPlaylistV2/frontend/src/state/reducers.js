import { combineReducers } from 'redux';
import authenticationReducer from './authentication/authenticationReducer';
import migrationReducer from './migration/migrationReducer';
import playlistsReducer from './playlists/playlistsReducer';
import modalReducer from './modal/modalReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const playlistsPersistConfig = {
	key: 'listplaylist',
	storage: storage,
	blacklist: ['hasError', 'error'],
};

export default combineReducers({
	authentication: authenticationReducer,
	migration: migrationReducer,
	playlists: playlistsReducer,
	modal: modalReducer
});
