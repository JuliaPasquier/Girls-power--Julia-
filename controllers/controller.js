// imports
require('dotenv').config();
const User = require("../models/User");
const Offer = require("../models/Offer");
const jwt = require("jsonwebtoken");
const { handleProfilePictureUpload, handleResumeUpload } = require('../middleware/uploadMiddleware');
const secret = process.env.JWT_SECRET;
const maxAge = process.env.MAX_AGE;

let currentUserId;

// create token
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    });
};

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	// incorrect email
	if (err.message === "incorrect email") {
		errors.email = "That email is not registered";
	}

	// incorrect password
	if (err.message === "incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.email = "Email already exists";

		return errors;
	}

	// validation errors
	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

//Controller actions
module.exports.dashboard_get = (req, res) => {
    res.render("index");
};

module.exports.offers_get = async (req, res) => {
	const author = req.params.author;
	console.log(author);
	try {
		const offers = await Offer.find({ author: currentUserId });
		res.status(200).json({ offers: offers });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
}
};

module.exports.register_get = (req, res) => {
    res.render("register");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.register_post = async (req, res) => {
	console.log("Register Post")
    const { firstName, 
        lastName, 
        email, 
        github, 
        password } = req.body;
	try {
		const profilePictureUrl = await handleProfilePictureUpload(req, res);
    	const resumeUrl = await handleResumeUpload(req, res);
		const user = await User.create({ 
            firstName, 
            lastName, 
            email, 
            github, 
            profilePictureUrl,
            resumeUrl,
            password });
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			maxAge: maxAge * 1000,
			httpOnly: true
		});
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.login_post = async (req, res) => {
	const { 
		email, 
        password } = req.body;
		try {
			const user = await User.login(email, password);
			const token = createToken(user._id);
			res.cookie("jwt", token, {
				maxAge: maxAge * 1000,
				httpOnly: true,
			});
			currentUserId = user._id;
			res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/login");
};

module.exports.profile_get = (req, res) => {
    res.render("profile");
};

module.exports.create_get = (req, res) => {
    res.render("create-offer");
};

module.exports.create_post = async (req, res) => {
	const { 
        jobTitle, 
        url, 
        employer, 
        offerOrigin, 
        offerStatus, 
        comments } = req.body;

	try {
		const newOffer = await Offer.create({ 
                jobTitle, 
                url, 
                employer, 
                offerOrigin, 
                offerStatus, 
                comments,
                author: currentUserId });
		//res.status(201).json({ offer: newOffer._id });
        res.status(201).redirect("/");
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.update_get = (req, res) => {
    res.render("update-offer");
};

module.exports.update_put = async (req, res) => {
    const offerId = req.params.id;
	console.log(offerId);
	
	const { 
		jobTitle, 
		url, 
		employer, 
		offerOrigin, 
		offerStatus, 
		comments } = req.body;
	
	try {
		const updatedOffer = await Offer.updateOne(
			{ _id: offerId }, 
			{ $set:
				{ 
					updatedAt: Date.now(),
					jobTitle, 
					url, 
					employer, 
					offerOrigin, 
					offerStatus, 
					comments 
				}
			}
		); 
		res.status(201).json({ offer: updatedOffer._id });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
