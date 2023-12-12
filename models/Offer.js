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
	employerName: {
		type: String,
		required: [true, "Please enter the name of the employer"],
		trim: true,
	},
	employerEmail: {
		type: String,
		required: [true, "Please enter your email"],
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
		trim: true,
	},
	employerPhone: {
		type: String,
		trim: true,
	},
	employerAddress: {
		type: String,
		trim: true,
	},
	offerOrigin: {
		type: String,
		required: true,
	},
	offerStatus: {
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
