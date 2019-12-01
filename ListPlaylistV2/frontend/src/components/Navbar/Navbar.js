import React from 'react';
import './Navbar.css';
import { Navbar } from 'react-bootstrap';
import logo from './../../assets/images/logo.svg';

export const navbar = () => (
    <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="/">
            <img
                src={logo}
                className="d-inline-block align-top logo"
                alt="ListPlaylist logo"
            />
        </Navbar.Brand>
        <Navbar.Text className="logged-in-as-label">
            Hello, guest
        </Navbar.Text>
    </Navbar>
);

export default navbar;
