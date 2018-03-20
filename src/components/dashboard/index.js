import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink';
import Boss from '../boss';
import Genius from '../genius';
import User from '../user';
import Message from '../msg';
import { getMsgList, receiveMsg } from '@/redux/chat.redux';

@connect(state => state, { getMsgList, receiveMsg })
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
  }
  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: '/genius',
        text: '牛人',
        icon: 'list',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/boss',
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
        <NavBar className="fixed-header" mode="dard">
          {navList.find(item => item.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(item => (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
              />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default DashBoard;
