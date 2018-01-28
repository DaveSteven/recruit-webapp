import React from 'react';
import Logo from '@/components/logo';
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Register extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.state = {
        type: 'genius'
    }
  }

  login() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Logo />
        <List>
          <InputItem>用户</InputItem>
          <InputItem>密码</InputItem>
          <RadioItem checked={this.state.type === 'genius'}>牛人</RadioItem>
          <RadioItem checked={this.state.type === 'boss'}>BOSS</RadioItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
            <p>已有账号？<a href="#" onClick={this.login}>返回登录</a></p>
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
