import { useState, useEffect } from 'react'
import axios from 'axios'

export default (host) =>{

    const [toFollow, setTofollow] = useState([])
   
    useEffect(()=>{
        let token = localStorage.getItem('token')
        axios({
            method : "get",
            url: `${host}/users/all`,
            headers: {token},
        })
        .then(response => {
            let alluser = response.data
            axios({
                methods : "get",
                url : `${host}/follows/following`,
                headers: { token: localStorage.getItem('token') }
            })
            .then(response=>{
                let following = response.data
                let myFirstObjArray = alluser
                let mySecondObjArray = following
                let array  = myFirstObjArray.filter(o=> !mySecondObjArray.some(i=> i.id === o.id))
                let token = localStorage.getItem('token')
                    axios({
                        method : "get",
                        url: `${host}/users`,
                        headers: {token},
                    })
                    .then(data=>{
                        let newarray=[]
                        for(let i=0; i<array.length; i++){
                            if(array[i].id!==data.data.id){
                                newarray.push(array[i])
                            }
                        }
                    setTofollow(newarray)
                    })
            })
        })
        .catch(err => console.log(err))
    }, [host])
    return [toFollow]
}