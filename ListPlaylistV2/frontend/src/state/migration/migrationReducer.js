import {
    START_MIGRATION, FINISH_MIGRATION
} from "./migrationActionTypes";

let initialState = {
    isBeingConverted: false,
    playlistConverted: false
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
        default:
            return state;
    }
};

export default migrationReducer;
