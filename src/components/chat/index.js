import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
const server = io('ws://localhost:9099');

@withRouter
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    };
  }

  handleSubmit() {
    server.emit('send-msg', { text: this.state.text });
  }

  componentDidMount() {
    server.on('receive', data => {
      this.setState({ msg: [...this.state.msg, data.text] });
    });
  }

  render() {
    return (
      <div>
        {this.state.msg.map(item => {
          return <div key={item}>{item}</div>
        })}
        <div className="fixed-bottom">
          <List>
            <InputItem
              placeholder="请输入消息"
              onChange={text => this.setState({ text })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;
