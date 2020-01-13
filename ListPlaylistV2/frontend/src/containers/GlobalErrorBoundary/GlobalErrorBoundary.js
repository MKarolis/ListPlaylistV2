import React from 'react';
import './GlobalErrorBoundary.css';
import { connect } from 'react-redux';
import * as playlistsActions from "../../state/playlists/playlistsActions";
import {closeModal, openModal} from "../../state/modal/modalActions";
import {resetMigrationState} from "../../state/migration/migrationActions";

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        // log here
    }

    render() {
        const {
            hasErrorPlaylists, hasErrorMigration
        } = this.props;

        console.log(`Error: ${hasErrorPlaylists}`);

        if (this.state.hasError || hasErrorPlaylists || hasErrorMigration) {
            return (
                <div className="error-text-div">
                    <h1 className="error-text">Something went wrong :(</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

const mapStateToProps = state => ({
    hasErrorPlaylists: state.playlists.hasError,
    hasErrorMigration: state.migration.hasError,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalErrorBoundary);
