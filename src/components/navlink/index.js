import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <div>
        <TabBar tintColor='#17abe3'>
          {navList.map(v => (
            <TabBar.Item
              key={v.path}
              title={v.text}
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require(`../img/${
                      v.icon
                    }.svg`)}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require(`../img/${
                      v.icon
                    }_selected.svg`)}) center center /  21px 21px no-repeat`
                  }}
                />
              }
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path);
              }}
            />
          ))}
        </TabBar>
      </div>
    );
  }
}

export default NavLinkBar;
