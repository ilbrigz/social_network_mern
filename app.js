const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const path = require("path");
dotenv.config();

const postRoutes = require("./routes/postRoute");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("db connected"));

mongoose.connection.on("error", err =>
  console.log("db connection error " + err.message)
);

// middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.get("/", (req, res, next) => res.send("my backend api"));
app.use("/*", (req, res, next) =>
  res.status(500).json({ error: "endpoint does not exist" })
);

//The requireSignin middleware error here
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" });
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("listening on " + port);
});
