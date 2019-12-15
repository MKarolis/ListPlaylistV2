import React from 'react';
import spotifyLogo from '../../assets/images/spotify-logo.png';
import { connect } from 'react-redux';
import './Convert.css';
import SpotifyTable from '../../components/Table/Table';
import ConvertButton from '../../components/Button/Button';
import { WEB_APP_URL } from '../../config/GeneralConfig/GeneralConfig';
import * as CONSTANTS from '../../constants/Constants';

import axios from 'axios';
import LoadingWide from '../../components/LoadingWide/LoadingWide';

class Convert extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			playlists: []
		};
	}

	getPlaylistsFromSpotify(token) {
		this.setState({ ...this.state, loading: true });

		let requestHeaders = {
			spotifyAuthToken: token
		};

		axios
			.get(`${WEB_APP_URL}/api/spotify/playlists`, { headers: requestHeaders })
			.then(response => {
				console.log(response);
				this.setState({
					...this.state,
					loading: false,
					playlists: response.data.value
				});
			})
			.catch(e => {
				console.log(e);
			});
	}

	componentDidMount() {
		const { source, sourceSet, googleToken, spotifyToken } = this.props;
		if (!sourceSet) {
			this.props.history.push('/source-select');
		}

		if (source === CONSTANTS.PLAYLIST_SOURCE_SPOTIFY) {
			this.getPlaylistsFromSpotify(spotifyToken);
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.state.loading ? (
					<LoadingWide />
				) : (
					<div className="container">
						<div className=" center-div">
							<h1 className="convert-heading">Select playlist to move</h1>
						</div>
						<SpotifyTable playlists={this.state.playlists} />
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
	source: state.migration.source,
	sourceSet: state.migration.sourceSet
});

//export default Home;

export default connect(mapStateToProps)(Convert);
