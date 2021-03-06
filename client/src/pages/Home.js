import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from 'axios'
import Navbar from '../components/navbar'
import PostHome from '../components/PostHome'
import UserToFollow from '../hooks/toFollow'

export default function Home() {

    const host = 'https://safe-headland-69478.herokuapp.com' // 'http://localhost:3000'

    const { userdetail } = useSelector(state => state.userLoginDetail)

    const [toFollow] = UserToFollow(host)
    const [post, setPost] = useState([])
    const [following, setFollowing] = useState([])

    useEffect(() => {
        getEffect()
    }, [])

    function getEffect() {
        axios({
            method: "get",
            url: `${host}/posts/all`,
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
                        for (let i = 0; i < allpost.length; i++) {
                            for (let j = 0; j < allfollowing.length; j++) {
                                if (allpost[i].UserId === allfollowing[j].id) {
                                    arrpost.push(allpost[i])
                                }
                            }
                        }
                        console.log(arrpost, "---arrpost")
                        setPost(arrpost)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitFollow(id, item) {
        console.log(id, "masuk submit follow")
        let token = localStorage.getItem('token')
        axios({
            method: 'post',
            url: `${host}/follows`,
            headers: { token },
            data: {
                targetUserId: id
            }
        })
            .then(data => {
                getEffect()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ backgroundColor: "#FAFAFA" }}>
            <Navbar />

            <div className="flex-home" style={{ paddingTop: 80 }}>
                <div>
                    <div className="flex-homefollowing">
                        {(following.length > 0) && following.map((item, idx) => (
                            <Link to={`/user/${item.id}`} key={idx} ><img src={item.image} alt="profile" className="img-profile-big" /></Link>
                        )
                        )}
                    </div>
                    <div>
                        {post.map((itempost, idx) => (
                            <div key={idx}>
                                <PostHome itempost={itempost} userloginId={userdetail.id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-homeprofile">
                    <div className="flex-row">
                        <Link to={`/profile`} ><img src={userdetail.image} alt="profile" className="img-profile-big" /></Link>
                        <div className="profile-name">{userdetail.name}</div>
                    </div>
                    <table>
                        <thead>
                            <tr className="table-head">
                                <th className="col-suggestion">Suggestion for you</th>
                                <th>See</th>
                            </tr>
                        </thead>
                        <tbody >
                            {toFollow.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="flex-row" style={{ alignItems: 'center' }}>
                                        <Link to={`/user/${item.id}`} ><img src={item.image} alt="profile" className="img-profile" /></Link>
                                        <div>{item.name}</div>
                                    </td>
                                    <td>
                                        <button style={{ borderWidth: 0, backgroundColor: "#FAFAFA", color: 'blue' }} onClick={() => submitFollow(item.id, item)}>Follow</button>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
