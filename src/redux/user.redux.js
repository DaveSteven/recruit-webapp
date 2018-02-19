import axios from 'axios';
import { getRedirectPath } from '@/utils';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

// reducer
const initState = {
  redirectTo: '',
  user: '',
  type: '',
  msg: ''
};

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
        msg: ''
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    default:
      return state;
  }
}

// creator
function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}


export function register({ user, pwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必填！');
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function logout() {
  return { type: LOGOUT }
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      }
    });
  };
}
