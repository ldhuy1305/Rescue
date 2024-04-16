var express = require("express");
var router = express.Router();
const approvalController = require("../controllers/approvalController");
router.route("/").post(approvalController);
module.exports = router;