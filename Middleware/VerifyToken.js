require('dotenv').config()
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	try {
		var token = req.headers['authorization'];
		if (!token)
			return res.status(401).send({
				_msg: "You are not authorized. Login First",
				data: null,
				error: null,
				auth: false,
			});

		jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
			if (err)
				return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

			// if everything good, save to request for use in other routes
			req.username = decoded.username;
			next();
		});
	} catch (err) {
		return res.status(401).json({
			_msg: "You are not authorized. Login First",
			data: null,
			error: err.message,
			auth: false,
		});
	}

}

module.exports = verifyToken;