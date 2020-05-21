import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Profile(){

    const [bulkPosts, setBulkPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [accountName, setAccountName] = useState(null)
    const [accountImage, setAccountImage] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    const [followerLoading, setFollowerLoading] = useState(true)
    const [followingLoading, setFollowingLoading] = useState(true)

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:3000/users`,
            headers: {token: localStorage.getItem("token")}
        })
        .then(response => {
            setAccountName(response.name)
            setAccountImage(response.image)
            setUserLoading(false)
        })
        .catch(err => {
            console.log(err)
        })

        axios({
            method: "get",
            url: `http://localhost:3000/posts`,
            headers: {token: localStorage.getItem("token")}
        })
        .then(response => {
            setBulkPosts(response)
            setPostCount(response.length)
            setPostLoading(false)
        })
        .catch(err => {
            console.log(err)
        })

        axios({
            method: "get",
            url: `http://localhost:3000/follows`,
            headers: {token: localStorage.getItem("token")}
        })
        .then(response => {
            setFollowerCount(response.length)
            setFollowerLoading(false)
        })
        .catch(err => {
            console.log(err)
        })

        axios({
            method: "get",
            url: `http://localhost:3000/follows/following`,
            headers: {token: localStorage.getItem("token")}
        })
        .then(response => {
            setFollowingCount(response.length)
            setFollowingLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    })

    if(postLoading || followerLoading || followingLoading || userLoading) {
        return (
            <>
                <h1>Loading.....</h1>
            </>
        )
    }


    return (
        <>
            

        </>

    )
}