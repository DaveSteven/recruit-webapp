import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';
import { Button } from 'antd-mobile';

@connect(state => ({ num: state.counter }), { addGun, removeGun, addGunAsync })
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">目前有{this.props.num}把机关枪</p>
        <Button onClick={this.props.addGun}>申请机关枪</Button>
        <Button onClick={this.props.removeGun}>上交机关枪</Button>
        <Button onClick={this.props.addGunAsync}>延迟上交</Button>
      </div>
    );
  }
}

export default App;
