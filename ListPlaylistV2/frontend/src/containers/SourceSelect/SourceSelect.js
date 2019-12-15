import React from 'react';
import { connect } from 'react-redux';

import './SourceSelect.css';
import spotifyLogoBlue from '../../assets/images/spotify-blue.svg';
import youtubeLogoBlue from '../../assets/images/youtube-blue.svg';

import * as CONSTANTS from '../../constants/Constants';
import * as migrateActions from '../../state/migration/migrationActions';

class SourceSelect extends React.Component {
	constructor(props) {
		super(props);

		this.setPlaylistSource = this.setPlaylistSource.bind(this);
	}

	setPlaylistSource = (e, source) => {
		e.preventDefault();
		this.props.setPlaylistSource(source);
		this.props.history.push('/convert');
	};

	render() {
		return (
			<React.Fragment>
				<div className="row">
					<h2 className="center-heading heading-big">
						Select playlist <br /> source
					</h2>
				</div>
				<div className="row mx-auto d-inline-flex">
					<div className="col-md-6 col-sm-6 com-xs-12">
						<a href="#" onClick={(e) => this.setPlaylistSource(e, CONSTANTS.PLAYLIST_SOURCE_YOUTUBE)}>
							<img src={youtubeLogoBlue} className="youtube-source-logo-blue source-logo" />
						</a>
					</div>
					<div className="col-md-6 col-sm-6 com-xs-12">
						<a href="#" onClick={(e) => this.setPlaylistSource(e, CONSTANTS.PLAYLIST_SOURCE_SPOTIFY)}>
							<img src={spotifyLogoBlue} className="spotify-source-logo-blue source-logo" />
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) =>({
	setPlaylistSource: (source) => dispatch(migrateActions.setPlaylistSource(source))
});

export default connect(mapStateToProps, mapDispatchToProps)(SourceSelect);
