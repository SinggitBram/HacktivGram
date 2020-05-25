import React from 'react'
import { Image } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

function ImageOnlyCard(props) {
    const history = useHistory();

    function pindahkepostdetail(){
        history.push(`/detailpost/${props.postData.id}`)
        }

    return (
        <Image onClick={pindahkepostdetail} style={{ height: '300px', width: '250px' }} src={props.postData.image_url} thumbnail />
    )
}

export default ImageOnlyCard