import React from 'react';
import Logo from '@/components/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login } from '@/redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { login })
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      pwd: ''
    };
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleLogin() {
    console.log(this.state);
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo />
        {this.props.msg ? <p>{this.props.msg}</p> : null}
        <List>
          <InputItem onChange={val => this.handleChange('user', val)}>
            用户
          </InputItem>
          <InputItem
            type="password"
            onChange={val => this.handleChange('pwd', val)}
          >
            密码
          </InputItem>
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
          <Button type="primary" onClick={() => this.handleLogin()}>
            登录
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
