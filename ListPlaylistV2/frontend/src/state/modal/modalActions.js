import { OPEN_MODAL, CLOSE_MODAL } from './modalActionTypes';

export const closeModal = () => {
	return dispatch => {
		dispatch({
			type: CLOSE_MODAL
		});
	};
};

export const openModal = () => {
	return dispatch => {
		dispatch({
			type: OPEN_MODAL
		});
	};
};
