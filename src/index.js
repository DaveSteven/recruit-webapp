import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { counter } from './index.redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

class Sumey extends React.Component {
  render() {
    console.log(this.props);
    return <h1>Sumey是小仙女。</h1>;
  }
}

function David() {
  return <h1>David最爱小仙女。</h1>;
}

class Test extends React.Component {
  render() {
    console.log(this.props);
    return <h2>{this.props.match.params.location}</h2>;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">根目录</Link>
          </li>
          <li>
            <Link to="/Sumey">小仙女是谁？</Link>
          </li>
          <li>
            <Link to="/David">谁最爱小仙女？</Link>
          </li>
        </ul>
        {/* <Redirect to="/sumey" component={Sumey}></Redirect> */}
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/sumey" component={Sumey} />
          <Route path="/david" component={David} />
          <Route path="/:location" component={Test} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
