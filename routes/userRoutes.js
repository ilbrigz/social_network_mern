const express = require("express");
const {
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userById,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople
} = require("../controllers/userController");

const {
  uploadImage,
  removeImage,
  resizeImage
} = require("../middlewares/imageMiddleware");

const { updateProfileValidator } = require("../validators/validator");
const {
  hasAuthorization,
  requireSignin
} = require("../middlewares/securityController.js");
const router = express.Router();

router.get("/users", allUsers);
// this will follow
// 1. using express-jwt, verify if secret is found in token, and attach req.auth
// 2. check if req.auth.id and req.profile have mathcing information
// 3. if all are good, return the req.profile attached previously, but removes req.password and req.salt  === undefined

router.get("/user/:userId", getUser);

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);
router.get("/user/findpeople/:userId", requireSignin, findPeople);

router.put(
  "/user/:userId",
  uploadImage,
  requireSignin,
  hasAuthorization,
  updateProfileValidator,
  resizeImage,
  removeImage,
  updateUser
);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

// it will be invoked first
// will find the user and attach it to req.profile
// app.param("userId", userById);
router.param("userId", userById);

module.exports = router;
