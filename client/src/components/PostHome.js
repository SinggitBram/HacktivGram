import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import like from '../assets/images/like.png'
import likegrey from '../assets/images/like-grey.png'
import add from '../assets/images/add.png'
import { useHistory} from 'react-router-dom'
import AddViewPost from '../assets/functions/AddViewPost';


export default function PostHome(props) {
    
    const host = 'http://localhost:3000'
    
    const history = useHistory();

    const [commenterAndComment, setCommenterAndComment] = useState([])
    const [inputTextComment, setInputTextComment] = useState('')
    const [likes, setLikes] = useState([])
    const [mylike, setMylike] = useState(false)

    useEffect(() => {
        getComment()
        getLikes()
    },[])

    function getComment(){
        axios({
            method: "get",
            url: `${host}/comments/${props.itempost.id}`,
            data: { PostId: props.itempost.id },
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setCommenterAndComment(response.data.pasangan)
            })
            .catch(err=>{
                console.log(err, "with id: ", props.itempost.id)
            })
    }

    function getLikes(){
        axios({
            method: "get",
            url: `${host}/likes/${props.itempost.id}`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setLikes(response.data)
                for(let i=0; i<response.data.length;i++){
                    if(response.data[i].UserId===props.userloginId){
                        setMylike(true)
                    }
                }
            })
            .catch(err=>{
                console.log(err, "with id: ", props.itempost.id)
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
            data: {PostId: props.itempost.id, comment:inputTextComment},
            headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
            console.log(response)
            getComment()
        })
        .catch(err => {
            console.log(err)
        })
    }

    function repost(item){
        let newpost = {
            title: item.title,
            image_url: item.image_url,
            //views: req.body.views,
            location: item.location,
            origin_userid: item.User.id
        }
        axios({
            method : "post",
            url: `${host}/posts`,
            headers: { token: localStorage.getItem('token') },
            data: newpost
        })
        .then(data=>{
            console.log(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function submitLike(PostId){
        axios({
            method: "post",
            url: `http://localhost:3000/likes`,
            data: {PostId},
            headers : { token: localStorage.getItem('token') }
        })
        .then(data=>{
            console.log(data.data)
            getLikes()
        })
        .catch (err=>{
            console.log(err)
        })
    }

    function pindahkepostdetail(){
    AddViewPost(props.itempost.id)
    history.push(`/detailpost/${props.itempost.id}`)
    }

    return (
        <div className="post-block">
            <div>
                <div>
                    <Link to={`/user/${props.itempost.User.id}`} >
                        <img src={props.itempost.User.image} alt="profile" className="img-follow" />
                        {props.itempost.User.name}
                    </Link>
                    <br></br>
                    {props.itempost.title}
                </div>
            </div>
            <div>
                <img onClick={pindahkepostdetail} src={props.itempost.image_url} alt="gambar" className="img-home"></img>
            </div>
            <div className="actionBar">
                {
                    (!mylike)
                    ? <span> <img src={like} alt="logo" className="img-icon" onClick={()=>submitLike(props.itempost.id)}></img></span> 
                    : <span> <img src={likegrey} alt="logo" className="img-icon" onClick={()=>submitLike(props.itempost.id)}></img></span> 
                }
                <span><img src={add} alt="logo" className="img-icon" onClick={()=>repost(props.itempost)}></img></span>
            </div>
            <div>Liked by: </div>
            <div>
                {(likes.length>0) && likes.map((item,idx)=>{
                    return(
                        <>
                            <div key={idx}>
                                <span>{item.User.name}</span>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="commentSection">
                {(commenterAndComment.length>0) &&
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
            <div className="typeCommentSection">
                <form className="inputComment" onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a comment..." name="comment" onChange={handleChange} />
                </form>
            </div>
        </div>
    )
}

