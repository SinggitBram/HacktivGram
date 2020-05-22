import React, {useState,useEffect} from 'react'
import axios from "axios";
import ImageOnlyCard from '../components/ImageOnlyCard'
import UserExploreCard from '../components/UserExploreCard'

export default function Explore() {

    const [bulkPosts, setBulkPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true)
    const [bulkUsers, setBulkUsers] = useState([])
    const [userLoading, setUserLoading] = useState(true)


    useEffect(() => {

        axios({
            method: "get",
            url: `http://localhost:3000/posts/all`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setBulkPosts(response.data)
                setPostLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        axios({
            method: "get",
            url: `http://localhost:3000/users/all`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                setBulkUsers(response.data)
                setUserLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (

        <div style={style.explorePage}>
            <div>
                <h3>Discover people</h3>
            </div>

            <div style={style.userContainer}>
                {bulkUsers.map((bulkUser, idx) => {
                    return (
                        <div style={style.divUser} key={idx}>
                            <UserExploreCard key={idx} userData={bulkUser} />
                        </div>
                    )
                })}
            </div>

            <div>
                <h3>Explore</h3>
            </div>

            <div style={style.imageContainer}>
                {bulkPosts.map((bulkPost, idx) => {
                    return (
                        <div style={style.divGambar} key={idx}>
                            <ImageOnlyCard key={idx} postData={bulkPost} />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}


const style = {
    profilePage: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '65%',
        margin: 'auto'
    },
    userContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    divGambar: {
        flexBasis: '30%',
    },
    divUser: {
        flexBasis: '20%',
    }
}