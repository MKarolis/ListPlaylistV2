import React from 'react';
import { connect } from 'react-redux';
import LoadingSmall from '../LoadingSmall/LoadingSmall';
import { Modal } from 'react-bootstrap';

import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';
import {
	startMigration,
	finishMigration,
	resetMigrationState
} from '../../state/migration/migrationActions';
import { closeModal } from '../../state/modal/modalActions';

import axios from 'axios';

const migrate = (
	spotifyToken,
	googleToken,
	id,
	startMigration,
	finishMigration
) => {
	startMigration();
	axios
		.post(
			`${WEB_APP_URL}/api/google/playlist`,
			{},
			{
				headers: {
					spotifyAuthToken: spotifyToken,
					googleAuthToken: googleToken,
					playlistId: id
				}
			}
		)
		.then(response => {
			console.log(response);
			finishMigration();
		})
		.catch(e => {
			console.log(e);
		});
};

function ModalTransferDialog(props) {
	const { playlist, loading, spotifyToken, googleToken, closeModal } = props;
	//props.resetMigrationState();
	return (
		<React.Fragment>
			<div className="row">
				<div className="col-9 align-self-center align-content-center">
					<div className="playlist-info-holder">
						<img className="playlist-modal-img" src={playlist.imageUrl} />
						<div className="playlist-text-holder">
							<p className="playlist-title">{playlist.title}</p>
							<p>{playlist.songCount} songs</p>
							<p>Source: {playlist.source}</p>
							<p>Owner: {playlist.owner}</p>
						</div>
					</div>
				</div>
				<div className="col-3 align-self-center">
					<div className="transfer-controls-holder">
						{loading ? (
							<LoadingSmall />
						) : (
							<React.Fragment>
								<button
									className="standart-btn transfer-control-btn"
									onClick={() => {
										migrate(
											spotifyToken,
											googleToken,
											playlist.id,
											props.startMigration,
											props.finishMigration
										);
									}}
								>
									TRANSFER
								</button>
								<button
									className="standart-btn transfer-control-btn"
									// it's done
									onClick={closeModal}
								>
									CANCEL
								</button>{' '}
								{/*padarysi, kad onclick būtų show=false*/}
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
			<div className="row">
				{loading ? (
					<p className="playlist-migration-tip">
						Playlist migration in progress, please don't close this window.
					</p>
				) : (
					<p className="playlist-migration-tip">
						Press 'TRANSFER' to begin migrating the playlist
					</p>
				)}
			</div>
		</React.Fragment>
	);
}
const mapStateToProps = state => ({
	playlist: state.playlists.selectedPlaylist,
	// playlist: state.playlists.playlists[0],
	loading: state.migration.isBeingConverted,
	spotifyToken: state.authentication.spotifyAccessToken,
	googleToken: state.authentication.googleAccessToken
});

const mapDispatchToProps = dispatch => ({
	startMigration: () => dispatch(startMigration()),
	finishMigration: () => dispatch(finishMigration()),
	resetMigrationState: () => dispatch(resetMigrationState()),
	closeModal: () => dispatch(closeModal())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalTransferDialog);
