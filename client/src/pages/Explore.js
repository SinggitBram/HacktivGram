import React, { useState, useEffect } from 'react'
import axios from "axios";
import ImageOnlyCard from '../components/ImageOnlyCard'
import UserExploreCard from '../components/UserExploreCard'
import Navbar from '../components/navbar'

export default function Explore() {

    const host = 'https://safe-headland-69478.herokuapp.com'   //'http://localhost:3000'

    const [bulkPosts, setBulkPosts] = useState([])
    const [postLoading, setPostLoading] = useState(true)
    const [bulkUsers, setBulkUsers] = useState([])
    const [userLoading, setUserLoading] = useState(true)

    useEffect(() => {

        axios({
            method: "get",
            url: `${host}/posts/all`,
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
            url: `${host}/users/all`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                let alluser = response.data
                axios({
                    methods: "get",
                    url: `${host}/follows/following`,
                    headers: { token: localStorage.getItem('token') }
                })
                    .then(response => {
                        let following = response.data
                        let myFirstObjArray = alluser
                        let mySecondObjArray = following
                        let array = myFirstObjArray.filter(o => !mySecondObjArray.some(i => i.id === o.id))
                        let token = localStorage.getItem('token')
                        axios({
                            method: "get",
                            url: `${host}/users`,
                            headers: { token },
                        })
                            .then(data => {
                                let newarray = []
                                for (let i = 0; i < array.length; i++) {
                                    if (array[i].id !== data.data.id) {
                                        newarray.push(array[i])
                                    }
                                }
                                setBulkUsers(newarray)
                                setUserLoading(false)
                            })
                    })

            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    if (postLoading) {
        return <h3>Loading post...</h3>
    }
    if (userLoading) {
        return <h3>Loading user...</h3>
    }

    return (

        <div style={{ backgroundColor: "#FAFAFA" }}>
            <Navbar />

            <div style={{ paddingLeft: 100, paddingRight: 100 }}>
                <div style={{ paddingTop: 80, marginBottom: 10 }}>
                    <p style={{ fontSize: 13, fontWeight: "bold", color: "grey" }}>Discover people</p>
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

                <div style={{ marginTop: 50 }}>
                    <p style={{ fontSize: 13, fontWeight: "bold", color: "grey" }}>Explore</p>
                </div>
                <div style={style.divGambar} >
                    {bulkPosts.map((bulkPost, idx) => {
                        return (
                            <div style={style.divUser} key={idx}>
                                <ImageOnlyCard key={idx} postData={bulkPost} />
                            </div>
                        )
                    })}
                </div>

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
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        overflowX: "auto",
        marginLeft: 5

    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    divGambar: {
        paddingTop: 10,
        display: 'flex',
        flexWrap: "wrap",
        marginLeft: 5,
    },
    divUser: {
        flexDirection: "row",
        padding: 5

    }
}