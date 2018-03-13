import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { getMsgList, receiveMsg } from '@/redux/chat.redux';
import { connect } from 'react-redux';

@withRouter
@connect(state => state.chat, { getMsgList, receiveMsg })
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <div>
        <TabBar tintColor="#17abe3">
          {navList.map(item => (
            <TabBar.Item
              badge={item.path === '/message' ? this.props.unread : 0}
              key={item.path}
              title={item.text}
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require(`../../img/${
                      item.icon
                    }.svg`)}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require(`../../img/${
                      item.icon
                    }_selected.svg`)}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              selected={pathname === item.path}
              onPress={() => {
                this.props.history.push(item.path);
              }}
            />
          ))}
        </TabBar>
      </div>
    );
  }
}

export default NavLinkBar;
