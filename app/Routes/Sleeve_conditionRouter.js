const express = require("express");
const router = express.Router();

var sleeve_condition = require("../controller/Sleeve_condition_prodController.js");

// get All Products
router.get("/getall", sleeve_condition.getall);


module.exports = router;
