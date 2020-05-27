import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bin from '../assets/images/bin.png'
import like from '../assets/images/like.png'
import add from '../assets/images/add.png'
import likegrey from '../assets/images/like-grey.png'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/navbar'


export default function DetailPost() {

    const host = 'https://safe-headland-69478.herokuapp.com'// 'http://localhost:3000'

    const history = useHistory()
    const { userdetail } = useSelector(state => state.userLoginDetail)

    const { postId } = useParams()
    const [commenterAndComment, setCommenterAndComment] = useState([])
    const [inputTextComment, setInputTextComment] = useState('')
    const [likes, setLikes] = useState([])
    const [thePost, setThePost] = useState([])
    const [theUser, setTheUser] = useState([])
    const [mylike, setMylike] = useState(false)
    const [repoststatus, setRepost] = useState(false)
    const [originuser, setOriginuser] = useState([])


    useEffect(() => {

        axios({
            method: "get",
            url: `${host}/posts/all/${postId}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data[0], `<<<<<<<<<<<<<<<<<<`)
                setThePost(response.data[0])
                setTheUser(response.data[0].User)
                if (response.data[0].status !== true) {
                    setRepost(true)
                    axios({
                        method: "get",
                        url: `${host}/users/${response.data[0].origin_userid}`,
                        headers: { token: localStorage.getItem('token') }
                    })
                        .then(data => {
                            setOriginuser(data.data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                console.log(err, "with id: ", postId)
            })

        getCommentbyId(postId)

        getLikesbypostId(postId)

    }, [postId])

    function getCommentbyId(postId) {
        axios({
            method: "get",
            url: `${host}/comments/${postId}`,
            data: { PostId: postId },
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setCommenterAndComment(response.data.pasangan)
            })
            .catch(err => {
                console.log(err, "with id: ", postId)
            })
    }

    function getLikesbypostId(postId) {
        axios({
            method: "get",
            url: `${host}/likes/${postId}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setLikes(response.data)
                if (response.data.length > 0) {
                    axios({
                        method: "get",
                        url: `${host}/users`,
                        headers: { token: localStorage.getItem('token') },
                    })
                        .then(data => {
                            for (let i = 0; i < response.data.length; i++) {
                                if (response.data[i].UserId === data.data.id) {
                                    setMylike(true)
                                }
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err, "with id: ", postId)
            })

    }

    function handleChange(event) {
        setInputTextComment(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: `${host}/comments`,
            data: { PostId: postId, comment: inputTextComment },
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                getCommentbyId(postId)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function repost(item) {
        let newpost = {
            title: item.title,
            image_url: item.image_url,
            //views: req.body.views,
            location: item.location,
            origin_userid: item.User.id
        }

        axios({
            method: "post",
            url: `${host}/posts`,
            headers: { token: localStorage.getItem('token') },
            data: newpost
        })
            .then(data => {
                console.log(data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitLike(PostId) {

        axios({
            method: "post",
            url: `${host}/likes`,
            data: { PostId },
            headers: { token: localStorage.getItem('token') }
        })
            .then(data => {
                console.log(data.data)
                getLikesbypostId(PostId)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function deletePost() {
        console.log('delete')
        axios({
            method: "delete",
            url: `${host}/posts/${postId}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(data => {
                history.push('/profile')
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitDelComment(id, PostId) {
        axios({
            method: 'delete',
            url: `${host}/comments/${id}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(data => {
                getCommentbyId(PostId)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ backgroundColor: "#FAFAFA" }}>
            <Navbar />

            <div className="detail-block" >
                <div className="post-kiri-kanan">
                    <div className='kolom-kiri-detail'>
                        <img src={thePost.image_url} alt="gambar" className="img-home"></img>
                    </div>

                    <div className='kolom-kanan-detail'>
                        <div>
                            <Link to={`/user/${theUser.id}`} ><img src={theUser.image} alt="profile" className="img-follow" /></Link>
                            {theUser.name}
                            <br></br>
                            {(repoststatus) && <div>Repost from {originuser.name}</div>}
                            <p style={{ marginLeft: 10 }}>{thePost.title}</p>
                            <hr
                                style={{
                                    color: '#f2f2f2',
                                    backgroundColor: '#f2f2f2',
                                    height: 0.1
                                }}
                            />
                        </div>

                        {(userdetail.id === theUser.id) && <button style={{ width: 250, marginLeft: 20, marginRight: 20, borderRadius: 6, backgroundColor: 'lightblue', }}><h5 onClick={deletePost}>Delete Post</h5></button>}

                        <div className="commentSectionDetail">
                            {(commenterAndComment.length > 0) &&
                                commenterAndComment.map((comncom, idx) => {
                                    return (
                                        <div key={idx}>
                                            <span style={{ paddingLeft: 20, paddingBottom: 10, paddingTop: 20 }}><b>{comncom.commenter}</b> {comncom.comment}</span>
                                            {(comncom.commenter === userdetail.name) && <img src={bin} alt="logo" className="img-icon" onClick={() => submitDelComment(comncom.commentId, postId)}></img>}
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="actionBar">
                            {
                                (!mylike)
                                    ? <span> <img src={like} alt="logo" className="img-icon" style={{ marginLeft: 15 }} onClick={() => submitLike(postId)}></img></span>
                                    : <span> <img src={likegrey} alt="logo" className="img-icon" style={{ marginLeft: 15 }} onClick={() => submitLike(postId)}></img></span>
                            }
                            <span><img src={add} alt="logo" className="img-icon" style={{ marginLeft: 15 }} onClick={() => repost(thePost)}></img></span>
                        </div>

                        <div style={{ paddingLeft: 20, paddingBottom: 5 }}>Views: {thePost.views}</div>

                        <div style={{ paddingLeft: 20, fontWeight: 'bold' }}>Liked by:

                        </div>

                        <div>
                            {(likes.length > 0) && likes.map((item, idx) => {
                                return (
                                    <>
                                        <div key={idx}>
                                            <span style={{ paddingLeft: 20, paddingBottom: 5 }}>{item.User.name}</span>
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        <div className="typeCommentSection">
                            <hr
                                style={{
                                    color: '#f2f2f2',
                                    backgroundColor: '#f2f2f2',
                                    height: 0.1
                                }}
                            />
                            <form className="inputComment" onSubmit={handleSubmit}>
                                <input type="text" style={{ marginLeft: 15, width: 260 }} placeholder="Add a comment..." name="comment" onChange={handleChange} />
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

