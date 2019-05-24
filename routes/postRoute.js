const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  updatePost,
  getPhoto,
  singlePostById
} = require("../controllers/postController");
const {
  hasAuthorization,
  isPoster,
  requireSignin
} = require("../middlewares/securityController");
const { userById } = require("../controllers/userController");
const { postValidator } = require("../validators/validator");
const router = express.Router();

router.get("/post/i/:postId", getPhoto);
router.get("/post/:postId", singlePostById);
router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, hasAuthorization, createPost);
router.get("/posts/by/:userId", postsByUser);
router.patch("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
