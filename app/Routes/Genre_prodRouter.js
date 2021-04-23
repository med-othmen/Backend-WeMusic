const express = require("express");
const router = express.Router();

var genre = require("../controller/Genre_prodController");

// get All Products
router.get("/getall", genre.getall);


module.exports = router;
