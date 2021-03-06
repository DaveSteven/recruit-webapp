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
import { Redirect } from 'react-router-dom';
import { register } from '@/redux/user.redux';
import recruitForm from '@/components/recruitForm';

const RadioItem = Radio.RadioItem;

@connect(state => state.user, { register })
@recruitForm
class Register extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }

  login() {
    this.props.history.push('/login');
  }

  handleRegister() {
    this.props.register(this.props.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
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
