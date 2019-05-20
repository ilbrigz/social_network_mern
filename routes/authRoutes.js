const express = require("express");
const { signup, signing, signout } = require("../controllers/authController");
const { signupValidator } = require("../validators/validator");
const { requireSignin } = require("../middlewares/securityController");
const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/signin", signing);
router.get("/signout", signout);

module.exports = router;
