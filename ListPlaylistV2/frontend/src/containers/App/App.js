import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/Navbar/Navbar';
import Home from '../Home/Home';
import Convert from '../Convert/Convert';

import ProtectedRoute from "../Routes/ProtectedRoute";

import {checkCredentialsExpire} from "../../utils/auth/checkTokenExpire";

import './App.css';
import CallbackSpotify from "../CallbackSpotify/CallbackSpotify";

const NotFound = () => (
	<div>
		<h1>404</h1>
		<h1>Page Not Found</h1>
	</div>
);

function App(props) {
	checkCredentialsExpire();

	return (
		<div className="App">
			<NavigationBar />
			<main>
				<Router history={props.history}>
					<Switch>
						<Route exact path="/" component={Home} />
						<ProtectedRoute exact path="/convert" component={Convert} />
						<Route path="/spotifyCallback" component={CallbackSpotify}/>
						<Route component={NotFound} />
					</Switch>
				</Router>
			</main>
		</div>
	);
}

export default App;
