import React from 'react';
import { Grid, List } from 'antd-mobile';

class AvatarSelector extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const avatarList = 'dog,bear,cat'.split(',').map(name => ({
      icon: require(`../img/${name}.jpg`),
      text: name
    }));

    const gridHeader = this.state.text ? (
      <div>
        <span>已选择头像</span>
        <img style={{ width: 20 }} src={this.state.icon} />
      </div>
    ) : (
      '请选择头像'
    );

    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum="3"
            onClick={el => {
              this.setState(el);
              this.props.selectAvatar(el.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
