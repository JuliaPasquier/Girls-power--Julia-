require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require('../models/User');

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	//check js web token exists & is verified
	if (token) {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				res.clearCookie("jwt");
				res.redirect("/login");
			} else {
				req.user = decodedToken.id;
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, secret, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };
