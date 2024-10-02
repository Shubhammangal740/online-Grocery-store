const express = require("express");

const router = express.Router();
const pageControllers = require("../controllers/pages");

router.get("/", pageControllers.getHomePage);

router.get("/about", pageControllers.getAboutPage);

router.get("/contact", pageControllers.getContactPage);

router.get("/product", pageControllers.getProductPage);

module.exports = router;
