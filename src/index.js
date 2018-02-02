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

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

function Boss(props) {
  return <h2>Boss页面</h2>
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <AuthRoute />
        <Route path="/boss" component={Boss} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
