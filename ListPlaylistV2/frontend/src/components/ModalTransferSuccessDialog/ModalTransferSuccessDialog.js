import React from "react";
import {connect} from 'react-redux';

import {completeLogout} from "../../state/authentication/authenticationActions";
import {resetMigrationState} from "../../state/migration/migrationActions";

class ModalTransferSuccessDialog extends React.Component{
    constructor(props){
        super(props);

        this.onMigrateAnother = this.onMigrateAnother.bind(this);
    }

    onMigrateAnother = () =>{
        const {resetMigration, history} = this.props;
        resetMigration();
        history.replace('/source-select');
    }

    render() {
        const {logout} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <p className="playlist-migration-heading">Playlist migration successful!</p>
                </div>
                <div className="row">
                    <div className="col-8 align-self-center">
                        <div className="playlist-link-holder">
                            <iframe style={{"margin": "auto"}} width="560" height="315"
                                    src="https://www.youtube.com/embed/videoseries?list=PLfkUcD2YjpaccYz8AG8jfXSIPSyEtLGQn"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="col-4 align-self-center">
                        <div className="transfer-controls-holder">
                            <button className="standart-btn transfer-control-btn" onClick={this.onMigrateAnother}>MIGRATE ANOTHER PLAYLIST</button>
                            <button className="standart-btn transfer-control-btn" onClick={logout}>LOG OUT</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(completeLogout()),
    resetMigration: () => dispatch(resetMigrationState())
});

export default connect(null, mapDispatchToProps)(ModalTransferSuccessDialog);
