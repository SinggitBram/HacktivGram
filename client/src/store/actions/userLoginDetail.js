import { SET_USERLOGIN } from './type'
import axios from 'axios'

export function getUserDetail() {
    return (dispatch, getState) => {
        const host = 'https://safe-headland-69478.herokuapp.com' // 'http://localhost:3000'
        axios({
            method : "get",
            url: `${host}/users`,
            headers: {token: localStorage.getItem('token')},
        })
        .then(data=>{
            let result = data.data
            dispatch({
                type: SET_USERLOGIN,
                payload: {
                    userdetail: result
                }
            })
        })
        .catch(err => console.log(err))
    }
}
