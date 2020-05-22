const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
	static registerUser(req, res) {
		const { name, image, birthdate, email, password } = req.body;
		let option = { where: { email } };
		User.findOne(option)
			.then((user) => {
				if (user) {
					res.status(400).json({
						message: "User already exist",
					});
				} else {
					return User.create({
						name,
						image,
						birthdate,
						email,
						password,
					});
				}
			})
			.then((newUser) => {
				const token = jwt.sign(
					{
						id: newUser.id,
						email: newUser.email,
					},
					process.env.SECRET
				);
				res.status(201).json({ name, token });
			})
			.catch((err) => {
				res.status(500).json({
					message: "Internal server error",
				});
			});
	}

	static loginUser(req, res) {
		const { email, password } = req.body;
		let option = { where: { email } };
		User.findOne(option)
			.then((user) => {
				if (!user) {
					res.status(404).json({
						message: "User not found",
					});
				} else {
					if (compare(password, user.password)) {
						const token = jwt.sign(
							{
								id: user.id,
								email: user.email,
							},
							process.env.SECRET
						);
						res.status(200).json({ name: user.name, token });
					} else {
						res.status(400).json({
							message: "Wrong password",
						});
					}
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: "Internal server error",
				});
			});
	}

	static getDetailUser(req, res) {
		User.findOne({
			where: { id: req.userdata.id }
		})
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(500).json(err)
			})
	}
}

module.exports = UserController;
