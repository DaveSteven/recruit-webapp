import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '@/components/avatarSelector';
import { connect } from 'react-redux';
import { update } from '@/redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { update })
class GeniusInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: ''
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  selectAvatar(imgName) {
    this.setState({
      avatar: imgName
    });
  }

  render() {
    const currPath = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== currPath ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={imgName => this.selectAvatar(imgName)} />
        <InputItem onChange={val => this.onChange('title', val)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={val => this.onChange('desc', val)}
          title="个人简介"
          rows="3"
          autoHeight
        />
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type="primary"
        >
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
