const express = require("express");
const router = express.Router();

var product = require("../controller/ProductController.js");

// get All Products
router.get("/getall", product.getall);


module.exports = router;
