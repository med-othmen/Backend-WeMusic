const express = require("express");
const router = express.Router();

var type = require("../controller/Types_prodController");

// get All Products
router.get("/getall", type.getall);


module.exports = router;
