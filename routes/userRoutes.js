const express = require("express");
const {
  allUsers,
  getUser,
  updateUser,
  hasAuthorization,
  deleteUser,
  userById
} = require("../controllers/userController");
const { reqiureSignin } = require("../controllers/authController");
const router = express.Router();

router.get("/users", allUsers);
// this will follow
// 1. using express-jwt, verify if secret is found in token, and attach req.auth
// 2. check if req.auth.id and req.profile have mathcing information
// 3. if all are good, return the req.profile attached previously, but removes req.password and req.salt  === undefined
router.get("/user/:userId", reqiureSignin, hasAuthorization, getUser);

router.put("/user/:userId", reqiureSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", reqiureSignin, hasAuthorization, deleteUser);

router.param("userId", userById);

module.exports = router;
