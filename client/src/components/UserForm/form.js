import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setRegister } from "../../store/actions/loginAndRegister";

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
			case "image":
				setImage(e.target.value);
			case "name":
				setName(e.target.value);
			case "birthdate":
				setBirthdate(e.target.value);
			default:
				break;
		}
	};

	return (
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
				<>
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
						placeholder="url image"
						name="image"
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
				</>
			)}
		</form>
	);
}
