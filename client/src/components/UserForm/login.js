import React from "react";
import "./User.css";
import Form from "./form";
import { Link, useLocation } from "react-router-dom";

export default function Regis() {
	const { pathname } = useLocation();
	return (
		<div className="container2">
			<div className="sub2 card">
				<img
					style={{
						width: "50%",
						height: "50%",
						marginTop: 10,
					}}
					src={require("../../assets/images/logoHacktivgram.png")}
				/>
				<Form />
				<img
					style={{
						width: "85%",
						height: "85%",
						marginTop: 10,
						marginBottom: 10,
					}}
					src={require("../../assets/images/facebook-icon.png")}
				/>
			</div>
			<div className="sub3 card" style={{ marginTop: -20 }}>
				{pathname === "/login" ? (
					<p style={{ textAlign: "center", margin: 20 }}>
						Don't have an account?
						<span>
							<Link to="/register"> Sign Up</Link>
						</span>
					</p>
				) : (
					<p style={{ textAlign: "center", margin: 20 }}>
						Already have an account?
						<span>
							<Link to="/login"> Log in</Link>
						</span>
					</p>
				)}
			</div>
			<div className="sub2" style={{ marginTop: -15 }}>
				<p style={{ fontSize: 15 }}>Get the app.</p>
				<div className="sub3" style={{ marginTop: 10 }}>
					<img
						className="img2"
						style={{ width: "40%" }}
						src={require("../../assets/images/appstore.png")}
					/>
					<img
						className="img2"
						style={{ width: "40%" }}
						src={require("../../assets/images/googleplay.png")}
					/>
				</div>
			</div>
		</div>
	);
}
