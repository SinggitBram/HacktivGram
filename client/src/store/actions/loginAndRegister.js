import { SET_LOGIN, SET_REGISTER } from './type';
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
      // .catch(e => console.log(e, 'eeeeeeeeeeeeeeea'))
  }

  // return new Promise((resolve, reject) => {
  //   resolve({
  //     type: SET_LOGIN,
  //     payload: data
  //   })
  // })
}