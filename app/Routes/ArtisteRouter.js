const express = require("express");
const router = express.Router();

var artiste = require("../controller/ArtisteController");

// get All Products
router.get("/getall", artiste.getall);


module.exports = router;
