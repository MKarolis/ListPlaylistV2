import React from 'react';
import NavigationBar from './components/header/navbar';
import headphones from './assets/images/headphones.svg';
import spotifyLogo from './assets/images/spotify-logo.svg';
import googleLogo from './assets/images/google-logo.svg';

function App() {
    return (
        <div className="App">
            <NavigationBar />
            <main>
                <div className="row">
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
                                <br className="hide-on-mobile" /> Youtube <br className="hide-on-mobile" />and vice versa!
							</h1>
                        </div>
                        <div className="row">
                            <div className="login-button-container">
                                <button className="spotify login-btn">
                                    <img
                                        src={spotifyLogo}
                                        alt="google-logo"
                                        className="spotify-img"
                                    />
                                    <span>Login with Spotify</span>
                                </button>

                                <button className="google login-btn">
                                    <img
                                        src={googleLogo}
                                        alt="spotify-logo"
                                        className="google-img"
                                    />
                                    <span>Login with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
