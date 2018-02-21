import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavBar, List, InputItem, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, receiveMsg } from '@/redux/chat.redux';

@withRouter
@connect(state => state, { getMsgList, sendMsg, receiveMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    };
  }

  handleSubmit() {
    if (this.state.text) {
      const from = this.props.user._id;
      const to = this.props.match.params.user;
      const content = this.state.text;
      this.props.sendMsg({ from, to, content });
      this.setState({
        text: ''
      });
    }
  }

  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
  }

  render() {
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          className="fixed-header"
          mode="dark"
        >
          {users[userid].name}
        </NavBar>
        <div className="chat-container">
          {this.props.chat.msgList.map(item => {
            const avatar = require(`../../img/${users[item.from].avatar}.jpg`);
            return item.from === userid ? (
              <section className="popover popover-left" key={item._id}>
                <div className="avatar">
                  <img
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="content">{item.content}</div>
              </section>
            ) : (
              <section className="popover popover-right" key={item._id}>
                <div className="content">{item.content}</div>
                <div className="avatar">
                  <img src={avatar} alt="" />
                </div>
              </section>
            );
          })}
        </div>
        <div className="fixed-bottom">
          <List>
            <InputItem
              placeholder="请输入消息"
              value={this.state.text}
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
