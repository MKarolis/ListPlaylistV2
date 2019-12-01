import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

let initialAuthState = {
    authenticatedWithGoogle: false,
    authenticatedWithSpotify: false,
    googleUser: 'USERIS',
    spotigyUser: ''
}

const store = createStore(authReducer, initialAuthState, applyMiddleware(thunk));

export default store;