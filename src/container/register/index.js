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
import { connect } from 'react-redux';
import { register } from '@/redux/user.redux';

const RadioItem = Radio.RadioItem;

@connect(state => state.user, { register })
class Register extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.state = {
      user: '',
      pwd: '',
      type: 'genius'
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  login() {
    this.props.history.push('/login');
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleRegister() {
    this.props.register(this.state);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Logo />
        { this.props.msg ? <p>{this.props.msg}</p> : null }
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
          <RadioItem
            checked={this.state.type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            BOSS
          </RadioItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <p>
            已有账号？<a href="#" onClick={this.login}>
              返回登录
            </a>
          </p>
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
