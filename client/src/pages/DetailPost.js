import React, { useEffect, useState } from 'react'
import axios from 'axios'
import like from '../assets/images/like.png'
import add from '../assets/images/add.png'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar'



export default function DetailPost() {

    const host = 'http://localhost:3000'
    const { postId } = useParams()
    const [commenterAndComment, setCommenterAndComment] = useState([])
    const [inputTextComment, setInputTextComment] = useState('')
    const [likes, setLikes] = useState([])
    const [thePost, setThePost] = useState([])
    const [theUser, setTheUser] = useState([])

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
            })
            .catch(err => {
                console.log(err, "with id: ", postId)
            })

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

        axios({
            method: "get",
            url: `${host}/likes/${postId}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {

                setLikes(response.data)
            })
            .catch(err => {
                console.log(err, "with id: ", postId)
            })


    }, [])

    function handleChange(event) {
        setInputTextComment(event.target.value)
    }

    function handleSubmit(event) {
        axios({
            method: "post",
            url: `${host}/comments`,
            data: { PostId: postId, comment: inputTextComment },
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response)
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
            url: `http://localhost:3000/likes`,
            data: { PostId },
            headers: { token: localStorage.getItem('token') }
        })
            .then(data => {
                console.log(data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Navbar />

            <div className="detail-block">
                <div className="post-kiri-kanan">
                    <div className='kolom-kiri-detail'>
                        <img src={thePost.image_url} alt="gambar" className="img-home"></img>
                    </div>

                    <div className='kolom-kanan-detail'>
                        <div>
                            <img src={theUser.image} alt="profile" className="img-follow" />
                            {theUser.name}
                            <br></br>
                            {thePost.title}
                            <hr
                                style={{
                                    color: '#f2f2f2',
                                    backgroundColor: '#f2f2f2',
                                    height: 0.1
                                }}
                            />
                        </div>

                        <div className="commentSection">
                            {(commenterAndComment.length > 0) &&
                                commenterAndComment.map((comncom, idx) => {
                                    return (
                                        <div key={idx}>
                                            <span><b>{comncom.commenter}</b> : </span>
                                            <span>{comncom.comment}</span>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="actionBar">
                            
                            <span> <img src={like} alt="logo" className="img-icon" onClick={() => submitLike(postId)}></img></span>
                            <span><img src={add} alt="logo" className="img-icon" onClick={() => repost(thePost)}></img></span>
                        </div>

                        <div>Liked by:

                        </div>

                        <div>
                            {(likes.length > 0) && likes.map((item, idx) => {
                                return (
                                    <>
                                        <div key={idx}>
                                            <span>{item.User.name}</span>
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
                                <input type="text" placeholder="Add a comment..." name="comment" onChange={handleChange} />
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

