import React from 'react';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux';

import './PlaylistTransferModal.css';
import ModalTransferDialog from '../../components/ModalTransferDialog/ModalTransferDialog';
import ModalTransferSuccessDialog from '../../components/ModalTransferSuccessDialog/ModalTransferSuccessDialog';

class PlaylistTransferModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { finishedConverting } = this.props;
		return (
			<Modal show={this.isShown} onHide={this.props.onHide} size="xl" centered>
				<Modal.Body className="migration-modal-body">
					{!finishedConverting ? (
						<ModalTransferDialog show={this.props.isShown} />
					) : (
						<ModalTransferSuccessDialog history={this.props.history} />
					)}
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({
	finishedConverting: state.migration.playlistConverted
});

export default connect(mapStateToProps)(PlaylistTransferModal);
