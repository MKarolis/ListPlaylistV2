import {
    LOGIN_GOOGLE,
    LOGOUT_GOOGLE,
    LOGIN_SPOTIFY,
    LOGOUT_SPOTIFY,
} from './authenticationActionTypes';

export const loginWithGoogle = (token) => {
    return dispatch => {
        dispatch({
            type: LOGIN_GOOGLE,
            payload: token
        });
    }
}
export const logoutFromGoogle = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_GOOGLE,
            payload: ""
        });
    }
}

export const loginWithSpotify = (token) => {
    return dispatch => {
        dispatch({
            type: LOGIN_SPOTIFY,
            payload: token
        });
    }
}
export const logoutFromSpotify = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_SPOTIFY,
            payload: ""
        });
    }
}