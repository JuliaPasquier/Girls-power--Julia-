require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require('../models/User');
const Offer = require("../models/Offer");



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
	console.log('blue')
	if (token) {
		console.log("vert");
		jwt.verify(token, secret, async (err, decodedToken) => {
			if (err) {
				console.log('jaune')
				res.locals.user = null;
				next();
			} else {
				console.log("rouge")
				let user = await User.findById(decodedToken.id);
				console.log("bleu")
				res.locals.user = user;
				console.log(user, "user")
				let offers = await Offer.find({ author: user._id });
				res.locals.offers = offers;
				console.log(offers, "iciiiiii")
				
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };
