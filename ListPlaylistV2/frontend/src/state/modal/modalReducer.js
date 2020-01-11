import { OPEN_MODAL, CLOSE_MODAL } from './modalActionTypes';

let initialState = {
	isShown: false
};

const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				isShown: true
			};
		case CLOSE_MODAL:
			return {
				...state,
				isShown: false
			};
		default:
			return state;
	}
};

export default modalReducer;
