import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './../../assets/images/logo.svg';
import './navbar.css';

export const navbar = () => (
	<Navbar expand="lg" className="navbar">
		<Navbar.Brand href="/">
			<img
				src={logo}
				className="d-inline-block align-top logo"
				alt="List Playlist logo"
			/>
		</Navbar.Brand>
	</Navbar>
);

export default navbar;
