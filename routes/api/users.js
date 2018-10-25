const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

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
                const avatar = gravatar.url(req.body.email, {
                    size: "200",
                    rating: "pg",
                    default: "mm"
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            }
        })
});

// GET api/users/login
// Login User / Returning JWT Token
// it is a public route

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({
            email
        })
        .then(user => {
            // Check for user
            if (!user) {
                return res.status(404).json({
                    email: "User not found"
                });
            }

            // Check Password.
            // We will use bcrypt to compare the passwords.
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched

                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } // Create JWT Payload

                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res.status(400).json({
                            password: "Incorrect Password"
                        });
                    }
                })
        });
});

// GET route to api/users/current
// Return current user
// It is a private route
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;