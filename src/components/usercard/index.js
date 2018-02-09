import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.userList.map(
          item =>
            item.avatar ? (
              <div key={item._id}>
                <WhiteSpace />
                <Card full>
                  <Card.Header
                    title={item.user}
                    thumb={require(`../../img/${item.avatar}.jpg`)}
                    extra={<span>{item.title}</span>}
                  />
                  <Card.Body>
                    {item.type === 'boss' ? (
                      <div>公司：{item.company}</div>
                    ) : null}
                    {item.desc
                      .split('\n')
                      .map(item => <div key={item}>{item}</div>)}
                    {item.type === 'boss' ? (
                      <div>薪资：{item.money}</div>
                    ) : null}
                  </Card.Body>
                </Card>
              </div>
            ) : null
        )}
      </div>
    );
  }
}

export default UserCard;
