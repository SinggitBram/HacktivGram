import React, { useState, useEffect } from 'react'
import axios from "axios";
import Navbar from '../components/navbar'
import { Image, Button } from 'react-bootstrap';
import ImageOnlyCard from '../components/ImageOnlyCard'
import {
    useParams, useHistory
} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Profile() {

    const host = 'https://safe-headland-69478.herokuapp.com'

    const history = useHistory()
    let { id } = useParams()
    const { userdetail } = useSelector(state => state.userLoginDetail)

    const [bulkPosts, setBulkPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    const [accountName, setAccountName] = useState('')
    const [accountImage, setAccountImage] = useState('')
    const [userLoading, setUserLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    const [userFollowing, setUserFollowing] = useState(false)
    const [userToFollow, setUserToFollow] = useState(false)

    useEffect(() => {
        axios({
            method: "get",
            url: `${host}/users/${id}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data,"------")
                setAccountName(response.data.name)
                setAccountImage(response.data.image)
                setUserLoading(false)
                axios({
                    method: "get",
                    url: `${host}/follows/following`,
                    headers : {token : localStorage.getItem('token')}
                })
                .then(data=>{
                    let result = data.data
                    for(let i=0; i<result.length; i++){
                        if(result[i].id===Number(id)){
                            setUserFollowing(1)
                        }
                    }
                })
                axios({
                    method: "get",
                    url: `${host}/follows`,
                    headers : {token : localStorage.getItem('token')}
                })
                .then(data=>{
                    let result = data.data
                    for(let i=0; i<result.length; i++){
                        if(result[i].id===Number(id)){
                            setUserToFollow(1)
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `${host}/posts/user/${id}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setBulkPosts(response.data)
                setPostCount(response.data.length)
                setPostLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [id])

    function submitUnfollow(){
        axios({
            method: 'delete',
            url: `${host}/follows`,
            headers: { token: localStorage.getItem('token') },
            data: {
                targetUserId: id
            }
        })
            .then(data => {
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitFollow(){
        axios({
            method: 'post',
            url: `${host}/follows`,
            headers: { token: localStorage.getItem('token') },
            data: {
                targetUserId: id
            }
        })
            .then(data => {
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    if (postLoading || userLoading) {
        return (
            <>
                <Navbar />
                <h1>Loading.....</h1>
            </>
        )
    }

    return (
        <>
            <div style={{ backgroundColor: "#FAFAFA" }}>
                <Navbar />
                <div style={style.profilePage}>
                    <div style={style.userInfo}>
                        <div style={style.userImage}>
                            <Image style={{ height: '150px', width: '150px', margin: 'auto' }} src={accountImage} roundedCircle />
                        </div>
                        <div style={style.userDetail}>
                            <div style={style.userName}>
                                <h2>{accountName}</h2>
                                {(userFollowing)
                                    ? <Button variant="primary" onClick={submitUnfollow}>Unfollow</Button >
                                    : <Button variant="primary" onClick={submitFollow}>Follow</Button >
                                }
                            </div>
                            <div style={style.userPostFollow}>
                                <div style={{ marginRight: 20 }}>
                                    <p><b>{postCount}</b> posts</p>
                                </div>
                            </div>
                            <div style={style.userPostFollow}>
                                {(userToFollow)&&<p>This user is following you</p>} 
                            </div>
                        </div>
                    </div>
                    <div style={style.mediaNavigator}>
                        <h3>POSTS</h3>
                    </div>

                    <div style={style.divGambar} >
                        {bulkPosts.map((bulkPost, idx) => {
                            return (
                                <div style={style.divUser} key={idx}>
                                    <ImageOnlyCard key={idx} postData={bulkPost} />
                                </div>
                            )
                        })}
                    </div>
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
        width: '63%',
        margin: 'auto',
        paddingTop: 80
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
        display: 'flex',
        justifyContent: 'space-between'

    },
    userPostFollow: {
        display: 'flex'
    },
    mediaNavigator: {
        display: 'flex',
        marginBottom: '20px',
        borderTopStyle: 'groove',
        borderBottomStyle: 'groove',
        justifyContent: "center"

    },
    mediaContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    divGambar: {
        paddingTop: 10,
        display: 'flex',
        flexWrap: "wrap",
        marginLeft: 5,
    },
    divUser: {
        flexDirection: "row",
        padding: 5

    }
}


