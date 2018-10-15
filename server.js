const express = require("express");
const mongojs = require("mongojs");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");


const app = express();


//you need this to be able to process information sent to a POST route
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());


// Database configuration
// Save the URL of our database as well as the name of our collection
const databaseUrl = "fitness_db";
const collections = ["profiles"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", (error) => console.log("Database Error:", error));



// test route

app.get("/", (req, res) => res.send("hello"));

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);







app.listen(3000, () => console.log("I'm running on port 3000 Yo!"));