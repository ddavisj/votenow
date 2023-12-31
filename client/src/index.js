import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// import _ from 'lodash';

/// TEMP:
// import axios from 'axios';
// window.axios = axios;
// window._ = _;

const { Path } = require('path-parser');
window.Path = Path;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   reducers,
   {},
   composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.querySelector('#root')
);
