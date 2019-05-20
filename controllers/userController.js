const User = require("../models/userSchema");
const chalk = require("chalk");

module.exports = {
  userById: (req, res, next, id) => {
    User.findById(id)
      .populate("following", "_id name image")
      .populate("followers", "_id name image")
      .exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User not found"
          });
        }

        req.profile = user;
        next();
      });
  },
  allUsers: (req, res, next) => {
    User.find()
      .select("_id email name created image")
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.status(404).json(err));
  },
  getUser: (req, res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  },
  updateUser: async (req, res, next) => {
    if (req.profile.email !== req.body.email) {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists)
        return res.status(403).json({ email: ["Email is taken!"] });
    }
    const user = await new User(req.body);
    user._id = req.profile._id;
    user.updated = Date.now();
    user.created = undefined;
    user.followers = undefined;
    user.following = undefined;
    console.log(chalk.red.bgYellow(user));
    console.log("====>", user);
    User.findOneAndUpdate({ _id: req.profile._id }, user, {
      new: true
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => res.status(404).json(err));
  },
  deleteUser: (req, res, next) => {
    User.findOne({ _id: req.profile._id })
      .then(user => {
        user.remove().then(data => {
          res.json(data);
        });
      })
      .catch(err => console.log(err));
  },
  addFollowing: (req, res, next) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: { following: req.body.followId }
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        next();
      }
    );
  },
  addFollower: (req, res, next) => {
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.body.userId }
      },
      { new: true }
    )
      .populate("following", "_id name image")
      .populate("followers", "_id name image")
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
      });
  },
  removeFollowing: (req, res, next) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { following: req.body.unfollowId }
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        next();
      }
    );
  },
  removeFollower: (req, res, next) => {
    User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.body.userId }
      },
      { new: true }
    )
      .populate("following", "_id name image")
      .populate("followers", "_id name image")
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
      });
  },
  findPeople: (req, res, next) => {
    let following = req.profile.following;
    console.log(following);
    following.push(req.profile._id);
    console.log("===>", following);
    // find those nin/ not in the following array
    User.find({ _id: { $nin: following } })
      .select("name")
      .then(users => {
        return res.json(users);
      })
      .catch(err => res.status(404).json(err));
  }
};
