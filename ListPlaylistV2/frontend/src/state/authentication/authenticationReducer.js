import {
    LOGIN_GOOGLE, LOGOUT_GOOGLE,
    LOGIN_SPOTIFY, LOGOUT_SPOTIFY
} from './authenticationActionTypes';

let initialState = {
    authenticatedWithGoogle: false,
    authenticatedWithSpotify: false,
    googleUser: '',
    spotifyUser: '',
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_GOOGLE:
            return {
                ...state,
                googleUser: action.payload,
                authenticatedWithGoogle: true,
            };
        case LOGOUT_GOOGLE:
            return {
                ...state,
                googleUser: null,
                authenticatedWithGoogle: false,
            };
        case LOGIN_SPOTIFY:
            return {
                ...state,
                spotifyUser: action.payload,
                authenticatedWithSpotify: true,
            };
        case LOGOUT_SPOTIFY:
            return {
                ...state,
                spotifyUser: null,
                authenticatedWithSpotify: false,
            };
        default:
            return {
                ...state,
            };
    }
    
    return state;
}

export default authenticationReducer;