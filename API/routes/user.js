var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
router.route("/").post(userController);
module.exports = router;