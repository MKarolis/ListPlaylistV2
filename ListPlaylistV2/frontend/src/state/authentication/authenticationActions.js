import {
    LOGIN_GOOGLE,
    LOGOUT_GOOGLE,
    LOGIN_SPOTIFY,
    LOGOUT_SPOTIFY,
    LOGOUT
} from './authenticationActionTypes';

export const loginWithGoogle = (username, token, expiresAt) => {
    return dispatch => {
        dispatch({
            type: LOGIN_GOOGLE,
            payload: {token, username, expiresAt}
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

export const loginWithSpotify = (token, expiresAt) => {
    return dispatch => {
        dispatch({
            type: LOGIN_SPOTIFY,
            payload: {token, expiresAt}
        });
    }
};
export const logoutFromSpotify = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_SPOTIFY,
            payload: ""
        });
    }
};
export const completeLogout = () => {
    console.log("we got here");
    return dispatch => {
        dispatch({
            type: LOGOUT,
            payload: ""
        });
    };
};
