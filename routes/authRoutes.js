const express = require("express");
const { signup, signing, signout } = require("../controllers/authController");
const { signupValidator } = require("../helpers/validator");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/signin", signing);
router.get("/signout", signout);

module.exports = router;
