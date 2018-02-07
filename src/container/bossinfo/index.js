import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '@/components/avatarSelector';

class BossInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
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
    return (
      <div>
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector selectAvatar={imgName => this.selectAvatar(imgName)} />
        <InputItem onChange={val => this.onChange('title', val)}>
          招聘职位
        </InputItem>
        <InputItem onChange={val => this.onChange('company', val)}>
          公司名称
        </InputItem>
        <InputItem onChange={val => this.onChange('money', val)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={val => this.onChange('desc', val)}
          title="职位要求"
          rows="3"
          autoHeight
        />
        <Button type="primary">保存</Button>
      </div>
    );
  }
}

export default BossInfo;
