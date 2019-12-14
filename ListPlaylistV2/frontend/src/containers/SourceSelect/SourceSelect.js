import React from 'react';
import { connect } from 'react-redux';

import './SourceSelect.css';
import spotifyLogoBlue from '../../assets/images/spotify-blue.svg';
import youtubeLogoBlue from '../../assets/images/youtube-blue.svg';

class SourceSelect extends React.Component {
	constructor(props) {
		super(props);
	}

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
						<a href="#">
							<img src={youtubeLogoBlue} className="youtube-source-logo-blue source-logo" />
						</a>
					</div>
					<div className="col-md-6 col-sm-6 com-xs-12">
						<a href="#">
							<img src={spotifyLogoBlue} className="spotify-source-logo-blue source-logo" />
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	authenticatedWithGoogle: state.authentication.authenticatedWithGoogle
});

export default connect(mapStateToProps)(SourceSelect);
