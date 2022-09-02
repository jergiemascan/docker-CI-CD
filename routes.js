const express = require("express");
const router = express.Router();
const { signup, login } = require("./authController");

router.post("/signup/v1", signup);
router.post("/signin/v1", login);

module.exports = router;
