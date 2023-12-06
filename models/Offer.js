const mongoose = require("mongoose");
const { isEmail } = require("validator");

// const employerSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 	},
// 	employerEmail: {
// 		type: String,
// 		required: [true, "Please enter your email"],
// 		lowercase: true,
// 		validate: [isEmail, "Please enter a valid email"],
// 		trim: true,
// 	},
// 	phone: {
// 		type: String,
// 		trim: true,
// 	},
// 	address: {
// 		type: String,
// 		trim: true,
// 	},
// });

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
		required: true,
		trim: true,
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	employer: {
		name: {
			type: String,
			required: true,
			trim: true,
		},
		employerEmail: {
			type: String,
			required: [true, "Please enter your email"],
			lowercase: true,
			validate: [isEmail, "Please enter a valid email"],
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		}
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
	}
});

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
