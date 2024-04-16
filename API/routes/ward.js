var express = require("express");
var router = express.Router();
const wardController = require("../controllers/wardController");
router.route("/").post(wardController);
module.exports = router;