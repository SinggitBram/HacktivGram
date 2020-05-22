

import React from 'react'
import { Image, Card,Button } from 'react-bootstrap';

function UserExploreCard(props) {
    return (
        <Card>
            <Card.Header>
            <Image style={{ height: '100px', width: '100px' }} src={props.userData.image} roundedCircle />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.userData.name}</Card.Title>
                <Card.Text>
                    New to HacktivGram
                </Card.Text>
                <Button variant="primary">Follow</Button>
            </Card.Body>
        </Card>
    )
}

export default UserExploreCard