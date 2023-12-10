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
app.use(router);
app.get("*", checkUser);

// Required export for Vercel  
module.exports = app;

// var cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//   cloud_name: 'dtocby9kk', 
//   api_key: '972974636311823', 
//   api_secret: 'Cpg8MgtUaFCyPbDzOX1iXrzCMZo' 
// });

// cloudinary.uploader.upload("public\img\CV.JPG", function(error, result) {
// 	console.log(result, error);
//    });
   