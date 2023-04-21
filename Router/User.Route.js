var express = require("express");
var router = express.Router();
var UserController = require("../controllers/User.Controller");
const verifyToken = require("../Middleware/VerifyToken");


router.get("/getAllUsers", UserController.getAllUsers);
router.post("/createUser", verifyToken, UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;