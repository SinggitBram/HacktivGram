import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/images/logoHacktivgram.png'
import search from '../assets/images/search.png'
import home from '../assets/images/home.png'
import camera from '../assets/images/camera.png'
import add from '../assets/images/add.png'
import like from '../assets/images/like.png'
import { getUserDetail } from '../store/actions/userLoginDetail'

import Follow from './Follow'

import { Modal } from 'react-bootstrap'

export default function Navbar() {

	const host = 'https://safe-headland-69478.herokuapp.com' // 'http://localhost:3000'

	const dispatch = useDispatch()
	const { userdetail } = useSelector(state => state.userLoginDetail)

	const [showFollower, setShowFollower] = useState(false)
	const [searchUser, setSearchUser] = useState('')
	const [users, setUsers] = useState([])
	const [showUsers, setShowUsers] = useState(false)
	const [following, setFollowing] = useState([])
	const [toFollow, setToFollow] = useState([])

	useEffect(() => {
		dispatch(getUserDetail())
	}, [dispatch])

	function searchChange(e) {
		setSearchUser(e.target.value)
	}

	const handleCloseFollower = () => setShowFollower(false);
	const handleCloseUsers = () => setShowUsers(false)

	function showModalFollower() {
		let token = localStorage.getItem('token')
		axios({
			method: "get",
			url: `${host}/follows`,
			headers: { token }
		})
			.then(data => {
				console.log(data.data, "---followers")
				let arrFollower = data.data
				return axios({
					method: 'get',
					url: `${host}/follows/following`,
					headers: { token }
				})

					.then(data => {
						let arrFollowing = data.data
						console.log(arrFollowing, 'I am following')
						setFollowing(arrFollowing)
						let myFirstObjArray = arrFollower
						let mySecondObjArray = arrFollowing
						let newarray = myFirstObjArray.filter(o => !mySecondObjArray.some(i => i.id === o.id))
						setToFollow(newarray)
					})
			})
			.catch(err => {
				console.log(err)
			})
		setShowFollower(true)
	}

	function clickSearch(e) {
		e.preventDefault();
		let token = localStorage.getItem('token')
		var regex = new RegExp(searchUser, "i")
		axios({
			method: "get",
			url: `${host}/users/all`,
			headers: { token }
		})
			.then(data => {
				let result = data.data
				let newresult = []
				for (let i = 0; i < result.length; i++) {
					let str = result[i].name
					if (str.match(regex)) {
						newresult.push(result[i])
					}
				}
				setUsers(newresult)
				setShowUsers(true)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<div className="nav-flex" style={{ backgroundColor: 'white' }}>
				<div>
					<img src={logo} alt="logo" className="img-logo"></img>
				</div>
				<div>
					<form onSubmit={clickSearch}>
						<input type="text" placeholder="Search" className="input-search" onChange={searchChange}></input>
					</form>
				</div>
				<div>
					<Link to="/"><img src={home} alt="logo" className="img-icon"></img></Link>
					<Link to="/explore"><img src={camera} alt="logo" className="img-icon"></img></Link>
					<Link to="/post"><img src={add} alt="logo" className="img-icon"></img></Link>
					<img src={like} alt="logo" className="img-icon" onClick={showModalFollower}></img>
					<Link to="/profile"><img src={userdetail.image} alt="logo" className="img-profile"></img></Link>
				</div>

				<Modal show={showFollower} onHide={handleCloseFollower}>
					<Follow toFollow={toFollow} following={following} handleCloseFollower={handleCloseFollower} />
				</Modal>

				<Modal show={showUsers} onHide={handleCloseUsers}>
					<div>
						<h3>Result search users</h3>
						<div>
							{users.map((item, idx) => (
								<div key={idx} className="flex-follow">
									<div className="flex-follow">
										<Link to={`/user/${item.id}`} ><img src={item.image} alt="profile" className="img-follow" /></Link>
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