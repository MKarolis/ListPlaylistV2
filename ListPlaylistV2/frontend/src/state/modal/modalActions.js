import { OPEN_MODAL, CLOSE_MODAL } from './modalActionTypes';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';

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
