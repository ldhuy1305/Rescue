var express = require("express");
var router = express.Router();
const roleController = require("../controllers/roleController");
router.route("/").post(roleController);
module.exports = router;