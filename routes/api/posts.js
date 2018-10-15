const express = require("express");
const router = express.Router();

// GET route to api/posts/test
// tests post route
// public route
router.get("/test", (req, res) => res.json({
    msg: "Post Works!"
}));

module.exports = router;