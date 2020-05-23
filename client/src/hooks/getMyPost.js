import { useState, useEffect } from 'react'
import axios from 'axios'

export default (host) =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        console.log('masuk useeffect')
         let token = localStorage.getItem('token')
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb21lc0BtYWlsLmNvbSIsImlhdCI6MTU5MDE1MTIzNX0.2xr0FvNTo8D3OB6CHHWcJVIxD26ynbhxWVw40-lMV6s'
        axios({
            method : "get",
            url: `${host}/posts`,
            headers: {token},
        })
        .then(data=>{
            console.log(data.data, "----data")
            setData(data.data)
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false))
    }, [host])
    return [data, loading, error]
}