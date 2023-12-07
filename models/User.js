const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your first name"],
		minlength: [3, "Minimum length is 3 characters"],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, "Please enter your last name"],
		minlength: [3, "Minimum length is 3 characters"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
		trim: true,
	},
	github: {
		type: String,
		trim: true,
	},
	profilePicture: {
		type: String,
		trim: true,
	},
	resume: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum length is 6 characters"],
		trim: true,
	},
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// compare the entered password with the hashed one in database
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
