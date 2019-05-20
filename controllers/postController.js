const Post = require("../models/postSchema");
const formidable = require("formidable");
const fs = require("fs");

module.exports = {
  postById: (req, res, next, id) => {
    Post.findById(id)
      .populate("postedBy", "_id name")
      .exec((err, post) => {
        if (err || !post) {
          return res.status(400).json({
            err
          });
        }
        req.post = post;
        next();
      });
  },
  createPost: (req, res) => {
    // formidable, multer alternative
    const form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image couldn't be uploaded"
        });
      }
      let post = new Post(fields);
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;
      post.postedBy = req.profile;
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.path);
        post.photo.contentType = files.photo.type;
      }

      post.save((err, result) => {
        if (err) {
          return res.status(400).json({
            err
          });
        }
        return res.json(result);
      });
    });
  },
  getPosts: (req, res) => {
    Post.find()
      .populate("postedBy", "_id name")
      .select("_id title body")
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => res.status(404).json({ task: "there are no task found" }));
  },
  postsByUser: (req, res) => {
    Post.find({ postedBy: req.profile._id })
      .select("_id title body created postedBy")
      .populate("postedBy", "_id name")
      .sort("_created")
      .exec((err, posts) => {
        if (err) {
          return res.status(400).json({ err });
        }

        res.json(posts);
      });
  },
  deletePost: (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
      if (err) {
        return res.status(400).json({ err });
      }
      return res.json({ message: "Message deleted successfully" });
    });
  },
  updatePost: (req, res, next) => {
    Post.findOneAndUpdate({ _id: req.post._id }, req.body, {
      new: true
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err));
  }
};
