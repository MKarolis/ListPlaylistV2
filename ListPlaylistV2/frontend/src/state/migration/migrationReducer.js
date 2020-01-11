import {
    START_MIGRATION, FINISH_MIGRATION, RESET_MIGRATION_STATE
} from "./migrationActionTypes";

let initialState = {
    isBeingConverted: false,
    playlistConverted: false,
    generatedGoogleLink: ''
};

const migrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_MIGRATION:
            return {
                ...state,
                isBeingConverted: true,
                playlistConverted: false
            };
        case FINISH_MIGRATION:
            return {
                ...state,
                isBeingConverted: false,
                playlistConverted: true
            };
        case RESET_MIGRATION_STATE:
            return {...initialState};
        default:
            return state;
    }
};

export default migrationReducer;
