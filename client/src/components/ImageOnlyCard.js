import React from 'react'
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import AddViewPost from '../assets/functions/AddViewPost'

function ImageOnlyCard(props) {
    const history = useHistory();

    function pindahkepostdetail() {
        AddViewPost(props.postData.id)
        history.push(`/detailpost/${props.postData.id}`)
    }

    return (
        <Image onClick={pindahkepostdetail} style={{ height: '300px', width: '250px' }} src={props.postData.image_url} />
    )
}

export default ImageOnlyCard