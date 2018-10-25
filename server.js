const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//you need this to be able to process information sent to a POST route
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());


// Database configuration

mongoose.connect('mongodb://localhost/fitness_db');

const db = mongoose.connection;

db.then(() => console.log("Yeeeeah Buddy...MongoDB Connected!"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);



// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);







app.listen(3000, () => console.log("I'm running on port 3000 Yo!"));