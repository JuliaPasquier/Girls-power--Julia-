const mongoose = require("mongoose");
const { isEmail } = require("validator");

const offerSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
	jobTitle: {
		type: String,
		required: [true, "Please enter a job title"],
		trim: true,
	},
	url: {
		type: String,
		required: [true, "Please enter the job offer URL"],
		trim: true,
	},
	employer_name: {
		type: String,
		required: [true, "Please enter the name of the employer"],
		trim: true,
	},
	employer_email: {
		type: String,
		required: [true, "Please enter your email"],
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
		trim: true,
	},
	employer_phone: {
		type: String,
		trim: true,
	},
	employer_address: {
		type: String,
		trim: true,
	},
	offer_origin: {
		type: String,
		required: true,
	},
	offer_status: {
		type: String,
		required: true,
	},
	comments: {
		type: String,
	},
	author: {
		type: Object,
	},
});

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
