import {SET_PLAYLIST_SOURCE, UNSET_PLAYLIST_SOURCE} from "./migrationActionTypes";

export const setPlaylistSource = (source) => {
    return dispatch => {
        dispatch({
            type: SET_PLAYLIST_SOURCE,
            payload: source
        });
    }
};

export const unsetPLaylistSource = () => {
    return dispatch => {
        dispatch({
           type: UNSET_PLAYLIST_SOURCE,
           payload: ''
        });
    }
}
