import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import App from './App';
import { logout } from './Auth.redux';
import { connect } from 'react-redux';

class Sumey extends React.Component {
  render() {
    console.log(this.props);
    return <h1>Sumey是小仙女。</h1>;
  }
}

function David() {
  return <h1>David最爱小仙女。</h1>;
}

@connect(state => state.auth, { logout })
class Dashboard extends React.Component {
  render() {
    const match = this.props.match;
    const redirectToLogin = <Redirect to="/login" />;
    const app = (
      <div>
        { this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null }
        <ul>
          <li>
            <Link to={`${match.url}/`}>主页</Link>
          </li>
          <li>
            <Link to={`${match.url}/sumey`}>Sumey</Link>
          </li>
          <li>
            <Link to={`${match.url}/david`}>David</Link>
          </li>
        </ul>
        <Route path="/dashboard" exact component={App} />
        <Route path="/dashboard/sumey" component={Sumey} />
        <Route path="/dashboard/david" component={David} />
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;
