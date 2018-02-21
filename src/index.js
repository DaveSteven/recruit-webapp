import './style/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import reducers from './reducer';
import './config';

import Login from './container/login';
import Register from './container/register';
import AuthRoute from './components/authRoute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Dashboard from './components/dashboard';
import Chat from './components/chat';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
