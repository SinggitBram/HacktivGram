import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar'
import PostHome from '../components/PostHome'

export default function Home(){

    const [post, setPost] = useState([])

    useEffect(() => {
        console.log('masuk useeffect di home')
        axios({
            method: "get",
            url: `http://localhost:3000/posts/all`,
            // headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                let allpost = response.data
                axios({
                    method: "get",
                    url: `http://localhost:3000/follows/following`,
                    headers: { token: localStorage.getItem('token') }
                })
                    .then(response => {
                        let allfollowing = response.data
                        let arrpost = []
                        for (let i=0; i<allfollowing.length; i++){
                            for (let j=0; j<allpost.length; j++){
                                if(allpost[j].UserId===allfollowing[i].id){
                                    arrpost.push(allpost[i])
                                }
                            }
                        }
                        setPost(arrpost)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <div>
            <Navbar />
            <h1>Home --- please edit</h1>
            <div>
                {post.map((itempost, idx)=>(
                    <div key={idx}>
                        <PostHome itempost={itempost}/>
                    </div>
                ))}
                
            </div>
        </div>
    )
}