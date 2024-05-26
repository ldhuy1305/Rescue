var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");
router
    .route("/")
    .post(accountController.createAccount, userController.createUser);

router.use(authController.protect);
router
    .route("/me")
    .get(userController.getUserByMe)
    .put(userController.updateUser);
router
    .route("/me/photo")
    .patch(userController.updateImage, userController.updateAvatar);
router.route("/me/change-password").post(accountController.changePass);
module.exports = router;
