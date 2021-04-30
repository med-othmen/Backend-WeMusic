const express = require("express");
const router = express.Router();

var Adress = require("../controller/AdressController");

// get All Products
router.post("/add", Adress.add);
 router.get("/getone/:id",Adress.getone)

module.exports = router;
