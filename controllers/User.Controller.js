require('dotenv').config()
const { User } = require('../models')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');




exports.getAllUsers = async (req, res) => {
	await User.findAll()
		.then(result => res.send(result))
		.catch(err => console.log(err));
}


exports.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		const hashedPassword = bcrypt.hashSync(password, 8);

		const user = await User.create({ name, email, password: hashedPassword })

		res.status(201).json({
			_msg: "User Created Succesfully",
			data: user,
			error: null
		})
	} catch (error) {
		res.status(500).json({
			_msg: "Error creating user",
			data: null,
			error: error.message
		})
	}
}


exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email: email
			}
		})
		if (user === null) {
			return res.status(400).send({
				_msg: `User with email ${email} does not exist`,
				data: null,
				error: null
			});
		}

		var passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(404).json({
				_msg: `Invalid Credentials`,
				data: null,
				error: null
			});
		}

		var token = jwt.sign({
			id: `${user.id}`,
			name: `${user.name}`,
			email: `${user.email}`,
		}, process.env.JWT_SECRET, {
			expiresIn: 86400
		});

		return res.status(200).json({
			_msg: `Login Succesful`,
			error: null,
			auth: true, accessToken: token
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			_msg: `Invalid Credentials`,
			data: null,
			error: error.message
		})
	}


}