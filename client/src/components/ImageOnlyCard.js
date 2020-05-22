import React from 'react'
import { Image } from 'react-bootstrap';

function ImageOnlyCard(props) {
    return (
        <Image style={{ height: '300px', width: '250px' }} src={props.postData.image_url} thumbnail />
    )
}

export default ImageOnlyCard