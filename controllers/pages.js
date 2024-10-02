const Food = require("../models/food");
const Contact = require("../models/contact");
exports.getHomePage = (req, res, next) => {
  Food.find({})
    .then((foods) => {
      res.render("pages/index", {
        pageTitle: "Fruit Store - Fresh Fruits Delivered",
        products: foods.slice(0, 4),
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAboutPage = (req, res, next) => {
  res.render("pages/about", {
    pageTitle: "About Us Page",
    phoneNumber: "+91 1200-456-123",
    path: "/about",
  });
};

const data = {};

exports.getContactPage = (req, res, next) => {
  res.render("pages/contact", {
    pageTitle: "Contact Us Page",
    path: "/contact",
  });
};

exports.getProductPage = (req, res, next) => {
  Food.find({})
    .then((product) => {
      res.render("pages/product", {
        pageTitle: "Product Page",
        logo: "images/logo.png",
        phoneNumber: "+91 1200-456-123",
        products: product,
        footers: [
          {
            title: "Tazza",
            description:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus modi qui numquam in cumque aliquam...",
            contact: [
              { icon: "fa-home", text: "No. 96, South City, London" },
              { icon: "fa-phone", text: "+1 222 3333" },
              { icon: "fa-envelope", text: "info@example.com" },
            ],
          },
          {
            title: "Customer Support",
            description: "",
            contact: [
              { icon: "", text: "About Us" },
              { icon: "", text: "Privacy Policy" },
              { icon: "", text: "Terms & Conditions" },
              { icon: "", text: "Product Returns" },
              { icon: "", text: "Wholesale Policy" },
            ],
          },
          {
            title: "Quick Links",
            description: "",
            contact: [
              { icon: "", text: "Product" },
              { icon: "", text: "Terms & Conditions" },
              { icon: "", text: "Contact" },
              { icon: "", text: "Accessories" },
              { icon: "", text: "Term Of Use" },
            ],
          },
          {
            title: "Newsletter",
            description: "",
            contact: [{ icon: "", text: "Enter Your Email Here" }],
          },
        ],
        copyright: "© ERROR TO ARRAY.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
