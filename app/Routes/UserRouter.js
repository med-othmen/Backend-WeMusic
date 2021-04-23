const express = require("express");
const router = express.Router();

var User = require("../controller/userController");

// Add product
router.post("/registre", User.registre);

// Loggin 
router.post('/login',User.login)
// Loggin 
router.post('/update',User.update)


//getuser by id
router.post('/currentuser/:id',User.currentuser)
module.exports = router;
