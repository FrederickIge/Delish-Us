import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootStore from './stores';

const render = Component =>{
return ReactDOM.render(
  <Provider  { ...rootStore }>
      <App />
  </Provider>,
  document.getElementById('root')
);
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
