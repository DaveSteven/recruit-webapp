import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';

@connect(state => state)
class Message extends React.Component {
    getLastData(arr) {
        return arr[arr.length - 1];
    }

    render() {
        const msgGroup = {};
        this
            .props
            .chat
            .msgList
            .forEach(item => {
                msgGroup[item.chatId] = msgGroup[item.chatId] || [];
                msgGroup[item.chatId].push(item);
            })
        const Item = List.Item;
        const Brief = Item.Brief;
        const chatList = Object.values(msgGroup);
        const userId = this.props.user._id;
        console.log(chatList)
        return (
            <div>
                <List>
                    {chatList.map(item => {
                        const lastItem = this.getLastData(item);
                        const targetId = item[0].from === userId
                            ? item[0].to
                            : item[0].from;
                        const userinfo = this.props.chat.users;
                        if (!userinfo[targetId]) {
                            return null;
                        }
                        return (
                            <Item key={lastItem._id} thumb={require(`../../img/${userinfo[targetId].avatar}.jpg`)}>
                                {lastItem.content}
                                <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Message;