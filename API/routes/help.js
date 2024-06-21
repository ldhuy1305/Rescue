var express = require("express");
var router = express.Router();
const helpController = require("../controllers/helpController");
const authController = require("../controllers/authController");

router.use(authController.protect);
router.route("/post/:id").post(helpController.createHelp);
router.route("/").get(helpController.getAllHelps);
router.route("/random").get(helpController.getRandom);
module.exports = router;
