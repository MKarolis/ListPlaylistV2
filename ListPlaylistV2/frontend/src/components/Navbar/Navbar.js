import React from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../state/authentication/authenticationActions';
import {Navbar, NavItem, NavLink} from 'react-bootstrap';
import logo from './../../assets/images/logo.svg';
import './Navbar.css';

class navbar extends React.Component{
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    getRenderText = (loggedInGoogle, loggedInSpotify) =>{
        if(loggedInGoogle){
            return <span className="hide-on-very-small">{"Hello, "+this.props.username}</span>;
        }
        else if(loggedInSpotify){
            return <span className="hide-on-very-small">Logged in with Spotify</span>;
        }
        return <span>Hello, guest</span>;
    }

    logOut = (e) =>{
        e.preventDefault();
        this.props.logOut();
    };

    render() {
        const {loggedInGoogle, loggedInSpotify} = this.props;
        return (
            <Navbar expand="lg" className="navbar">
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        className="d-inline-block align-top logo"
                        alt="ListPlaylist logo"
                    />
                </Navbar.Brand>
                <NavItem className="creds-container">
                    <Navbar.Text className="logged-in-as-label">
                        {this.getRenderText(loggedInGoogle, loggedInSpotify)}

                        {loggedInGoogle||loggedInSpotify ?
                            <a className="log-out-link" href="#" onClick={this.logOut}>Log out</a> : ''}
                    </Navbar.Text>
                </NavItem>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedInSpotify: state.authentication.authenticatedWithSpotify,
    loggedInGoogle : state.authentication.authenticatedWithGoogle,
    username: state.authentication.googleUserName
});

const mapDisptachToProps = (dispatch) => ({
    logOut: () => dispatch(authActions.completeLogout())
})

export default connect(mapStateToProps, mapDisptachToProps)(navbar);
