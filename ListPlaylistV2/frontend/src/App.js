import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './components/header/navbar';
import Home from './components/Home';

const NotFound = () => (<div><h1>NotFound</h1></div>);

function App() {
    return (
        <div className="App">
            <NavigationBar />
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
