const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = require("../routes/auth");

exports.getLogin = (req, res, next) => {
  res.render("auth/Login.ejs", {
    pageTitle: "Login Page",
    path: "/login",
  });
};

exports.getUserSignup = (req, res, next) => {
  res.render("auth/normalSignup.ejs", {
    pageTitle: "user signup Page",
    path: "/user-signup",
  });
};

exports.getOwnerSignup = (req, res, next) => {
  res.render("auth/ownerSignup.ejs", {
    pageTitle: "owner signup Page",
    path: "/owner-signup",
  });
};

exports.postUserSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log("User Exist");
        return;
      }
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
          });
          user.save().then((result) => {
            res.redirect("/login");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOwnerSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const role = req.body.role;
  const bio = req.body.bio;
  const imageUrl = req.body.storeImage;
  const terms = req.body.terms;

  if (terms != "on") {
    console.log("Please check the terms and Condition");
    return;
  }

  User.findOne({ email: email })
    .then((oldUser) => {
      if (oldUser) {
        console.log("User Exist!");
        return;
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          phone: phone,
          role: role,
          bio: bio,
          imageUrl: imageUrl,
        });
        user.save().then((result) => {
          res.redirect("/login");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          console.log("Enter a valid Password");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
