import React from 'react'

export default  function PostHome(props) {
    return (
        <div className="post-block">
            <div>
                <div className="flex-follow">
                    <img src={ props.itempost.User.image } alt="profile" className="img-follow" />
                    {props.itempost.User.name} 
                </div>
            </div>
            <img src={props.itempost.image_url} alt="gambar"></img>
        </div>
    )
}

