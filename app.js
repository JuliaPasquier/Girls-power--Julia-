//Importing required modules
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const router = require("./routes/router");
const mongoose = require("mongoose");

const DbUri = process.env.DB_URI;

//Initializing the app
const app = express();

//Middleware
app.use(express.json());
app.use(express.static("public"));

//View engine

//DB connection
mongoose
	.connect(DbUri)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => console.log(err));

//Routes
app.use(router);

module.exports = app;

//app.get("*", checkUser);

//Cookies
