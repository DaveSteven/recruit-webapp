import React from 'react';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { logout } from '@/redux/user.redux';
import { Redirect } from 'react-router-dom';
import cookies from 'browser-cookies';

@connect(state => state.user, { logout })
class User extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    Modal.alert('注销', '确认退出吗？？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          cookies.erase('userid');
          this.props.logout();
        }
      }
    ]);
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../../img/${props.avatar}.jpg`)} />}
          title={props.user}
          message={props.type === 'boss' ? props.company : props.title}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.title}
            {props.desc
              .split('\n')
              .map(item => <Brief key={item}>{item}</Brief>)}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />;
  }
}

export default User;
