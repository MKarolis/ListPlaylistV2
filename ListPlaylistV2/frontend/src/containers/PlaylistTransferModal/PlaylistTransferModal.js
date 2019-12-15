import React from "react";
import {Modal} from 'react-bootstrap'

import './PlaylistTransferModal.css';

class PlaylistTransferModal extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.onHide} size="xl" centered>
                <Modal.Body className="migration-modal-body">
                    <div className="row">
                        <div className="col-9">
                            <div className="playlist-info-holder">
                                <img className="playlist-modal-img" src="https://pl.scdn.co/images/pl/default/f679b3035cb86817744bdd66753848fb14d85027" />
                                <div className="playlist-text-holder">
                                    <p>Zuokai atiduok pinigus</p>
                                    <p>69 songs</p>
                                    <p>Owner: Carlos Mendez</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PlaylistTransferModal;
