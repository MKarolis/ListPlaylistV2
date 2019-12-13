import {
    LOGIN_GOOGLE, LOGOUT_GOOGLE,
    LOGIN_SPOTIFY, LOGOUT_SPOTIFY
} from './authenticationActionTypes';

let initialState = {
    authenticatedWithGoogle: false,
    authenticatedWithSpotify: false,
    googleUserName: '',
    spotifyUserName: '',
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_GOOGLE:
            return {
                ...state,
                googleUserName: action.payload,
                authenticatedWithGoogle: true,
            };
        case LOGOUT_GOOGLE:
            return {
                ...state,
                googleUserName: null,
                authenticatedWithGoogle: false,
            };
        case LOGIN_SPOTIFY:
            return {
                ...state,
                spotifyUserName: action.payload,
                authenticatedWithSpotify: true,
            };
        case LOGOUT_SPOTIFY:
            return {
                ...state,
                spotifyUserName: null,
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
