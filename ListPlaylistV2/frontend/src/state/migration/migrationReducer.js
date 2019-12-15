import {
    SET_MIGRATION_SOURCE,
    UNSET_MIGRATION_SOURCE,
} from "./migrationActionTypes";

let initialState = {
    
};

const migrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MIGRATION_SOURCE:
            return {
                ...state,
                source: action.payload
            };
        case UNSET_MIGRATION_SOURCE:
            return {
                ...state,
                source: null
            };
        default:
            return state;
    }
};

export default migrationReducer;
