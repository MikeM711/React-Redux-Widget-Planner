import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import App from './App';
import rootReducer from './reducers';

const jwtToken = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.common['Authorization'] = jwtToken;

const store = createStore(rootReducer, {
  authRed: {
    token: jwtToken,
    isAuthenticated: jwtToken ? true : false
  }
}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();