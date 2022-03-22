const express = require("express");
const router = express.Router();
const {
  fetchAllProducts,
  fetchProduct,
} = require("../controllers/product.controller.js");

router.get("/", fetchAllProducts);

router.get("/:category/:slug", fetchProduct);

module.exports = router;
