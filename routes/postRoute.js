const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost
} = require("../controllers/postController");
const { reqiureSignin } = require("../controllers/authController");
const { userById, hasAuthorization } = require("../controllers/userController");
const { postValidator } = require("../helpers/validator");
const router = express.Router();

router.get("/posts", getPosts);
router.post("/post/new/:userId", reqiureSignin, hasAuthorization, createPost);
router.get("/posts/by/:userId", postsByUser);
router.patch("/post/:postId", reqiureSignin, isPoster, updatePost);
router.delete("/post/:postId", reqiureSignin, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
