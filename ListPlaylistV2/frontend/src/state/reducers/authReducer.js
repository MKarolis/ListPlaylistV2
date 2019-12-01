import { LOGIN_GOOGLE, LOGOUT_GOOGLE } from '../actions/actionTypes';

let initialAuthState = {
    authenticatedWithGoogle: false,
    authenticatedWithSpotify: false,
    googleUser: '',
    spotigyUser: ''
}

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN_GOOGLE:
            return { ...state, googleUser: action.payload, authenticatedWithGoogle: true };
        case LOGOUT_GOOGLE:
            return { ...state, googleUser: '', authenticatedWithGoogle: false };
    }
    return state;
}

export default authReducer;