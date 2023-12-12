//Importing required modules
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
const router = require("./routes/router");
const { checkUser } = require("./middleware/authMiddleware");

const DbUri = process.env.MONGODB_URI || process.env.DB_URI;

//Initializing the app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//View engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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
app.get("*", checkUser);
app.use(router);

// Required export for Vercel  
module.exports = app;   
