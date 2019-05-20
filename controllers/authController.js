const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

require("dotenv").config();

module.exports = {
  signup: async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(403).json({ email: ["Email is taken!"] });
    const user = await new User(req.body);
    await user.save();
    return res.status(200).json(user);
  },
  signing: (req, res) => {
    const { email, password } = req.body;
    const verificationId = uuidv4();
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          reqError: ["User with that email does not exist. Please signin."]
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          reqError: ["Email and password do not match"]
        });
      }
      const { _id, name, email } = user;

      // generate token
      const token = jwt.sign(
        { email, name, _id: user.id, payloadVerificationId: verificationId },
        process.env.JWT_SECRET
      );
      // res.setHeader("Access-Control-Allow-Origin", "*");

      // // Request methods you wish to allow
      // res.setHeader(
      //   "Access-Control-Allow-Methods",
      //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      // );

      // // Request headers you wish to allow
      // res.setHeader(
      //   "Access-Control-Allow-Headers",
      //   "X-Requested-With,content-type"
      // );

      // // Set to true if you need the website to include cookies in the requests sent
      // // to the API (e.g. in case you use sessions)
      // res.setHeader("Access-Control-Allow-Credentials", true);

      res.cookie("t", token, { expire: new Date() + 9999, httpOnly: true });
      res.setHeader("client-verification-id", verificationId);

      return res.status(200).json({
        userId: _id,
        verificationId,
        name
      });
    });
  },
  signout: (req, res) => {
    res.clearCookie("t");
    return res.clearCookie("t").json({ message: "Signout successful" });
  }
};
