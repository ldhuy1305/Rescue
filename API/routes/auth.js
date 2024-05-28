var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
router.route("/send-email").post(authController.sendEmailVerify);
module.exports = router;
