import {
    START_MIGRATION,
    FINISH_MIGRATION_SUCESS,
    FINISH_MIGRATION_ERROR,
    RESET_MIGRATION_STATE, FINISH_MIGRATION_SUCCESS
} from './migrationActionTypes';
import axios from 'axios';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';
import { PLAYLIST_SOURCE_SPOTIFY, PLAYLIST_SOURCE_YOUTUBE } from '../playlists/playlistsSources';

export const migratePlaylist = (spotifyToken, googleToken, id, source) => {
    return dispatch => {
        dispatch({type: START_MIGRATION});

        let urlPath;
        switch (source) {
            case PLAYLIST_SOURCE_SPOTIFY:
                urlPath = 'google/playlist';
                break;
            case PLAYLIST_SOURCE_YOUTUBE:
                urlPath = 'spotify/playlist';
                break;
            default:
                urlPath = null;
        }

        axios
            .post(
                `${WEB_APP_URL}/api/${urlPath}`,
                {},
                {
                    headers: {
                        spotifyAuthToken: spotifyToken,
                        googleAuthToken: googleToken,
                        playlistId: id
                    }
                }
            )
            .then(response => {
                console.log(response);
                dispatch({type: FINISH_MIGRATION_SUCCESS});
            })
            .catch(e => {
                console.log(e);
                dispatch({type: FINISH_MIGRATION_ERROR, payload: e})
            });
    };
};

export const resetMigrationState = () => {
    return {
        type: RESET_MIGRATION_STATE,
    }
};

