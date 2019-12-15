import React from 'react';
import { connect } from 'react-redux';
import './Convert.css';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable';
import ConvertButton from '../../components/Button/Button';
import { PLAYLIST_SOURCE_SPOTIFY, PLAYLIST_SOURCE_YOUTUBE } from '../../state/playlists/playlistsSources';
import * as playlistsActions from '../../state/playlists/playlistsActions';
import LoadingWide from '../../components/LoadingWide/LoadingWide';

class Convert extends React.Component {
	constructor(props) {
		super(props);
    }

    componentDidMount() {
		const {
			source, googleToken, spotifyToken, fetchPlaylists
		} = this.props;

		if (!source) {
			this.props.history.push('/source-select');
		}

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

	render() {
        const {
             isLoading,
        } = this.props;
		return (
			<React.Fragment>
				{isLoading ? (
					<LoadingWide />
				) : (
					<div className="container">
						<div className=" center-div">
							<h1 className="convert-heading">Select playlist to move</h1>
						</div>
						<PlaylistTable/>
						<div className="center-div high-container">
							<ConvertButton className="cnv-btn" />
						</div>
					</div>
				)}
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchPlaylists: (source, accessToken) => dispatch(playlistsActions.fetchPlaylists(source, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Convert);
