import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';




import createBrowserHistory from 'history/createBrowserHistory';
import {syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react';
import stores from './stores';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, stores.routingStore);

ReactDOM.render(<Provider {...stores}><Router history={history}  ><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
