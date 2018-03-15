import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, receiveMsg,sendMsg } from '@/redux/chat.redux';
import { getChatId } from '@/utils';

@withRouter
@connect(state => state, { getMsgList, receiveMsg, sendMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    };
  }

  componentDidMount() {
    if (!this.props.chat.msgList.length) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }

    // 修复跑马灯Bug
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0)
  }

  handleSubmit() {
    if (this.state.text) {
      const from = this.props.user._id;
      const to = this.props.match.params.user;
      const content = this.state.text;
      this.props.sendMsg({ from, to, content });
      this.setState({
        text: '',
        showEmoji: false
      });
    }
  }

  render() {
    const emoji = '😃 😂 😍 🤔 😊 🙄 😪 ⚽ 🍔 🤷 💖 💔 💞 💝 💘 ⛄ 🙈 💥 💦 💫 🐱 🐮 🐂 🐐 🦏 🐿 👩‍❤️‍👨'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({ text: v }));
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const chatId = getChatId(userid, this.props.user._id);
    const msgList = this.props.chat.msgList.filter(v => v.chatId === chatId);
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
        <div className={`chat-container ${this.state.showEmoji ? 'show-emoji':''}`}>
          {msgList.map(item => {
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
        <div className="fixed-bottom chat-window">
          <List>
            <InputItem
              placeholder="请输入消息"
              value={this.state.text}
              onChange={text => this.setState({ text })}
              extra={
                <div>
                  <span className="emoji-switch" onClick={() => this.setState({showEmoji: !this.state.showEmoji})}>😃</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          <Grid
            className={`emoji-box ${this.state.showEmoji ? 'show-emoji':''}`}
            data={emoji}
            columnNum={8}
            carouseMaxRow={4}
            isCarousel={true}
            onClick={el => {
              this.setState({text: this.state.text + el.text})
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
