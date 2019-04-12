const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

module.exports = {
  signup: async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(403).json({ error: "Email is taken!" });
    const user = await new User(req.body);
    await user.save();
    return res.status(200).json(user);
  },
  signing: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: "User with that email does not exist. Please signin."
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
      // generate token
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

      res.cookie("t", token, { expire: new Date() + 9999 });

      const { _id, name, email } = user;

      return res.status(200).json({
        user: { _id, email, name },
        token
      });
    });
  },
  signout: (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout successful" });
  },
  reqiureSignin: expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
  })
};
