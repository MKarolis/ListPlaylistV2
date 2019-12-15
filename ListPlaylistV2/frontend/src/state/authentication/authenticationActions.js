import {
    LOGIN_GOOGLE,
    LOGOUT_GOOGLE,
    LOGIN_SPOTIFY,
    LOGOUT_SPOTIFY,
    LOGOUT
} from './authenticationActionTypes';

import { UNSET_PLAYLIST_SOURCE } from '../playlists/playlistsActionTypes';
import { UNSET_MIGRATION_SOURCE } from '../migration/migrationActionTypes';

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
        });
        dispatch({
            type: UNSET_PLAYLIST_SOURCE,
        });
        dispatch({
            type: UNSET_MIGRATION_SOURCE,
        })
    }
};

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
        });
        dispatch({
            type: UNSET_PLAYLIST_SOURCE,
        });
        dispatch({
            type: UNSET_MIGRATION_SOURCE,
        })
    }
};
export const completeLogout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT,
        });
        dispatch({
            type: UNSET_PLAYLIST_SOURCE,
        });
        dispatch({
            type: UNSET_MIGRATION_SOURCE,
        })
    };
};
