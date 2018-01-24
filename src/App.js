import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>现在有机枪{this.props.num}把</p>
        <Button onClick={this.props.addGun}>申请机关枪</Button>
        <Button onClick={this.props.removeGun}>上交机关枪</Button>
        <Button onClick={this.props.addGunAsync}>晚两天再给机关枪</Button>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return { num: state };
}
const actionCreators = { addGun, removeGun, addGunAsync };
App = connect(mapsStateToProps, actionCreators)(App);
export default App;
