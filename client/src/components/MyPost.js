import React from 'react'
import axios from 'axios'
import getMyPost from '../hooks/getMyPost'

export default function MyPost(){

    const host = 'http://localhost:3000'

    const [data, loading, error] = getMyPost(host)

    function deletePostFunction(id){
        console.log(id, "id---masuk deletefunction")
         //let token = localStorage.getItem('token')
         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXJvQG1haWwuY29tIiwiaWF0IjoxNTg5OTc3NjI5fQ.0_FZn44rVJBlIiHBQPpL4Ry4DD_ceZ8SRSNX9fKLx_A'
        axios({
            method : "delete",
            url: `${host}/posts/${id}`,
            headers: {token},
        })
        .then(data=>{
            console.log(data.data, "----data")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    if(loading){
        return <div>Loading......</div>
    }

    if(error){
        return <div>Error Bohh....</div>
    }

    return (
        <>
            <h3>My Post</h3>
            <div>
                {data.map((item, idx)=>(
                            <div key={idx}>
                                <br></br>
                                <div>{item.title}</div>
                                <div>{item.createdAt}</div>
                                <img src={item.image_url} alt="gambar"></img>
                                <br></br>
                                <button>Edit</button>
                                <button type="button" onClick={()=>deletePostFunction(item.id)}>Delete</button>
                            </div>
                    )
                )}
            </div>
        </>
    )
}