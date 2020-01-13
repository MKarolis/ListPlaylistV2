import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from "./reducers";

const persistConfig = {
    key: 'primary',
    storage,
    blacklist: ['playlists', 'migration'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));

export const persistor = persistStore(store);


export default store;
