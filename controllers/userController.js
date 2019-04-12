const User = require("../models/userSchema");

module.exports = {
  userById: (req, res, next, id) => {
    console.log("userById");
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found"
        });
      }

      req.profile = user;
      next();
    });
  },

  hasAuthorization: (req, res, next) => {
    const authorized =
      req.profile && req.auth && req.profile._id + "" === req.auth._id;
    if (!authorized) {
      return res.status(403).json({
        error: "User is not authorized to perform this action"
      });
    }
    next();
  },
  allUsers: (req, res, next) => {
    User.find()
      .select("_id email name created")
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.status(404).json(err));
  },
  getUser: (req, res, next) => {
    console.log("getUser");
    console.log(req.auth);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  },
  updateUser: (req, res, next) => {
    User.findOneAndUpdate({ _id: req.profile._id }, req.body, {
      new: true
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => console.log(err));
  },
  deleteUser: (req, res, next) => {
    User.findOne({ _id: req.profile._id })
      .then(user => {
        user.remove().then(data => {
          res.json(data);
        });
      })
      .catch(err => console.log(err));
  }
};
