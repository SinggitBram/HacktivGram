import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from '../components/navbar'
import PostHome from '../components/PostHome'
import getUserDetail from '../hooks/getUserDetail'
import UserToFollow from '../hooks/toFollow'


export default function Home(){

    const host = 'http://localhost:3000'

    const [data, loading, error] = getUserDetail(host)
    const [toFollow] = UserToFollow(host)
    const [post, setPost] = useState([])
    const [following, setFollowing] = useState([])

    useEffect(() => {
        console.log('masuk useeffect di home')
        getEffect()        

    }, [])

    function getEffect(){
        axios({
            method: "get",
            url: `${host}/posts/all`,
            // headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                let allpost = response.data
                axios({
                    method: "get",
                    url: `${host}/follows/following`,
                    headers: { token: localStorage.getItem('token') }
                })
                    .then(response => {
                        let allfollowing = response.data
                        setFollowing(allfollowing)
                        let arrpost = []
                        for (let i=0; i<allpost.length; i++){
                            for (let j=0; j<allfollowing.length; j++){
                                if(allpost[i].UserId===allfollowing[j].id){
                                    arrpost.push(allpost[i])
                                }
                            }
                        }
                        console.log(arrpost,"---arrpost")
                        setPost(arrpost)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitFollow(id, item){
        console.log(id, "masuk submit follow")
        let token = localStorage.getItem('token')
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb21lc0BtYWlsLmNvbSIsImlhdCI6MTU5MDE1MTIzNX0.2xr0FvNTo8D3OB6CHHWcJVIxD26ynbhxWVw40-lMV6s'
        axios({
            method: 'post',
            url : `${host}/follows`,
            headers : {token},
            data: {
                targetUserId: id
            }
        })
        .then(data=>{
            console.log(data.data)
            getEffect()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1> Error nih...</h1>
    }

    return (
        <div >
            <Navbar />
            
            <div className="flex-home">
                <div>
                    <div className="flex-homefollowing">
                        {(following.length>0)&& following.map((item,idx)=>(
                            <Link to={`/user/${item.id}`} ><img src={item.image} alt="profile" className="img-profile-big" /></Link>
                        )
                        )}
                    </div>
                    <div>
                    {post.map((itempost, idx)=>(
                        <div key={idx}>
                            <PostHome itempost={itempost}/>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex-homeprofile">
                    <div className="flex-row">
                        <Link to={`/user/${data.id}`} ><img src={data.image} alt="profile" className="img-profile-big" /></Link>
                        <div className="profile-name">{data.name}</div>
                    </div>
                    <table>
                        <tr className="table-head">
                            <th className="col-suggestion">Suggestion for you</th>
                            <th>See</th>
                        </tr>
                        {toFollow.map((item,idx)=>(
                            <tr key={idx}>
                                <td className="flex-row">
                                    <Link to={`/user/${item.id}`} ><img src={item.image} alt="profile" className="img-profile" /></Link>
                                    <div >{item.name}</div>
                                </td>
                                <td>
                                    <button onClick={()=>submitFollow(item.id, item)}>Follow</button>
                                </td>
                            </tr>
                            )
                        )}
                    </table>
                       
                </div>

            </div>
            
        </div>
    )
}