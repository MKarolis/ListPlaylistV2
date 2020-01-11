import {
    SET_PLAYLIST_SOURCE, UNSET_PLAYLIST_SOURCE,
    REQUEST_PLAYLISTS, REQUEST_PLAYLISTS_SUCCESS, REQUEST_PLAYLISTS_ERROR,
    SET_SELECTED_PLAYLIST, UNSET_SELECTED_PLAYLIST,
} from './playlistsActionTypes';

import { PLAYLIST_SOURCE_SPOTIFY, PLAYLIST_SOURCE_YOUTUBE } from './playlistsSources';
import axios from 'axios';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';

export const setPlaylistSource = (source) => {
    return dispatch => {
        dispatch({
            type: SET_PLAYLIST_SOURCE,
            payload: source,
        });
    }
};

export const unsetPLaylistSource = () => {
    return dispatch => {
        dispatch({
            type: UNSET_PLAYLIST_SOURCE,
        });
    }
};

export const setSelectedPlaylist = (playlist) => {
    return {
        type: SET_SELECTED_PLAYLIST,
        payload: playlist,
    }
};

export const unsetSelectedPlaylist = () => {
    return dispatch => {
        dispatch({
            type: UNSET_SELECTED_PLAYLIST
        })
    }
};

const mapResponseToPlaylistObject = (source, response) => {
    let playlistObj = {
        id: '',
        imageUrl: '',
        title: '',
        owner: '',
        source: '',
        songCount: 0
    };

    let playlists = [];

    switch(source){
        case PLAYLIST_SOURCE_SPOTIFY:
            response.value.map(pl => {
                playlistObj = {
                    ...playlistObj,
                    id: pl.id,
                    imageUrl: pl.images[0].url,
                    title: pl.name,
                    owner: pl.owner.displayName,
                    source: "Spotify",
                    songCount: pl.tracks.total
                };
                playlists.push(playlistObj);
            });
            break;

        case PLAYLIST_SOURCE_YOUTUBE:
    }
    return playlists;
};

export const fetchPlaylists = (source, accessToken) => {
    return async dispatch => {
        dispatch(requestPlaylists());

        let sourceEndpoint = "/";
        let requestHeaders = {};
        switch (source) {
            case PLAYLIST_SOURCE_SPOTIFY:
                sourceEndpoint = "/api/spotify/playlists";
                requestHeaders = { spotifyAuthToken: accessToken };
                break;
            case PLAYLIST_SOURCE_YOUTUBE:
                sourceEndpoint = "/api/google/playlists";
                requestHeaders = { googleAuthToken: accessToken };
                break;
            default:
        }

        axios
            .get(`${WEB_APP_URL}${sourceEndpoint}`, { headers: requestHeaders })
            .then(response => {
                console.log(response);

                let playlists = mapResponseToPlaylistObject(source, response.data);

                dispatch(requestPlaylistsSuccess(playlists));
            })
            .catch(e => {
                console.log(e);
                const error = e && e.message ? e.message : 'System error';
                dispatch(requestPlaylistsError(error));
            });
    }
}

const requestPlaylists = () => {
    return {
        type: REQUEST_PLAYLISTS,
    }
}

const requestPlaylistsSuccess = (playlists) => {
    return {
        type: REQUEST_PLAYLISTS_SUCCESS,
        payload: playlists,
    }
}

const requestPlaylistsError = (error) => {
    return {
        type: REQUEST_PLAYLISTS_ERROR,
        payload: error,
    }
}
