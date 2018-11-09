import 'es6-promise/auto';
import 'normalize.css/normalize.css';

import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import Greetings from './containers/greetings/Greetings';
import Layout from './components/layout/Layout';
import browserHistory from './history';
import appReducer from './reducers/reducer';


const middleware = applyMiddleware(thunk);
const store = createStore(appReducer, middleware);

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Layout>
          <Route
            exact={true}
            path="/"
            render={() => (<Greetings />)}
          />
        </Layout>
      </Router>
    </Provider>,
  document.getElementById('root')
);
