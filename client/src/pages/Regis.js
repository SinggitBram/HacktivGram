import React from "react";
import "../App.css";

import Regis from "../components/UserForm/login";

export default function Register() {
	return (
		<div style={{ backgroundColor: "#FAFAFA" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<img
					style={{
						width: "35%",
						height: "33%",
						marginTop: 35,
					}}
					src={require("../assets/images/regphone.jpg")}
				/>
				<Regis />
			</div>
			{/* <div className="sub" id="footer"> */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 50,
				}}
			>
				<div
					style={{
						display: "flex",
						color: "#385185",
						fontSize: 12,
						flexDirection: "row",
						marginBottom: 30,
						fontWeight: "bold",
					}}
				>
					<p style={{ marginRight: "0.7rem" }}>ABOUT</p>
					<p style={{ marginRight: "0.7rem" }}>HELP</p>
					<p style={{ marginRight: "0.7rem" }}>PRESS</p>
					<p style={{ marginRight: "0.7rem" }}>API</p>
					<p style={{ marginRight: "0.7rem" }}>JOBS</p>
					<p style={{ marginRight: "0.7rem" }}>PRIVACY</p>
					<p style={{ marginRight: "0.7rem" }}>TERMS</p>
					<p style={{ marginRight: "0.7rem" }}>LOCATIONS</p>
					<p style={{ marginRight: "0.7rem" }}>TOP ACCOUNTS</p>
					<p style={{ marginRight: "0.7rem" }}>HASTAGS</p>
					<p style={{ marginRight: "0.7rem" }}>LANGUAGE</p>
				</div>
				<div
					style={{
						color: "grey",
						fontSize: 13,
						fontWeight: "bold",
						marginLeft: "3rem",
					}}
				>
					<p>© 2020 INSTAGRAM FROM FACEBOOK</p>
				</div>
			</div>
		</div>
	);
}
