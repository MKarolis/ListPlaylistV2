import React from "react";
import {connect} from 'react-redux';

import {completeLogout} from "../../state/authentication/authenticationActions";
import {resetMigrationState} from "../../state/migration/migrationActions";
import {unsetSelectedPlaylist} from "../../state/playlists/playlistsActions";

class ModalTransferSuccessDialog extends React.Component{
    constructor(props){
        super(props);

        this.onMigrateAnother = this.onMigrateAnother.bind(this);
    }

    onMigrateAnother = () =>{
        const {resetMigration, history} = this.props;
        resetMigration();
        history.replace('/source-select');
    };

    render() {
        const {logout, generatedLink} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <p className="playlist-migration-heading">Playlist migration successful!</p>
                </div>
                <div className="row">
                    <div className="col-sm-6 align-self-center">
                        <a target="_blank" rel="noopener noreferrer" className='link-to-playlist' href={generatedLink}>
                            <div className="link-card-holder">
                                <div className="lk-cube lk-cube1"></div>
                                <div className="lk-cube lk-cube2"></div>
                                <div className="lk-cube lk-cube3"></div>
                                <div className="lk-cube lk-cube4"></div>
                                <div className="lk-cube lk-cube5"></div>
                                <div className="lk-cube lk-cube6"></div>
                                <div className="lk-cube lk-cube7"></div>
                                <div className="lk-cube lk-cube8"></div>
                                <div className="lk-cube lk-cube9"></div>
                                <p>View<br/>playlist</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-6 align-self-center">
                        <div className="transfer-controls-holder success">
                            <button className="standart-btn transfer-control-btn" onClick={this.onMigrateAnother}>MIGRATE ANOTHER PLAYLIST</button>
                            <button className="standart-btn transfer-control-btn" onClick={logout}>LOG OUT</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    generatedLink: state.migration.generatedLink,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(completeLogout()),
    resetMigration: () => dispatch(resetMigrationState()),
    unsetSelectedPlaylist: () => dispatch(unsetSelectedPlaylist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalTransferSuccessDialog);
