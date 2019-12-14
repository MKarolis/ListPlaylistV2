import React from "react";
import {Modal} from 'react-bootstrap'

import './PlaylistTransferModal.css';

class PlaylistTransferModal extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Poll results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="modal-heading">{this.props.question}</h4>
                    { this.state.loading ? <SmallLoadingIndicator/> :
                        this.state.options.map(option => <ResultsBar private={this.props.private} userVotes={option.votes_by_users} percent={option.percentage_of_votes} heading={option.option_text} />)}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
