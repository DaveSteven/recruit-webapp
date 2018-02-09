import React from 'react';
import axios from 'axios';
import { Card, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserList } from '@/redux/chatuser.redux';

@connect(state => state.chatUser, { getUserList })
class Boss extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.props.getUserList('genius');
  }

  render() {
    return (
      <div>
        {this.props.userList.map(
          item =>
            item.avatar ? (
              <div>
                <WhiteSpace />
                <Card key={item._id} full>
                  <Card.Header
                    title={item.user}
                    thumb={require(`../../img/${item.avatar}.jpg`)}
                    extra={<span>{item.title}</span>}
                  />
                  <Card.Body>
                    {item.desc
                      .split('\n')
                      .map(item => <div key={item}>{item}</div>)}
                  </Card.Body>
                </Card>
              </div>
            ) : null
        )}
      </div>
    );
  }
}

export default Boss;
