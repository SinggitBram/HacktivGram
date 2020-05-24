import React, {useState,useEffect} from 'react'
import axios from "axios";
import ImageOnlyCard from '../components/ImageOnlyCard'
import UserExploreCard from '../components/UserExploreCard'
import Navbar from '../components/navbar'

export default function Explore() {

    const host = 'http://localhost:3000'

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
                console.log(alluser, "---alluser")
                axios({
                    methods : "get",
                    url : `${host}/follows/following`,
                    headers: { token: localStorage.getItem('token') }
                })
                .then(response=>{
                    let following = response.data
                    let myFirstObjArray = alluser
                    let mySecondObjArray = following
                    let array  = myFirstObjArray.filter(o=> !mySecondObjArray.some(i=> i.id === o.id))
                    console.log(array, "---array")
                    let token = localStorage.getItem('token')
                    axios({
                        method : "get",
                        url: `${host}/users`,
                        headers: {token},
                    })
                    .then(data=>{
                        console.log(data.data, "----data")
                        for(let i=0; i<array.length; i++){
                            if(array[i].id!==data.data.id){
                                newarray.push(array[i])
                            }
                        }
                        console.log(newarray,"--newarray")
                        setBulkUsers(newarray)
                        setUserLoading(false)
                    })

                    let newarray = []
                    
                    
                })
                
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
       
        <div style={style.explorePage}>
             <Navbar />
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