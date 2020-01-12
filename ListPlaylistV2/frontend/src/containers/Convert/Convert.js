import React from 'react';
import { connect } from 'react-redux';
import './Convert.css';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable';
import {
	PLAYLIST_SOURCE_SPOTIFY,
	PLAYLIST_SOURCE_YOUTUBE
} from '../../state/playlists/playlistsSources';
import * as playlistsActions from '../../state/playlists/playlistsActions';
import LoadingWide from '../../components/LoadingWide/LoadingWide';
import PlaylistTransferModal from '../PlaylistTransferModal/PlaylistTransferModal';
import { openModal } from '../../state/modal/modalActions';

class Convert extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const {
			source,
			googleToken,
			spotifyToken,
			fetchPlaylists,
			unsetSelectedPlaylist
		} = this.props;

		if (!source) {
			this.props.history.push('/source-select');
		}

		unsetSelectedPlaylist();

		switch (source) {
			case PLAYLIST_SOURCE_SPOTIFY:
				fetchPlaylists(source, spotifyToken);
				break;
			case PLAYLIST_SOURCE_YOUTUBE:
				fetchPlaylists(source, googleToken);
				break;
			default:
		}
	}
	/*DEBUGGING*/
	// handleClick(e) {
	// 	e.preventDefault();
	// 	console.log('sup');
	// }
	render() {
		const { isLoading, openModal, selectedPlaylist } = this.props;
		return (
			<React.Fragment>
				{isLoading ? (
					<LoadingWide />
				) : (
					<div className="container">
						<div className=" center-div">
							<h1 className="convert-heading">Select playlist to move</h1>
						</div>
						<div className="table-container">
							<PlaylistTable />
						</div>
						<div className="center-div high-container" onClick={openModal}>
							{/*<ConvertButton active={selectedPlaylist != null} className="cnv-btn"/>*/}
							<button
								disabled={selectedPlaylist == null}
								className="convert-btn"
							>
								CONVERT
							</button>
						</div>
					</div>
				)}
				<PlaylistTransferModal
					show={this.props.isShown}
					history={this.props.history}
					onHide={this.toggleModal}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	googleToken: state.authentication.googleAccessToken,
	spotifyToken: state.authentication.spotifyAccessToken,
	source: state.playlists.source,
	isLoading: state.playlists.isLoading,
	playlists: state.playlists.playlists,
	selectedPlaylist: state.playlists.selectedPlaylist,
	isShown: state.modal.isShown
});

const mapDispatchToProps = dispatch => ({
	fetchPlaylists: (source, accessToken) =>
		dispatch(playlistsActions.fetchPlaylists(source, accessToken)),
	unsetSelectedPlaylist: () =>
		dispatch(playlistsActions.unsetSelectedPlaylist()),
	openModal: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Convert);
