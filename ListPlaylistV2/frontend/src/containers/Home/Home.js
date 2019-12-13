import React from 'react';
import headphones from '../../assets/images/headphones.svg';
import spotifyLogo from '../../assets/images/spotify-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import { connect } from 'react-redux';
import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { googleUser } = this.props;
		return (
			<div className="row">
				{googleUser}
				<div className="col d-none d-md-block">
					<img
						src={headphones}
						alt="headphones"
						className="headphones-img"
					></img>
				</div>
				<div className="col">
					<div className="row">
						<h1 className="welcome-text">
							Transfer your playlist from Spotify to
							<br className="hide-on-mobile" /> Youtube{' '}
							<br className="hide-on-mobile" />
							and vice versa!
						</h1>
					</div>
					<div className="row">
						<div className="login-button-container">
							<button className="spotify login-btn">
								<img
									src={spotifyLogo}
									alt="spotify-logo"
									className="spotify-img"
								/>
								<span>Login with Spotify</span>
							</button>

							<button className="google login-btn">
								<img
									src={googleLogo}
									alt="google-logo"
									className="google-img"
								/>
								<span>Login with Google</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	googleUser: state.googleUser
});

export default connect(mapStateToProps)(Home);
