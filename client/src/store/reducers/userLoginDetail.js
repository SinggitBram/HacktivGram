import { SET_USERLOGIN } from '../actions/type';

const initialState = {
    userdetail : []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERLOGIN:
      return { ...state, userdetail: action.payload.userdetail }
    default:
      return state;
  }
}