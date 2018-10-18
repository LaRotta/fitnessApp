const express = require("express");
const router = express.Router();

//Load user model
const User = require("../../models/User");

// GET route to api/users/test
// tests the users route
// it is a public route
router.get("/test", (req, res) => res.json({
    msg: "Users Works!"
}));


// GET route to api/users/register
// registers the user
// it is a public route
router.post("/register", (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });
            }
        })
});

module.exports = router;