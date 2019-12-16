import { OPEN_MODAL, CLOSE_MODAL } from './modalActionTypes';

let initialState = {
	isShown: false
};

const modalToggler = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				isShown: true
			};
		case CLOSE_MODAL:
			return {
				isShown: false
			};
		default:
			return state;
	}
};

export default modalToggler;
