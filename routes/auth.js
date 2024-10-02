const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/user");

router.get("/login", userControllers.getLogin);

router.post("/login", userControllers.postLogin);

router.get("/user-signup", userControllers.getUserSignup);

router.post("/user-signup", userControllers.postUserSignup);

router.get("/owner-signup", userControllers.getOwnerSignup);

router.post("/owner-signup", userControllers.postOwnerSignup);

router.post("/logout", userControllers.postLogout);

module.exports = router;
