var express = require("express");
var router = express.Router();
const helpController = require("../controllers/helpController");
const authController = require("../controllers/authController");

router.use(authController.protect);
router.route("/post/:id").post(helpController.createHelp);
module.exports = router;
