import { useState, useEffect } from 'react'
import axios from 'axios'

export default (host) =>{

    const [toFollow, setTofollow] = useState([])
   
    useEffect(()=>{
        console.log('masuk useeffect toFollow')
        let token = localStorage.getItem('token')
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb21lc0BtYWlsLmNvbSIsImlhdCI6MTU5MDE1MTIzNX0.2xr0FvNTo8D3OB6CHHWcJVIxD26ynbhxWVw40-lMV6s'
        axios({
            method : "get",
            url: `${host}/users/all`,
            headers: {token},
        })
        .then(response => {
            let alluser = response.data
            console.log(alluser, "---alluser")
            axios({
                methods : "get",
                url : `${host}/follows/following`,
                headers: { token: localStorage.getItem('token') }
            })
            .then(response=>{
                let following = response.data
                let myFirstObjArray = alluser
                console.log(myFirstObjArray, 'myfirst')
                let mySecondObjArray = following
                console.log(mySecondObjArray, "mysecond")
                let array  = myFirstObjArray.filter(o=> !mySecondObjArray.some(i=> i.id === o.id))
                console.log(array, "---array")
                let token = localStorage.getItem('token')
                    axios({
                        method : "get",
                        url: `${host}/users`,
                        headers: {token},
                    })
                    .then(data=>{
                        console.log(data.data, "----data")
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