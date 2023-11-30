//Importing required modules
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const router = require("./routes/router");

//Initializing the app
const app = express();

//Middleware
app.use(express.json());
app.use(express.static("public"));

//View engine

//DB connection
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Routes
app.use(router);
//app.get("*", checkUser);

//Cookies
