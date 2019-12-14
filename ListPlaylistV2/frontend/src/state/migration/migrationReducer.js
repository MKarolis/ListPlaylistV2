import {
    SET_PLAYLIST_SOURCE,
    UNSET_PLAYLIST_SOURCE
} from "./migrationActionTypes";

let initialState = {
    sourceSet: false,
    source: null
};

const migrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYLIST_SOURCE:
            return {
                ...state,
                sourceSet: true,
                source: action.payload
            };
        case UNSET_PLAYLIST_SOURCE:
            return {
                ...state,
                sourceSet: false,
                source: null
            };
        default:
            return state;
    }
};

export default migrationReducer;
