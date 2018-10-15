const express = require("express");
const router = express.Router();

// GET route to api/profile/test
// tests the profile route
// it is a public route
router.get("/test", (req, res) => res.json({
    msg: "Profile Works!"
}));

module.exports = router;