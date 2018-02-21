import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9099');

const MSG_LIST = 'MSG_LIST';
const MSG_RECEIVE = 'MSG_RECEIVE';
const MSG_READ = 'MSG_READ';

const initState = {
  msgList: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      const data = action.payload;
      return {
        ...state,
        msgList: data.msgList,
        users: data.users,
        unread: data.msgList.filter(v => !v.isRead).length
      };
    case MSG_RECEIVE:
      return {
        ...state,
        msgList: [...state.msgList, action.payload],
        unread: state.unread + 1
      };
    default:
      return state;
  }
}

// action creator
function msgList(msgList, users) {
  return { type: MSG_LIST, payload: { msgList, users } };
}

function setMsg(data) {
  return { type: MSG_RECEIVE, payload: data };
}

export function sendMsg({ from, to, content }) {
  return dispatch => {
    socket.emit('send-msg', { from, to, content });
  };
}

export function receiveMsg() {
  return dispatch => {
    socket.on('receive', data => {
      dispatch(setMsg(data));
    });
  };
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const data = res.data.data;
        dispatch(msgList(data.msgList, data.users));
      }
    });
  };
}
