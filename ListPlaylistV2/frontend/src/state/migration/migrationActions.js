import {
    START_MIGRATION, FINISH_MIGRATION, RESET_MIGRATION_STATE
} from './migrationActionTypes';
import { MIGRATION_SOURCE_SPOTIFY, MIGRATION_SOURCE_YOUTUBE } from './migrationSources';
import axios from 'axios';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';

export const startMigration = () =>{
    return dispatch => {
        dispatch({
            type: START_MIGRATION
        })
    }
};

export const finishMigration = () =>{
    return dispatch => {
        dispatch({
            type: FINISH_MIGRATION
        })
    }
};

export const resetMigrationState = () => {
    return dispatch => {
        dispatch({
            type: RESET_MIGRATION_STATE
        })
    }
};

