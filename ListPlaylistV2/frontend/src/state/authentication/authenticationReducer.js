import {
    LOGIN_GOOGLE, LOGOUT_GOOGLE,
    LOGIN_SPOTIFY, LOGOUT_SPOTIFY, LOGOUT
} from './authenticationActionTypes';

let initialState = {
    authenticatedWithGoogle: false,
    authenticatedWithSpotify: false,
    googleUserName: '',
    googleAccessToken: '',
    spotifyUserName: '',
    spotifyAccessToken: '',
    spotifyExpiresAt: 0,
    googleExpiresAt: 0
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_GOOGLE:
            return {
                ...state,
                googleUserName: action.payload.username,
                googleAccessToken: action.payload.token,
                authenticatedWithGoogle: true,
                googleExpiresAt: action.expiresAt
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
                authenticatedWithSpotify: true,
                spotifyAccessToken: action.payload.token,
                spotifyExpiresAt: action.payload.expiresAt
            };
        case LOGOUT_SPOTIFY:
            return {
                ...state,
                spotifyUserName: null,
                authenticatedWithSpotify: false,
            };
        case LOGOUT:
            return {...initialState};
        default:
            return {
                ...state,
            };
    }

    return state;
}

export default authenticationReducer;
