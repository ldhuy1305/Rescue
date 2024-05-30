var express = require("express");
var router = express.Router();
const transactionController = require("../controllers/transactionController");
router.route("/", transactionController.checkout);
module.exports = router;
