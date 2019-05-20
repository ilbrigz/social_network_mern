exports.postValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req
    .check("title", "Title must be between 4 to 150 characters")
    .isLength({ min: 4, max: 150 });

  // body
  req.check("body", "Write a body").notEmpty();
  req
    .check("body", "Body must be between 4 to 150 characters")
    .isLength({ min: 4, max: 2000 });
  // check for errors
  const errors = req.validationErrors();
  //if error show the first one as they appear
  if (errors) {
    const err = {};
    errors.forEach(
      e => (err[e.param] = err[e.param] ? [...err[e.param], e.msg] : [e.msg])
    );
    return res.status(400).json(err);
  }
  next();
};

exports.signupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Please use a valid email address").isEmail();
  req
    .check("email", "Email must be 3 to 32 characters")
    .isLength({ min: 3, max: 32 });
  req
    .check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  //if error show the first one as they appear

  if (errors) {
    const err = {};
    errors.forEach(
      e => (err[e.param] = err[e.param] ? [...err[e.param], e.msg] : [e.msg])
    );
    return res.status(401).json(err);
  }
  next();
};

exports.signinValidator = (req, res, next) => {
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Please use a valid email address").isEmail();
  req
    .check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  //if error show the first one as they appear

  if (errors) {
    const err = {};
    errors.forEach(
      e => (err[e.param] = err[e.param] ? [...err[e.param], e.msg] : [e.msg])
    );
    return res.status(401).json(err);
  }
  next();
};

exports.updateProfileValidator = (req, res, next) => {
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Please use a valid email address").isEmail();
  req
    .check("password")
    .optional({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  //if error show the first one as they appear

  if (errors) {
    const err = {};
    errors.forEach(
      e => (err[e.param] = err[e.param] ? [...err[e.param], e.msg] : [e.msg])
    );
    return res.status(401).json(err);
  }
  next();
};
