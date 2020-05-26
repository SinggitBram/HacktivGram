import React from 'react'
import { Image, Card, Button } from 'react-bootstrap';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'


function UserExploreCard(props) {

    const host = 'https://safe-headland-69478.herokuapp.com' //'http://localhost:3000'

    const history = useHistory()

    function submitFollow(id) {
        let token = localStorage.getItem('token')
        axios({
            method: 'post',
            url: `${host}/follows`,
            headers: { token },
            data: {
                targetUserId: id
            }
        })
            .then(data => {
                console.log(data.data)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div style={{ Left: 20 }}>
            <Card style={{ height: 230, marginLeft: 10, width: 180, marginRight: 10 }}>
                <Card.Body style={{ justifyContent: "center", display: "flex", backgroundColor: 'white' }}>
                    <Link to={`/user/${props.userData.id}`} ><Image style={{ height: '50px', width: '50px' }} src={props.userData.image} roundedCircle /></Link>
                </Card.Body>
                <Card.Body style={{ marginTop: -25 }}>
                    <Card.Title style={{ fontSize: 13, fontWeight: "bold", height: 20, textAlign: "center" }}>{props.userData.name}</Card.Title>
                    <Card.Text style={{ fontSize: 13, textAlign: "center", marginTop: -10 }}>New to HacktivGram</Card.Text>
                </Card.Body>
                <Card.Body style={{ justifyContent: "center", display: "flex" }}>
                    <Button variant="primary" onClick={() => submitFollow(props.userData.id)}>Follow</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserExploreCard