const express = require("express");
const router = express.Router();

var product = require("../controller/ProductController.js");

// get All Products
router.get("/getall", product.getall);

router.post('/update',product.update)
router.get('/:id',product.getone)

module.exports = router;
