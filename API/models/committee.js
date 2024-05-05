var express = require("express");
var router = express.Router();
const committeeController = require("../controllers/committeeController");
router.route("/").post(committeeController);
module.exports = router;