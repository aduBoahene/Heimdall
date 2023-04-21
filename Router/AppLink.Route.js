var express = require("express");
var router = express.Router();
var AppLinkController = require("../controllers/AppLink.Controller");
const verifyToken = require("../Middleware/VerifyToken");


router.get("/getAllLinks", AppLinkController.getAllLinks);
router.post("/createLink", verifyToken, AppLinkController.createAppLink);
router.put("/updateLink/:id", verifyToken, AppLinkController.updateAppLink);
router.delete("/deleteLink/:id", verifyToken, AppLinkController.deleteAppLink);

module.exports = router;