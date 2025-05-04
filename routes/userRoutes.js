const express = require('express');
const router = express.Router();
const user = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register",user.registerUser)
router.post("/login",user.loginUser)
router.get("/current",validateToken,user.currentUser)

module.exports = router