const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

// Reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1;
    case REMOVE_GUN:
      return state - 1;
    default:
      return state;
  }
}

// Action Creator
export const addGun = () => ({ type: ADD_GUN });
export const removeGun = () => ({ type: REMOVE_GUN });
export const addGunAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun())
        }, 2000)
    }
}