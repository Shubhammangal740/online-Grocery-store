const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();
const MONGO_URL =
  "mongodb+srv://shubham:shubham123@manishproject.1ckwm.mongodb.net/food?retryWrites=true&w=majority&appName=ManishProject";

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

const foodStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/foodImages/"); // Path for course images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const OwnerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/OwnerImages/"); // Path for instructor images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "uploads/foodImages/");
    } else if (file.fieldname === "storeImage") {
      cb(null, "uploads/OwnerImages/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

app.set("view engine", "ejs");
app.set("views", "views");

const User = require("./models/user");

const authRoutes = require("./routes/auth");
const pageRoutes = require("./routes/pages");
const ownerRoutes = require("./routes/owner");
const errorControllers = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: storage }).fields([
    { name: "image", maxCount: 1 },
    { name: "storeImage", maxCount: 1 },
  ])
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      res.locals.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use(pageRoutes);
app.use(authRoutes);
app.use(ownerRoutes);

app.use(errorControllers.get404);

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    console.log("Connected!");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
