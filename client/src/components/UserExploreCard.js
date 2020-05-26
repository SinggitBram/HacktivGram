import React from 'react'
import { Image, Card,Button } from 'react-bootstrap';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'


function UserExploreCard(props) {

    const host = 'https://safe-headland-69478.herokuapp.com' //'http://localhost:3000'

    const history = useHistory()

    function submitFollow(id){
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
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
        <Card>
            <Card.Header>
            <Link to={`/user/${props.userData.id}`} ><Image style={{ height: '100px', width: '100px' }} src={props.userData.image} roundedCircle /></Link>
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.userData.name}</Card.Title>
                <Card.Text>
                    New to HacktivGram
                </Card.Text>
                <Button variant="primary" onClick={()=>submitFollow(props.userData.id)}>Follow</Button>
            </Card.Body>
        </Card>
    )
}

export default UserExploreCard