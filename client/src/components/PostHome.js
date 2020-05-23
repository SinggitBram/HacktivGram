import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PostHome(props) {

    const [commenterAndComment, setCommenterAndComment] = useState([])
    const [inputTextComment, setInputTextComment] = useState('')

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/comments`,
            data: { PostId: props.itempost.id },
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setCommenterAndComment(response.pasangan)
            })
    }, [])

    function handleChange(event) {
        setInputTextComment(event.target.value)
    }    

    function handleSubmit(event) {
        axios({
            method: "post",
            url: `http://localhost:3000/comments`,
            data: {PostId: props.itempost.id, comment:inputTextComment},
            headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="post-block">
            <div>
                <div className="flex-follow">
                    <img src={props.itempost.User.image} alt="profile" className="img-follow" />
                    {props.itempost.User.name}
                </div>
            </div>
            <div>
                <img src={props.itempost.image_url} alt="gambar"></img>
            </div>
            <div className="actionBar">
                <span>Like</span> <span>Share</span>
            </div>
            <div className="commentSection">
                {commenterAndComment.map((comncom, idx) => {
                    return (
                        <>
                            <span>{comncom.commenter}</span>
                            <span>{comncom.comment}</span>
                        </>
                    )
                })
                }
            </div>
            <div className="typeCommentSection">
                <form className="inputComment" onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a comment..." name="comment" onChange={handleChange} />
                </form>
            </div>
        </div>
    )
}

