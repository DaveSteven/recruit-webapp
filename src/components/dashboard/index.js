import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink';

function Boss() {
  return <h2>Boss首页</h2>;
}

function Genius() {
  return <h2>牛人首页</h2>;
}

function Message() {
  return <h2>消息列表</h2>;
}

function User() {
  return <h2>用户泪飙</h2>;
}

@connect(state => state)
class DashBoard extends React.Component {
  render() {
    console.log(this.props);
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'list',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'list',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/message',
        text: '消息',
        icon: 'message',
        title: '消息列表',
        component: Message
      },
      {
        path: '/me',
        text: '我的',
        icon: 'me',
        title: '我的',
        component: User
      }
    ];
    return (
      <div>
        <NavBar mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <h2>content</h2>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default DashBoard;
