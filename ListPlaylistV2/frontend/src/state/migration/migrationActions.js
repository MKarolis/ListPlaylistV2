import {
    SET_MIGRATION_SOURCE, UNSET_MIGRATION_SOURCE,
} from './migrationActionTypes';
import { MIGRATION_SOURCE_SPOTIFY, MIGRATION_SOURCE_YOUTUBE } from './migrationSources';
import axios from 'axios';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';

export const setMigrationSource = (source) => {
    return dispatch => {
        dispatch({
            type: SET_MIGRATION_SOURCE,
            payload: source,
        });
    }
};

export const unsetMigrationSource = () => {
    return dispatch => {
        dispatch({
            type: UNSET_MIGRATION_SOURCE,
        });
    }
}