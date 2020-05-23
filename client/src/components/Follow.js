import React from 'react'
import axios from 'axios'

export default function Follower(props) {
    const host = 'http://localhost:3000'

    function submitFollow(id){
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
                            <img src={ item.image } alt="profile" className="img-follow" />
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
                            <img src={ item.image } alt="profile" className="img-follow" />
                            {item.name} and you follow each other
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
       
    )
}

