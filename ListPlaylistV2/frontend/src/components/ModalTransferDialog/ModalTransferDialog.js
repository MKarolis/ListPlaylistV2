import React from 'react';
import { connect } from 'react-redux';
import LoadingSmall from '../LoadingSmall/LoadingSmall';
import { migratePlaylist } from '../../state/migration/migrationActions';
import { closeModal } from '../../state/modal/modalActions';

function ModalTransferDialog(props) {
	const { playlist, loading, spotifyToken, googleToken, closeModal, source } = props;

	const handleTransferClick = (e) => {
		e.preventDefault();
		props.migratePlaylist(spotifyToken, googleToken, playlist.id, source);
	}

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-lg-9 align-self-center align-content-center">
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
				<div className="col-lg-3 align-self-center">
					<div className="transfer-controls-holder">
						{loading ? (
							<LoadingSmall />
						) : (
							<React.Fragment>
								<button
									className="standart-btn transfer-control-btn"
									onClick={handleTransferClick}
								>
									TRANSFER
								</button>
								<button
									className="standart-btn transfer-control-btn"
									onClick={closeModal}
								>
									CANCEL
								</button>{' '}
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
	source: state.playlists.source,
	loading: state.migration.isBeingConverted,
	spotifyToken: state.authentication.spotifyAccessToken,
	googleToken: state.authentication.googleAccessToken
});

const mapDispatchToProps = dispatch => ({
	migratePlaylist: (spotifyToken, googleToken, id, source) => dispatch(migratePlaylist(spotifyToken, googleToken, id, source)),
	closeModal: () => dispatch(closeModal()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalTransferDialog);
