import {
    START_MIGRATION,
    FINISH_MIGRATION_SUCCESS,
    FINISH_MIGRATION_ERROR,
    RESET_MIGRATION_STATE
} from "./migrationActionTypes";

let initialState = {
    isBeingConverted: false,
    playlistConverted: false,
    hasError: false,
    error: null,
    generatedGoogleLink: ''
};

const migrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_MIGRATION:
            return {
                ...state,
                isBeingConverted: true,
                playlistConverted: false,
                hasError: false,
                error: null,
            };
        case FINISH_MIGRATION_SUCCESS:
            return {
                ...state,
                isBeingConverted: false,
                playlistConverted: true,
            };
        case FINISH_MIGRATION_ERROR:
            return {
                ...state,
                isBeingConverted: false,
                playlistConverted: false,
                hasError: true,
                error: action.payload,
            };
        case RESET_MIGRATION_STATE:
            return {...initialState};
        default:
            return state;
    }
};

export default migrationReducer;
