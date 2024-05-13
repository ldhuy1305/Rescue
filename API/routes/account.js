var express = require("express");
var router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");
router.route("/").post(accountController.createAccount);
router.route("/login").post(accountController.login);
router.route("/signup").post(authController.sendEmailVerify);
module.exports = router;
