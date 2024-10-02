const express = require("express");

const router = express.Router();

const ownerControllers = require("../controllers/owner");

router.get("/add-food", ownerControllers.getAddProduct);

router.post("/add-food", ownerControllers.postAddProduct);

router.get("/food-listing", ownerControllers.getFoodListing);

router.get("/update-food/:foodId", ownerControllers.getUpdateFood);

router.post("/update-food", ownerControllers.postUpdateFood);

router.post("/delete-food/:foodId", ownerControllers.postDeleteFood);

module.exports = router;
