const express = require("express");
const router = express.Router();
const { checkout } = require("../controllers/checkout.controller.js");
const authenticate = require("../middlewares/authentication");

router.post("/", authenticate, checkout);

module.exports = router;
