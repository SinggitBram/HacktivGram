import { SET_LOGIN } from './type';
import axios from 'axios';

const host = 'https://safe-headland-69478.herokuapp.com'

export const setLogin = (data) => {
  return (dispatch) => {
    return axios.post(`${host}/users/login`, data)
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        data.isLogin = true;
        dispatch({
          type: SET_LOGIN,
          payload: data
        })
      })
  }
}

export const setRegister = (data) => {
  return (dispatch) => {
    return axios.post(`${host}/users/register`, data)
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        data.isLogin = true;
        dispatch({
          type: SET_LOGIN,
          payload: data
        })
      })
  }
}
  export function changeIsLogin (data) {
    return {
      type: SET_LOGIN,
      payload: data
    }
  }
