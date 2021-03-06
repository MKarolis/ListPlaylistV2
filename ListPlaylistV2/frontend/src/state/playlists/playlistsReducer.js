import {
    SET_PLAYLIST_SOURCE,
    UNSET_PLAYLIST_SOURCE,
    REQUEST_PLAYLISTS,
    REQUEST_PLAYLISTS_SUCCESS,
    REQUEST_PLAYLISTS_ERROR,
    SET_SELECTED_PLAYLIST,
    UNSET_SELECTED_PLAYLIST,
} from "./playlistsActionTypes";

let initialState = {
    source: null,
    isLoading: false,
    hasError: false,
    error: null,
    playlists: [],
    selectedPlaylist: null,
};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYLIST_SOURCE:
            return {
                ...state,
                playlists: [],
                source: action.payload
            };
        case UNSET_PLAYLIST_SOURCE:
            return {
                ...state,
                playlists: [],
                source: null,
                selectedPlaylist: null
            };
        case SET_SELECTED_PLAYLIST:
            return {
                ...state,
                selectedPlaylist: action.payload,
            };
        case REQUEST_PLAYLISTS:
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        case REQUEST_PLAYLISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                hasError: false,
                playlists: action.payload,
            };
        case REQUEST_PLAYLISTS_ERROR:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                error: action.payload,
            };
        case UNSET_SELECTED_PLAYLIST:
            return{
                ...state,
                selectedPlaylist: null
            };
        default:
            return state;
    }
};

export default playlistsReducer;
