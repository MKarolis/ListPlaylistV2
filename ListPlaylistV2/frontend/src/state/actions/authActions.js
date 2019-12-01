import { LOGIN_GOOGLE, LOGOUT_GOOGLE } from './actionTypes';

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