import React from 'react';
import headphones from '../../assets/images/headphones.svg';
import spotifyLogo from '../../assets/images/spotify-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";

import {loginWithGoogle} from "../../state/authentication/authenticationActions";
import './Home.css';

import * as config from '../../config/GeneralConfig/GeneralConfig';
import * as spotifyConfig from '../../config/SpotifyConfig/SpotifyConfig';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.responseGoogle = this.responseGoogle.bind(this);
	}

	responseGoogle = (response) => {
		if(response.error){
			console.log(response.error);
			return;
		}
		console.log(response);
		this.props.googleLogin(response.profileObj.name, response.tokenObj.access_token, response.tokenObj.first_issued_at+0.9*(response.tokenObj.expires_in*1000));
	};

	render() {
		return (

			<div className="row">
				<div className="col d-none d-md-block">
					<img src={headphones} alt="headphones" className="headphones-img" />
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
							<a href={`${spotifyConfig.authEndpoint}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${spotifyConfig.redirectUri}
									&scope=${spotifyConfig.scopes.join("%20")}&response_type=${spotifyConfig.responseType}&show_dialog=true`}>
								<button className="spotify login-btn">
									<img
										src={spotifyLogo}
										alt="spotify-logo"
										className="spotify-img"
									/>
									<span>Login with Spotify</span>
								</button>
							</a>
							<GoogleLogin
								clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
								render={renderProps => (
									<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google login-btn">
										<img
											src={googleLogo}
											alt="google-logo"
											className="google-img"
										/>
										<span>Login with Google</span>
									</button>

								)}
								buttonText="Login"
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	googleLogin: (username, token, expiresAt) => dispatch(loginWithGoogle(username, token, expiresAt))
});

export default connect(null, mapDispatchToProps)(Home);
