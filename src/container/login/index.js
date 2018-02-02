import React from 'react';
import Logo from '@/components/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

class Login extends React.Component {
  constructor() {
    super();
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo />
        <List>
          <InputItem>用户</InputItem>
          <InputItem>密码</InputItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <p>
            还没有账号？<a href="#" onClick={this.register}>
              去注册
            </a>
          </p>
          <WhiteSpace />
          <Button type="primary">登录</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
