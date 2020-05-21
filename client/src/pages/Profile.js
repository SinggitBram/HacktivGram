import React, { useState, useEffect } from 'react'
import axios from "axios";
import Navbar from '../components/navbar'
import { Image } from 'react-bootstrap';

export default function Profile() {

    const [bulkPosts, setBulkPosts] = useState([{image_url:'https://images.pexels.com/photos/1544351/pexels-photo-1544351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}, 
    {image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTngsfHVF0cp2Qo4491aesyNTkb766td2Bc6pJxSt92ybpYxQQK&usqp=CAU"},
    {image_url: "data:image/jpeg;base64,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"}])
    const [postCount, setPostCount] = useState(99)
    const [followerCount, setFollowerCount] = useState(300)
    const [followingCount, setFollowingCount] = useState(800)
    const [accountName, setAccountName] = useState(`Lionel Andres Singgit`)
    const [accountImage, setAccountImage] = useState(`https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg`)
    const [userLoading, setUserLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    const [followerLoading, setFollowerLoading] = useState(true)
    const [followingLoading, setFollowingLoading] = useState(true)

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/users`,
            headers: { token: localStorage.getItem("token") }
        })
            .then(response => {
                setAccountName(response.name)
                setAccountImage(response.image)
                setUserLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `http://localhost:3000/posts`,
            headers: { token: localStorage.getItem("token") }
        })
            .then(response => {
                setBulkPosts(response)
                setPostCount(response.length)
                setPostLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `http://localhost:3000/follows`,
            headers: { token: localStorage.getItem("token") }
        })
            .then(response => {
                setFollowerCount(response.length)
                setFollowerLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `http://localhost:3000/follows/following`,
            headers: { token: localStorage.getItem("token") }
        })
            .then(response => {
                setFollowingCount(response.length)
                setFollowingLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    })

    // if (postLoading || followerLoading || followingLoading || userLoading) {
    //     return (
    //         <>
    //             <Navbar />
    //             <h1>Loading.....</h1>
    //         </>
    //     )
    // }

    console.log(bulkPosts)
    return (
        <>
            <div style={style.profilePage}>
                <div style={style.userInfo}>
                    <div style={style.userImage}>
                    <Image style={{height: '150px', width: '150px', margin: 'auto'}} src={accountImage} roundedCircle />
                    </div>
                    <div style={style.userDetail}>
                        <div style={style.userName}>
                            <h2>{accountName}</h2>
                        </div>
                        <div style={style.userPostFollow}>
                            <div>
                                <h4>{postCount} posts</h4>
                            </div>
                            <div>
                                <h4>{followerCount} followers</h4>
                            </div>
                            <div>
                                <h4>{followingCount} following</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={style.mediaNavigator}>
                    <h3>POSTS</h3>
                </div>
                
                <div style={style.mediaContainer}>
                    {
                        bulkPosts.map((bulkPost) => {
                            return (
                                <div style={style.divGambar}>
                                    <Image style={{height: '300px', width: '250px'}} src={bulkPost.image_url} thumbnail />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

const style = {
    profilePage: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '65%',
        margin: 'auto'
    },
    userInfo: {
        display: 'flex',
        marginBottom: '20px'
    },
    userImage: {
        flex: 1,
        display: 'flex'
    },
    userDetail: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    userName: {
        display: 'flex'
    },
    userPostFollow: {
        display: 'flex'
    },
    mediaNavigator: {
        display: 'flex',
        marginBottom: '20px',  
        borderTopStyle: 'groove',
        borderBottomStyle: 'groove'
        
    },
    mediaContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    divGambar: {
        flexBasis: '30%',
    }
}


