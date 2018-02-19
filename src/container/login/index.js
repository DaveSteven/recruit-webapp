import React from 'react';
import Logo from '@/components/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login } from '@/redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import recruitForm from '@/components/recruitForm';

@connect(state => state.user, { login })
@recruitForm
class Login extends React.Component {
  constructor() {
    super();
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return (
      <div>
        { (this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo />
        <List renderHeader={this.props.msg ? this.props.msg : null}>
          <InputItem onChange={val => this.props.handleChange('user', val)}>
            用户
          </InputItem>
          <InputItem
            type="password"
            onChange={val => this.props.handleChange('pwd', val)}
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
