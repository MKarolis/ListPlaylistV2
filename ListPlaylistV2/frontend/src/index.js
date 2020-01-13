import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import {PersistGate} from "redux-persist/integration/react";
import GlobalErrorBoundary from "./containers/GlobalErrorBoundary/GlobalErrorBoundary";

import store, {persistor} from './state/store';

import App from './containers/App/App';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

import * as serviceWorker from "./registerServiceWorker";

const history = createBrowserHistory();

ReactDOM.render(
        <Provider store={store}>
            <GlobalErrorBoundary>
                <PersistGate loading={null} persistor={persistor}>
                    <App history={history}/>
                </PersistGate>
            </GlobalErrorBoundary>
        </Provider>,
    document.getElementById('root')
);

//registerServiceWorker();
serviceWorker.unregister();
