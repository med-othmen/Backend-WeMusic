const express = require("express");
const router = express.Router();

var articte = require("../controller/ArticleController");

// get All Products
router.get("/getall", articte.getall);


module.exports = router;
