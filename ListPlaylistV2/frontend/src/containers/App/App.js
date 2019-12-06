import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NavigationBar from '../../components/Navbar/Navbar';
import Home from '../Home/Home';
import Convert from '../Convert/Convert';

import './App.css';

const NotFound = () => (
	<div>
		<h1>NotFound</h1>
	</div>
);

function App(props) {
	return (
		<div className="App">
			<NavigationBar />
			<main>
				<Router history={props.history}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/convert" component={Convert} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</main>
		</div>
	);
}

export default App;
