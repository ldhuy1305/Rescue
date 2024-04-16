var express = require("express");
var router = express.Router();
const districtController = require("../controllers/districtController");
router.route("/").post(districtController);
module.exports = router;