const express = require("express");
const router = express.Router();

// GET route to api/users/test
// tests the users route
// it is a public route
router.get("/test", (req, res) => res.json({
    msg: "Users Works!"
}));

module.exports = router;