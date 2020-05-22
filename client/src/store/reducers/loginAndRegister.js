import { SET_LOGIN } from '../actions/type';

const initialState = {
  isLogin: localStorage.getItem('token') ? true : false,
  name: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.payload.isLogin, name: action.payload.name }
    default:
      return state;
  }
}