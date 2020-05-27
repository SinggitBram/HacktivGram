import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin, setRegister } from '../../store/actions/loginAndRegister';
import { storage } from '../../firebase/firebase'

export default function Form(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [birthdate, setBirthdate] = useState(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			email,
			password,
			name,
			image,
			birthdate,
		};
		if (pathname === "/login") {
			dispatch(setLogin(data))
				.then(() => {
					history.push("/");
				})
				.catch((e) => alert("WRONG"));
		} else {
			dispatch(setRegister(data))
				.then(() => {
					history.push("/");
				})
				.catch((e) => alert("WRONG"));
		}
	};

	const handleChange = (e) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			case "image":
				setImage(e.target.value);
				break;
			case "name":
				setName(e.target.value);
				break;
			case "birthdate":
				setBirthdate(e.target.value);
				break;
			default:
				break;
		}
	};

	const [imageAsFile, setImageAsFile] = useState('')

	const handleImageAsFile = (e) => {
		const image = e.target.files[0]
		setImageAsFile(imageFile => (image))
	}

	const handleFireBaseUpload = e => {
		e.preventDefault()
		console.log('start of upload')
		if (imageAsFile === '') {
			console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
		}
		const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
		uploadTask.on('state_changed',
			(snapShot) => {
				console.log(snapShot)
			}, (err) => {
				console.log(err)
			}, () => {
				storage.ref('images').child(imageAsFile.name).getDownloadURL()
					.then(fireBaseUrl => {
						console.log(fireBaseUrl, "---firebaseURl")
						setImage(fireBaseUrl)
					})
			})
	}

	return (
		<div>
			<form className="sub4" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="email"
					name="email"
					style={{
						width: 280,
						height: 35,
						backgroundColor: "#FAFAFA",
						fontSize: 13,
					}}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					style={{
						width: 280,
						height: 35,
						backgroundColor: "#FAFAFA",
						fontSize: 13,
					}}
					onChange={handleChange}
				/>
				{pathname === "/login" ? (
					<button
						style={{ backgroundColor: "#B2DFFC", borderRadius: 5 }}
						type="submit"
					>
						Log In
					</button>
				) : (
						<div>
							<input
								type="text"
								placeholder="name"
								name="name"
								style={{
									width: 280,
									height: 35,
									backgroundColor: "#FAFAFA",
									fontSize: 13,
								}}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="url image or upload your image below"
								name="image"
								value={image}
								style={{
									width: 280,
									height: 35,
									backgroundColor: "#FAFAFA",
									fontSize: 13,
								}}
								onChange={handleChange}
							/>
							<input
								type="date"
								placeholder="birthdate"
								name="birthdate"
								style={{
									width: 280,
									height: 35,
									backgroundColor: "#FAFAFA",
									fontSize: 13,
								}}
								onChange={handleChange}
							/>
							<button
								style={{ backgroundColor: "#B2DFFC", borderRadius: 5 }}
								type="submit"
							>
								Register
					</button>
						</div>
					)}
			</form>
			{(pathname !== '/login') && (
				<form className="sub4" onSubmit={handleFireBaseUpload}>
					Upload your image here
					<input
						type="file"
						onChange={handleImageAsFile}
						style={{
							width: 280,
							height: 35,
							backgroundColor: "#FAFAFA",
							fontSize: 13,
						}}
					/>
					<button style={{ backgroundColor: "#B2DFFC", borderRadius: 5 }}
						type="submit">Upload Photo</button>
				</form>
			)}
		</div>
	);
}


