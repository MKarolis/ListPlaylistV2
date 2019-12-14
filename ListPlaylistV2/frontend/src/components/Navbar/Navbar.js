import React from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../state/authentication/authenticationActions';
import {Navbar, NavItem, NavLink} from 'react-bootstrap';
import logo from './../../assets/images/logo.svg';
import './Navbar.css';

export const navbar = () => (
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
                Hello, guest
            </Navbar.Text>
            <a className="log-out-link" href="#">Log out</a>
        </NavItem>
    </Navbar>
);

const mapStateToProps = (state) => ({
    loggedInSpotify: state.authentication.authenticatedWithSpotify,
    loggedInGoogle : state.authentication.authenticatedWithGoogle,
    username: state.authentication.googleUserName
});

export default navbar;
