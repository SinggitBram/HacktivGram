import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Follower(props) {
    const host = 'http://localhost:3000'

    function submitFollow(id){
        console.log(id, "masuk submit follow")
        let token = localStorage.getItem('token')
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
            props.handleCloseFollower()
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
        <div>
            <h3>ToFollow and Following</h3>
            <div>
                {props.toFollow.map((item, idx)=>(
                    <div key={idx} className="flex-follow">
                        <div className="flex-follow">
                            <Link to={`/user/${item.id}`}><img src={ item.image } alt="profile" className="img-follow" /></Link>
                            {item.name} is following you
                        </div>
                        <button type="button" onClick={()=>submitFollow(item.id)}>Follow</button>
                    </div>
                ))}
            </div>
            <div>
                {props.following.map((item, idx)=>(
                    <div key={idx} className="flex-follow">
                        <div className="flex-follow">
                            <Link to={`/user/${item.id}`}><img src={ item.image } alt="profile" className="img-follow" /></Link>
                            {item.name} and you follow each other
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
       
    )
}

