import { SET_LOGIN } from './type';
import axios from 'axios';

export const setLogin = (data) => {
  return (dispatch) => {
    return axios.post('http://localhost:3001/users/login', data)
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
    return axios.post('http://localhost:3001/users/register', data)
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