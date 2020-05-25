import React, { useState, useEffect } from 'react'
import axios from "axios";
import Navbar from '../components/navbar'
import { Image } from 'react-bootstrap';
import ImageOnlyCard from '../components/ImageOnlyCard'
import { 
    // useRouteMatch, 
    // Switch, 
    // Route, 
    // useHistory, 
    useParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux';


export default function Profile() {

    let {id} = useParams() 

    // const history = useHistory();
    // const dispatch = useDispatch()
    const [bulkPosts, setBulkPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    // const [followerCount, setFollowerCount] = useState(0)
    // const [followingCount, setFollowingCount] = useState(0)
    const [accountName, setAccountName] = useState('')
    const [accountImage, setAccountImage] = useState('')
    const [userLoading, setUserLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    // const [followerLoading, setFollowerLoading] = useState(true)
    // const [followingLoading, setFollowingLoading] = useState(true)

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/users/${id}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setAccountName(response.data.name)
                setAccountImage(response.data.image)
                setUserLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `http://localhost:3000/posts/user/${id}`,
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

        // axios({
        //     method: "get",
        //     url: `http://localhost:3000/follows`,
        //     headers: { token: localStorage.getItem('token') }
        // })
        //     .then(response => {
        //         setFollowerCount(response.data.length)
        //         setFollowerLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        // axios({
        //     method: "get",
        //     url: `http://localhost:3000/follows/following`,
        //     headers: { token: localStorage.getItem('token') }
        // })
        //     .then(response => {
        //         setFollowingCount(response.data.length)
        //         setFollowingLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }, [])


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
            <Navbar />
            <div style={style.profilePage}>
                <div style={style.userInfo}>
                    <div style={style.userImage}>
                        <Image style={{ height: '150px', width: '150px', margin: 'auto' }} src={accountImage} roundedCircle />
                    </div>
                    <div style={style.userDetail}>
                        <div style={style.userName}>
                            <h2>{accountName}</h2>
                            {/* <h4 style={{ float: 'right', cursor: 'pointer' }} onClick={submitSignout}>Signout</h4> */}
                        </div>
                        <div style={style.userPostFollow}>
                            <div>
                                <h4>{postCount} posts</h4>
                            </div>
                            {/* <div>
                                <h4>{followerCount} followers</h4>
                            </div>
                            <div>
                                <h4>{followingCount} following</h4>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div style={style.mediaNavigator}>
                    <h3>POSTS</h3>
                </div>

                <div style={style.mediaContainer}>
                    {bulkPosts.map((bulkPost, idx) => {
                        return (
                            <div style={style.divGambar} key={idx}>
                                <ImageOnlyCard key={idx} postData={bulkPost} />
                            </div>
                        )
                    })}
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


