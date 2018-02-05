import axios from 'axios';
import { getRedirectPath } from '@/utils';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// reducer
const initState = {
  redirectTo: '',
  isAuth: false,
  user: '',
  pwd: '',
  type: '',
  msg: ''
};
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, ...action.payload, redirectTo: getRedirectPath(action.payload), isAuth: true, msg: ''};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function register({ user, pwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必填！');
  }
  return dispath => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispath(registerSuccess({ user, pwd, type }));
      } else {
        dispath(errorMsg(res.data.msg));
      }
    });
  };
}
