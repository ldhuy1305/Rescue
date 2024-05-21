var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");
router
    .route("/")
    .post(accountController.createAccount, userController.createUser);

router.use(authController.protect);
router.route("/").get(userController.getUserByMe);
module.exports = router;
