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
        unread: data.msgList.filter(v => !v.isRead && v.to === data.userid).length
      };
    case MSG_RECEIVE:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {
        ...state,
        msgList: [...state.msgList, action.payload],
        unread: state.unread + n
      };
    default:
      return state;
  }
}

// action creator
function msgList(msgList, users, userid) {
  return { type: MSG_LIST, payload: { msgList, users, userid } };
}

function setMsg(data, userid) {
  return { userid, type: MSG_RECEIVE, payload: data };
}

export function sendMsg({ from, to, content }) {
  return dispatch => {
    socket.emit('send-msg', { from, to, content });
  };
}

export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('receive', data => {
      const userid = getState().user._id;
      dispatch(setMsg(data, userid));
    });
  };
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        const data = res.data.data;
        dispatch(msgList(data.msgList, data.users, userid));
      }
    });
  };
}
