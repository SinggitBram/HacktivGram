import React, { useState } from 'react'
import axios from 'axios'
import {
    // BrowserRouter as Router,
    Link,
  } from 'react-router-dom'
import logo from '../assets/images/logoHacktivgram.png'
import search from '../assets/images/search.png'
import home from '../assets/images/home.png'
import camera from '../assets/images/camera.png'
import add from '../assets/images/add.png'
import like from '../assets/images/like.png'
import getUserDetail from '../hooks/getUserDetail'

import Follow from './Follow'

import {Modal} from 'react-bootstrap'

export default function Navbar(){

    const host = 'http://localhost:3000'

    const [data, loading, error] = getUserDetail(host)
    const [showFollower, setShowFollower] = useState(false)
    const [searchUser, setSearchUser] = useState('')
    const [users, setUsers] = useState([])
    const [showUsers, setShowUsers] = useState(false)
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    const [toFollow, setToFollow] = useState([])

    function searchChange(e){
        setSearchUser(e.target.value)
    }

    const handleCloseFollower = () => setShowFollower(false);
    const handleCloseUsers = () => setShowUsers(false)

    function showModalFollower(){
        console.log('masuk showModal')
         let token = localStorage.getItem('token')
         // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb21lc0BtYWlsLmNvbSIsImlhdCI6MTU5MDE1MTIzNX0.2xr0FvNTo8D3OB6CHHWcJVIxD26ynbhxWVw40-lMV6s'
         axios({
             method: "get",
             url : `${host}/follows`,
             headers : {token}
         })
         .then(data=>{
             console.log(data.data, "---followers")
             let arrFollower = data.data
             setFollower(arrFollower)
             return axios({
                 method: 'get',
                 url: `${host}/follows/following`,
                 headers: {token}
             })
        
            .then(data=>{
                console.log(data.data, "----following")
                let arrFollowing = data.data
                setFollowing(arrFollowing)
                let myFirstObjArray = arrFollower
                console.log(myFirstObjArray,"----follower arr")
                let mySecondObjArray = arrFollowing
                console.log(mySecondObjArray, "---following arr")
                let newarray  = myFirstObjArray.filter(o=> !mySecondObjArray.some(i=> i.id === o.id))
                console.log(newarray, "---newarray")
                setToFollow(newarray)
            })
        })
         .catch(err=>{
             console.log(err)
         })
        setShowFollower(true)
    }

    function clickSearch(e){ // BELUM DICOBA!!!!
        e.preventDefault();
         let token = localStorage.getItem('token')
         var regex = new RegExp(searchUser, "i")
         axios({
             method: "get",
             url : `${host}/users/all`,
             headers: {token}
         })
         .then(data=>{
             let result = data.data
             let newresult =[]
             for(let i=0; i<result.length; i++){
                let str = result[i].name
                if(str.match(regex)){
                    newresult.push(result[i])
                }
             }
            setUsers(newresult)
            setShowUsers(true)
         })
         .catch(err=>{
             console.log(err)
         })
    }
    
    if(loading){
        return <h3>Loading...</h3>
    }

    if(error){
        return <h3>Error brooh...</h3>
    }

    return (
        <>
            <div className="nav-flex">
                <img src={logo} alt="logo" className="img-logo"></img>
                <div>
                    <form  onSubmit={clickSearch}>
                    <img src={search} alt="search" className="img-icon" onClick={clickSearch}></img>
                    <input type="text" placeholder="Search" className="input-search" onChange={searchChange}></input>
                    </form>
                </div>
                <Link to="/"><img src={home} alt="logo" className="img-icon"></img></Link>
                <Link to="/explore"><img src={camera} alt="logo" className="img-icon"></img></Link>
                <Link to="/post"><img src={add} alt="logo" className="img-icon"></img></Link>
                <img src={like} alt="logo" className="img-icon" onClick={showModalFollower}></img>
                <Link to="/profile"><img src={data.image} alt="logo" className="img-profile"></img></Link>
                
                <Modal show={showFollower} onHide={handleCloseFollower}>
                    <Follow toFollow={toFollow} following={following} handleCloseFollower={handleCloseFollower}/>
                </Modal>

                <Modal show={showUsers} onHide={handleCloseUsers}>
                    <div>
                        <h3>Result search users</h3>
                        <div>
                            {users.map((item, idx)=>(
                                <div key={idx} className="flex-follow">
                                    <div className="flex-follow">
                                        <Link to={`/user/${item.id}`} ><img src={ item.image } alt="profile" className="img-follow" /></Link>
                                        {item.name} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>

            </div>
        </>
    )
}