const expressJwt = require("express-jwt");
require("dotenv").config();

const _verifyCookieWithHeader = (req, res, next) => {
  const { payloadVerificationId } = req.auth;
  if (
    !payloadVerificationId ||
    !req.headers["payload-verification-id"] ||
    req.headers["payload-verification-id"] !== payloadVerificationId
  ) {
    return res
      .status(400)
      .json({ err: "Error! Try logging out then loggin in back again" });
  }
  next();
};

module.exports = {
  requireSignin: [
    expressJwt({
      secret: process.env.JWT_SECRET,
      requestProperty: "auth",
      getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.cookie) {
          return req.headers.cookie.split(",")[0].split("=")[1];
        }
        return null;
      }
    }),
    _verifyCookieWithHeader
  ],
  isPoster: (req, res, next) => {
    let isPoster =
      req.post && req.auth && req.post.postedBy._id.toString() === req.auth._id;
    if (!isPoster) {
      return res.status(403).json({
        err: "User is not authorized"
      });
    }
    next();
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
  }
};
