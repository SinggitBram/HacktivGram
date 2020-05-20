"use strict";
module.exports = (sequelize, DataTypes) => {
	const Sequelize = sequelize.Sequelize;
	const Model = Sequelize.Model;
	const { bcrypt } = require("../helpers/bcrypt");

	class User extends Model {}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "Name cannot be Empty",
					},
				},
			},
			birthdate: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "Birthdate cannot be Empty",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "Email cannot be Empty",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "Password cannot be Empty",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					return bcrypt(instance.password).then((bcrypt) => {
						instance.password = bcrypt;
					});
				},
			},
			sequelize,
		}
	);

	User.associate = function (models) {
		// associations can be defined here
	};
	return User;
};
