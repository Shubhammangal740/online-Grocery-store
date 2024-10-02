const fileHelper = require("../util/file");
const Food = require("../models/food");
const User = require("../models/user");

exports.getAddProduct = (req, res, next) => {
  res.render("Owner/addProduct", {
    pageTitle: "Add Product Page",
    path: "/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const image = req.files.image;

  if (!image) {
    throw new Error("Image Not Found");
  }

  const imageUrl = image[0].path;
  const food = new Food({
    name: name,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
    imageUrl: imageUrl,
    userId: req.user._id,
  });
  food
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/food-listing");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFoodListing = (req, res, next) => {
  Food.find({ userId: req.user._id })
    .then((foods) => {
      res.render("Owner/foodListing", {
        foods: foods,
        pageTitle: "Food Listing Page",
        path: "/food-listing",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdateFood = (req, res, next) => {
  const foodId = req.params.foodId;

  Food.findById(foodId)
    .then((food) => {
      res.render("Owner/addProduct", {
        food: food,
        pageTitle: "Update Product Page",
        path: "/update-food",
        editing: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateFood = (req, res, next) => {
  const foodId = req.body.foodId;
  const updateName = req.body.name;
  const updateDesc = req.body.description;
  const updateCategory = req.body.category;
  const updatePrice = req.body.price;
  const updateQuantity = req.body.quantity;
  const updateImage = req.files.image;
  console.log(req.files);

  if (!updateImage) {
    throw new Error("Image Not Found");
  }

  const updateImageUrl = updateImage[0].path;

  Food.findById(foodId)
    .then((food) => {
      if (!food) {
        throw new Error("Product Not Found");
      }
      food.name = updateName;
      food.description = updateDesc;
      food.category = updateCategory;
      food.price = updatePrice;
      food.quantity = updateQuantity;
      fileHelper.deleteFile(food.imageUrl);
      food.imageUrl = updateImageUrl;

      food
        .save()
        .then((result) => {
          console.log(result);
          res.redirect("/food-listing");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteFood = (req, res, next) => {
  const foodId = req.params.foodId;

  Food.findById(foodId)
    .then((food) => {
      if (!food) {
        throw new Error("Food Not Found");
      }
      fileHelper.deleteFile(food.imageUrl);
      Food.findByIdAndDelete({ _id: foodId, userId: req.user._id }).then(
        (result) => {
          console.log(result);
          res.redirect("/food-listing");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
