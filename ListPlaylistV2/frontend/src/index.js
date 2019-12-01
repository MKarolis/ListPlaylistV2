import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './state/store';
import App from './containers/App/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
