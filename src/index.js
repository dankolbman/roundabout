import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/react-hooks';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers from './reducers';
import client from './client';
import './index.css';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
