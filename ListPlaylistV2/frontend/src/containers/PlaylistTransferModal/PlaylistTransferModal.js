import React from "react";
import {Modal} from 'react-bootstrap'

import './PlaylistTransferModal.css';
import ModalTransferDialog from "../../components/ModalTransferDialog/ModalTransferDialog";
import ModalTransferSuccessDialog from "../../components/ModalTransferSuccessDialog/ModalTransferSuccessDialog";

class PlaylistTransferModal extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.onHide} size="xl" centered>
                <Modal.Body className="migration-modal-body">
                    <ModalTransferDialog/>
                    {/*
                    <ModalTransferSuccessDialog/>*/}
                </Modal.Body>
            </Modal>
        );
    }
}

export default PlaylistTransferModal;
